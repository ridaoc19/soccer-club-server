import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppDataSource } from '../../../app/data-source';
import { Media } from '../domain/media.entity';
import { asyncHandler } from '../../../core/base/async-handler';
import { AppResponse } from '../../../core/base/http-response';

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadLocal = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
  },
});

/** POST /media - Subir imagen local */
router.post(
  '/',
  uploadLocal.single('file'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      AppResponse.badRequest('No se ha subido ningún archivo');
      return;
    }

    const mediaRepo = AppDataSource.getRepository(Media);
    const media = mediaRepo.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      type: 'image',
      inUse: false,
    });

    await mediaRepo.save(media);
    AppResponse.ok(res, { url: media.url, id: media.id }, 'Archivo subido y registrado con éxito');
  }),
);

/** POST /media/url - Registrar URL externa */
router.post(
  '/url',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { url, originalName } = req.body as { url: string; originalName?: string };
    if (!url) {
      AppResponse.badRequest('La URL es requerida');
      return;
    }

    const mediaRepo = AppDataSource.getRepository(Media);
    const media = mediaRepo.create({
      filename: '',
      originalName: originalName ?? url,
      mimetype: 'image/external',
      size: 0,
      url,
      type: 'image',
      inUse: false,
    });

    await mediaRepo.save(media);
    AppResponse.ok(res, { url: media.url, id: media.id }, 'URL registrada con éxito');
  }),
);

/** GET /media - Listar galería */
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const mediaRepo = AppDataSource.getRepository(Media);
    const files = await mediaRepo.find({ order: { createdAt: 'DESC' } });
    AppResponse.ok(res, files, 'Galería obtenida');
  }),
);

/** PATCH /media/:id/use - Marcar imagen como en uso */
router.patch(
  '/:id/use',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { usedBy } = req.body as { usedBy?: string };

    const mediaRepo = AppDataSource.getRepository(Media);
    const media = await mediaRepo.findOneBy({ id: Number(id) });
    if (!media) {
      AppResponse.notFound('Imagen no encontrada');
      return;
    }

    media.inUse = true;
    media.usedBy = usedBy ?? media.usedBy;
    await mediaRepo.save(media);
    AppResponse.ok(res, media, 'Imagen marcada como en uso');
  }),
);

/** PATCH /media/:id/release - Liberar imagen (marcar como no usada) */
router.patch(
  '/:id/release',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const mediaRepo = AppDataSource.getRepository(Media);
    const media = await mediaRepo.findOneBy({ id: Number(id) });
    if (!media) {
      AppResponse.notFound('Imagen no encontrada');
      return;
    }

    media.inUse = false;
    media.usedBy = '';
    await mediaRepo.save(media);
    AppResponse.ok(res, media, 'Imagen liberada');
  }),
);

/** DELETE /media/:id - Eliminar imagen */
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const mediaRepo = AppDataSource.getRepository(Media);
    const media = await mediaRepo.findOneBy({ id: Number(id) });
    if (!media) {
      AppResponse.notFound('Imagen no encontrada');
      return;
    }

    if (media.inUse) {
      AppResponse.badRequest('No se puede eliminar una imagen que está en uso');
      return;
    }

    // Eliminar archivo físico si es local
    if (media.filename && media.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'uploads', media.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await mediaRepo.remove(media);
    AppResponse.ok(res, null, 'Imagen eliminada correctamente');
  }),
);

export { router };

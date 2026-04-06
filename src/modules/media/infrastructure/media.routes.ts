import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { AppDataSource } from '../../../app/data-source';
import { Media } from '../domain/media.entity';
import { asyncHandler } from '../../../core/base/async-handler';
import { AppResponse } from '../../../core/base/http-response';

const router = Router();

// ==========================================
// 1. LOCAL STORAGE (Active Mode)
// ==========================================
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
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
  },
});

/**
 * @swagger
 * tags:
 *   - name: Media
 *     description: Carga y gestión de archivos multimedia
 */

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Cargar una imagen (Local Storage)
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Archivo cargado exitosamente
 */
router.post(
  '/',
  uploadLocal.single('file'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      return AppResponse.error(res, 'No se ha subido ningún archivo', 400);
    }

    const mediaRepo = AppDataSource.getRepository(Media);

    // Guardar metadata en DB
    const media = mediaRepo.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      type: 'image',
    });

    await mediaRepo.save(media);

    AppResponse.ok(res, { url: media.url, id: media.id }, 'Archivo subido y registrado con éxito');
  })
);

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Obtener galería de archivos
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Lista de archivos registrados
 */
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const mediaRepo = AppDataSource.getRepository(Media);
    const files = await mediaRepo.find({ order: { createdAt: 'DESC' } });
    AppResponse.ok(res, files, 'Galería obtenida');
  })
);

export { router };

import { Router } from 'express';
import { NewsController } from './news.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new NewsController();

/**
 * @swagger
 * tags:
 *   - name: News
 *     description: Gestión de noticias y publicaciones del club
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Obtener todas las noticias
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Lista de noticias
 *   post:
 *     summary: Publicar una noticia (Admin)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Noticia creada
 */
router.get('/', asyncHandler(controller.getAll));
router.get('/latest', asyncHandler(controller.getLatest));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Actualizar una noticia (Admin)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Noticia actualizada
 *   delete:
 *     summary: Eliminar una noticia (Admin)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Noticia eliminada
 */
router.put('/:id', authMiddleware, asyncHandler(controller.update));
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

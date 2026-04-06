import { Router } from 'express';
import { SponsorController } from './sponsor.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new SponsorController();

/**
 * @swagger
 * tags:
 *   - name: Sponsors
 *     description: Gestión de patrocinadores y colaboradores del club
 */

/**
 * @swagger
 * /sponsor:
 *   get:
 *     summary: Obtener todos los patrocinadores
 *     tags: [Sponsors]
 *     responses:
 *       200:
 *         description: Lista de patrocinadores
 *   post:
 *     summary: Crear un patrocinador (Admin)
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Patrocinador creado
 */
router.get('/', asyncHandler(controller.getAll));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /sponsor/{id}:
 *   put:
 *     summary: Actualizar patrocinador (Admin)
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patrocinador actualizado
 *   delete:
 *     summary: Eliminar patrocinador (Admin)
 *     tags: [Sponsors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patrocinador eliminado
 */
router.put('/:id', authMiddleware, asyncHandler(controller.update));
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

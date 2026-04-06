import { Router } from 'express';
import { SeasonController } from './season.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new SeasonController();

/**
 * @swagger
 * tags:
 *   - name: Seasons
 *     description: Gestión de temporadas y periodos competitivos
 */

/**
 * @swagger
 * /season:
 *   get:
 *     summary: Obtener todas las temporadas
 *     tags: [Seasons]
 *     responses:
 *       200:
 *         description: Lista de temporadas
 *   post:
 *     summary: Crear una temporada (Admin)
 *     tags: [Seasons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Temporada creada
 */
router.get('/', asyncHandler(controller.getAll));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /season/{id}:
 *   put:
 *     summary: Actualizar una temporada (Admin)
 *     tags: [Seasons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Temporada actualizada
 *   delete:
 *     summary: Eliminar una temporada (Admin)
 *     tags: [Seasons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Temporada eliminada
 */
router.put('/:id', authMiddleware, asyncHandler(controller.update));
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

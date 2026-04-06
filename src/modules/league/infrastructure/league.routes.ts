import { Router } from 'express';
import { LeagueController } from './league.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new LeagueController();

/**
 * @swagger
 * tags:
 *   - name: Leagues
 *     description: Gestión de ligas y campeonatos
 */

/**
 * @swagger
 * /league:
 *   get:
 *     summary: Obtener todas las ligas
 *     tags: [Leagues]
 *     responses:
 *       200:
 *         description: Lista de ligas
 *   post:
 *     summary: Crear una liga (Admin)
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Liga creada
 */
router.get('/', asyncHandler(controller.getAll));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /league/{id}:
 *   put:
 *     summary: Actualizar una liga (Admin)
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liga actualizada
 *   delete:
 *     summary: Eliminar una liga (Admin)
 *     tags: [Leagues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liga eliminada
 */
router.put('/:id', authMiddleware, asyncHandler(controller.update));
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

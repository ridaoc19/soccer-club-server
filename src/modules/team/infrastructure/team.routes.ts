import { Router } from 'express';
import { TeamController } from './team.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new TeamController();

/**
 * @swagger
 * tags:
 *   - name: Teams
 *     description: Operaciones sobre equipos del club y rivales
 */

/**
 * @swagger
 * /team:
 *   get:
 *     summary: Obtener todos los equipos
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Lista de equipos
 *   post:
 *     summary: Crear un nuevo equipo (Admin)
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Equipo creado
 */
router.get('/', asyncHandler(controller.getAll));
router.get('/club', asyncHandler(controller.getClubTeams));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     summary: Actualizar un equipo (Admin)
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipo actualizado
 *   delete:
 *     summary: Eliminar un equipo (Admin)
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipo eliminado
 */
router.put('/:id', authMiddleware, asyncHandler(controller.update));
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

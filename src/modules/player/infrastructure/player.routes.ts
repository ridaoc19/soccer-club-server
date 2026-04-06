import { Router } from 'express';
import { PlayerController } from './player.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new PlayerController();

/**
 * @swagger
 * tags:
 *   - name: Players
 *     description: Gestión de la plantilla del club
 */

/**
 * @swagger
 * /player:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *   post:
 *     summary: Crear un nuevo jugador (Admin)
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Jugador creado
 */
router.get('/', asyncHandler(controller.getAll));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /player/{id}:
 *   put:
 *     summary: Actualizar un jugador (Admin)
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jugador actualizado
 *   delete:
 *     summary: Eliminar un jugador (Admin)
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jugador eliminado
 */
router.put('/:id', authMiddleware, asyncHandler(controller.update));
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

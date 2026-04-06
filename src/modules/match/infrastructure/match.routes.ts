import { Router } from 'express';
import { MatchController } from './match.controller';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';

const router = Router();
const controller = new MatchController();

/**
 * @swagger
 * tags:
 *   - name: Matches
 *     description: Gestión de partidos y planeación táctica
 */

/**
 * @swagger
 * /match:
 *   get:
 *     summary: Obtener todos los partidos
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Lista de partidos
 *   post:
 *     summary: Crear un nuevo partido (Admin)
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Partido creado
 */
router.get('/', asyncHandler(controller.getAll));
router.post('/', authMiddleware, asyncHandler(controller.create));

/**
 * @swagger
 * /match/upcoming:
 *   get:
 *     summary: Obtener próximos partidos
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Lista de próximos partidos
 */
router.get('/upcoming', asyncHandler(controller.getUpcoming));

/**
 * @swagger
 * /match/{id}/lineup:
 *   put:
 *     summary: Actualizar alineación de un partido (Admin)
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Alineación actualizada
 */
router.put('/:id/lineup', authMiddleware, asyncHandler(controller.updateLineup));

/**
 * @swagger
 * /match/{id}:
 *   delete:
 *     summary: Eliminar un partido (Admin)
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Partido eliminado
 */
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

export { router };

import { Router } from 'express';
import { StandingController } from './standing.controller';
import { asyncHandler } from '../../../core/base/async-handler';

const router = Router();
const controller = new StandingController();

/**
 * @swagger
 * tags:
 *   - name: Standings
 *     description: Tabla de posiciones y estadísticas de competencia
 */

/**
 * @swagger
 * /standing:
 *   get:
 *     summary: Obtener la tabla de posiciones dinámica
 *     tags: [Standings]
 *     responses:
 *       200:
 *         description: Lista de equipos y sus estadísticas
 */
router.get('/', asyncHandler(controller.getStanding));

export { router };

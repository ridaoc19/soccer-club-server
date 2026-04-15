import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { PlayerRepository } from './player.repository';
import { Player } from '../domain/player.entity';

export class PlayerController {
  private playerRepo = PlayerRepository;

  getAll = async (_req: Request, res: Response) => {
    const players = await this.playerRepo.findAllWithTeam();
    AppResponse.ok(res, players, 'Jugadores obtenidos');
  };

  create = async (req: Request, res: Response) => {
    try {
      const player = this.playerRepo.create(req.body as Partial<Player>);
      await this.playerRepo.save(player);
      AppResponse.created(res, player, 'Jugador creado');
    } catch (error) {
      throw AppResponse.internal('Error al crear jugador');
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let player = await this.playerRepo.findOneBy({ id: Number(id) });
      if (!player) throw AppResponse.notFound('Jugador no encontrado');

      this.playerRepo.merge(player, req.body);
      await this.playerRepo.save(player);
      AppResponse.ok(res, player, 'Jugador actualizado');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al actualizar jugador');
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const player = await this.playerRepo.findOneBy({ id: Number(id) });
      if (!player) throw AppResponse.notFound('Jugador no encontrado');

      await this.playerRepo.remove(player);
      AppResponse.ok(res, null, 'Jugador eliminado');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al eliminar jugador');
    }
  };
}

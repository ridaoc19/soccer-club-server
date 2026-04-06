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
    const player = this.playerRepo.create(req.body as Partial<Player>);
    await this.playerRepo.save(player);
    AppResponse.created(res, player, 'Jugador creado');
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const player = await this.playerRepo.findOneBy({ id: Number(id) });
    if (!player) return AppResponse.notFound(res, 'Jugador no encontrado');

    this.playerRepo.merge(player, req.body);
    await this.playerRepo.save(player);
    AppResponse.ok(res, player, 'Jugador actualizado');
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.playerRepo.delete(id);
    AppResponse.ok(res, null, 'Jugador eliminado');
  };
}

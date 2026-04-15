import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { LeagueRepository } from './league.repository';
import { League } from '../domain/league.entity';

export class LeagueController {
  private leagueRepo = LeagueRepository;

  getAll = async (_req: Request, res: Response) => {
    const leagues = await this.leagueRepo.find({ order: { name: 'ASC' } });
    AppResponse.ok(res, leagues, 'Ligas obtenidas exitosamente');
  };

  create = async (req: Request, res: Response) => {
    try {
      const league = this.leagueRepo.create(req.body as Partial<League>);
      await this.leagueRepo.save(league);
      AppResponse.created(res, league, 'Liga creada exitosamente');
    } catch (error) {
      throw AppResponse.internal('Error al crear la liga');
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const league = await this.leagueRepo.findOneBy({ id: Number(id) });
      if (!league) throw AppResponse.notFound('Liga no encontrada');

      this.leagueRepo.merge(league, req.body);
      await this.leagueRepo.save(league);
      AppResponse.ok(res, league, 'Liga actualizada exitosamente');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al actualizar la liga');
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const league = await this.leagueRepo.findOneBy({ id: Number(id) });
      if (!league) throw AppResponse.notFound('Liga no encontrada');

      await this.leagueRepo.remove(league);
      AppResponse.ok(res, null, 'Liga eliminada exitosamente');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al eliminar la liga');
    }
  };
}

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
    const league = this.leagueRepo.create(req.body as Partial<League>);
    await this.leagueRepo.save(league);
    AppResponse.created(res, league, 'Liga creada exitosamente');
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const league = await this.leagueRepo.findOneBy({ id: Number(id) });
    if (!league) return AppResponse.notFound(res, 'Liga no encontrada');

    this.leagueRepo.merge(league, req.body);
    await this.leagueRepo.save(league);
    AppResponse.ok(res, league, 'Liga actualizada exitosamente');
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.leagueRepo.delete(id);
    AppResponse.ok(res, null, 'Liga eliminada exitosamente');
  };
}

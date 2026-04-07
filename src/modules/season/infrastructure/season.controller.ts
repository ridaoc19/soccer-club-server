import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { SeasonRepository } from './season.repository';
import { Season } from '../domain/season.entity';

export class SeasonController {
  private seasonRepo = SeasonRepository;

  getAll = async (_req: Request, res: Response) => {
    const seasons = await this.seasonRepo.find({ order: { startDate: 'DESC' }, relations: ['league'] });
    AppResponse.ok(res, seasons, 'Temporadas obtenidas exitosamente');
  };

  create = async (req: Request, res: Response) => {
    const season = this.seasonRepo.create(req.body as Partial<Season>);
    await this.seasonRepo.save(season);
    AppResponse.created(res, season, 'Temporada creada exitosamente');
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const season = await this.seasonRepo.findOneBy({ id: Number(id) });
    if (!season) {
      AppResponse.notFound('Temporada no encontrada');
      return;
    }

    // this.seasonRepo.merge(season, req.body);
    await this.seasonRepo.save(season);
    AppResponse.ok(res, season, 'Temporada actualizada exitosamente');
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.seasonRepo.delete(id);
    AppResponse.ok(res, null, 'Temporada eliminada exitosamente');
  };
}

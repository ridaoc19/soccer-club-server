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
    try {
      const season = this.seasonRepo.create(req.body as Partial<Season>);
      await this.seasonRepo.save(season);
      AppResponse.created(res, season, 'Temporada creada exitosamente');
    } catch (error) {
      throw AppResponse.internal('Error al crear la temporada');
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const season = await this.seasonRepo.findOneBy({ id: Number(id) });
      if (!season) throw AppResponse.notFound('Temporada no encontrada');

      this.seasonRepo.merge(season, req.body);
      await this.seasonRepo.save(season);
      AppResponse.ok(res, season, 'Temporada actualizada exitosamente');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al actualizar la temporada');
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const season = await this.seasonRepo.findOneBy({ id: Number(id) });
      if (!season) throw AppResponse.notFound('Temporada no encontrada');

      await this.seasonRepo.remove(season);
      AppResponse.ok(res, null, 'Temporada eliminada exitosamente');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al eliminar la temporada');
    }
  };
}

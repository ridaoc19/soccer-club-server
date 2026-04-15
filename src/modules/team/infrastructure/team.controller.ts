import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { TeamRepository } from './team.repository';
import { Team } from '../domain/team.entity';

export class TeamController {
  private teamRepo = TeamRepository;

  getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamRepo.find({ order: { name: 'ASC' } });
    AppResponse.ok(res, teams, 'Equipos obtenidos exitosamente');
  };

  getClubTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamRepo.findClubTeams();
    AppResponse.ok(res, teams, 'Equipos del club obtenidos');
  };

  create = async (req: Request, res: Response) => {
    try {
      const team = this.teamRepo.create(req.body as Partial<Team>);
      await this.teamRepo.save(team);
      AppResponse.created(res, team, 'Equipo creado exitosamente');
    } catch (error) {
      throw AppResponse.internal('Error al crear el equipo');
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const team = await this.teamRepo.findOneBy({ id: Number(id) });
      if (!team) throw AppResponse.notFound('Equipo no encontrado');

      this.teamRepo.merge(team, req.body);
      await this.teamRepo.save(team);
      AppResponse.ok(res, team, 'Equipo actualizado exitosamente');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al actualizar el equipo');
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.teamRepo.findOneBy({ id: Number(id) });
      if (!team) throw AppResponse.notFound('Equipo no encontrado');

      await this.teamRepo.remove(team);
      AppResponse.ok(res, null, 'Equipo eliminado exitosamente');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al eliminar el equipo');
    }
  };
}

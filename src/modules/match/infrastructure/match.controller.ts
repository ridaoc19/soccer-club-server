import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { GetMatchesUseCase } from '../application/get-matches.usecase';
import { SaveMatchUseCase } from '../application/save-match.usecase';
import { MatchRepository } from './match.repository';

export class MatchController {
  private getMatchesUseCase: GetMatchesUseCase;
  private saveMatchUseCase: SaveMatchUseCase;

  constructor() {
    this.getMatchesUseCase = new GetMatchesUseCase(MatchRepository);
    this.saveMatchUseCase = new SaveMatchUseCase(MatchRepository);
  }

  getAll = async (_req: Request, res: Response) => {
    const matches = await this.getMatchesUseCase.getAll();
    AppResponse.ok(res, matches, 'Partidos obtenidos');
  };

  getUpcoming = async (_req: Request, res: Response) => {
    const matches = await this.getMatchesUseCase.getUpcoming();
    AppResponse.ok(res, matches, 'Próximos partidos');
  };

  create = async (_req: Request, _res: Response) => {
    // const match = await this.saveMatchUseCase.create(req.body);
    // AppResponse.created(res, match, 'Partido creado');
  };

  updateLineup = async (_req: Request, _res: Response) => {
    // const { id } = req.params;
    // const match = await this.saveMatchUseCase.update(Number(id), { lineup: req.body as Match });
    // if (!match) {
    //   AppResponse.notFound('Partido no encontrado');
    //   return;
    // }
    // AppResponse.ok(res, match, 'Alineación actualizada');
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.saveMatchUseCase.delete(Number(id));
    AppResponse.ok(res, null, 'Partido eliminado');
  };
}

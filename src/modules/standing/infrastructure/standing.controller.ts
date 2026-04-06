import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { GetStandingUseCase } from '../application/get-standing.usecase';
import { MatchRepository } from '../../match/infrastructure/match.repository';

export class StandingController {
  private getStandingUseCase = new GetStandingUseCase(MatchRepository);

  getStanding = async (_req: Request, res: Response) => {
    const standing = await this.getStandingUseCase.execute();
    AppResponse.ok(res, standing, 'Tabla de posiciones obtenida');
  };
}

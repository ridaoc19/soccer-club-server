import { Request, Response } from 'express';
import { AppDataSource } from '../../../app/data-source';
import { Sponsor } from '../domain/sponsor.entity';
import { AppResponse } from '../../../core/base/http-response';

export class SponsorController {
  private sponsorRepo = AppDataSource.getRepository(Sponsor);

  getAll = async (_req: Request, res: Response) => {
    const sponsors = await this.sponsorRepo.find({ order: { type: 'ASC', name: 'ASC' } });
    AppResponse.ok(res, sponsors, 'Patrocinadores obtenidos');
  };

  create = async (req: Request, res: Response) => {
    const sponsor = this.sponsorRepo.create(req.body);
    await this.sponsorRepo.save(sponsor);
    AppResponse.created(res, sponsor, 'Patrocinador creado');
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const sponsor = await this.sponsorRepo.findOneBy({ id: Number(id) });
    if (!sponsor) return AppResponse.notFound(res, 'Patrocinador no encontrado');

    this.sponsorRepo.merge(sponsor, req.body);
    await this.sponsorRepo.save(sponsor);
    AppResponse.ok(res, sponsor, 'Patrocinador actualizado');
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.sponsorRepo.delete(id);
    AppResponse.ok(res, null, 'Patrocinador eliminado');
  };
}

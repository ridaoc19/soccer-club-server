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
    try {
      const sponsor = this.sponsorRepo.create(req.body as Partial<Sponsor>);
      await this.sponsorRepo.save(sponsor);
      AppResponse.created(res, sponsor, 'Patrocinador creado');
    } catch (error) {
      throw AppResponse.internal('Error al crear el patrocinador');
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sponsor = await this.sponsorRepo.findOneBy({ id: Number(id) });
      if (!sponsor) throw AppResponse.notFound('Patrocinador no encontrado');

      this.sponsorRepo.merge(sponsor, req.body);
      await this.sponsorRepo.save(sponsor);
      AppResponse.ok(res, sponsor, 'Patrocinador actualizado');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al actualizar el patrocinador');
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sponsor = await this.sponsorRepo.findOneBy({ id: Number(id) });
      if (!sponsor) throw AppResponse.notFound('Patrocinador no encontrado');

      await this.sponsorRepo.remove(sponsor);
      AppResponse.ok(res, null, 'Patrocinador eliminado');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al eliminar el patrocinador');
    }
  };
}

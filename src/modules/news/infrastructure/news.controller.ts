import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { NewsRepository } from './news.repository';
import { News } from '../domain/news.entity';
import { AuthRequest } from '../../../core/middleware/auth.middleware';

export class NewsController {
  private newsRepo = NewsRepository;

  getAll = async (_req: Request, res: Response) => {
    const news = await this.newsRepo.find({ order: { publishedAt: 'DESC' }, relations: ['author'] });
    AppResponse.ok(res, news, 'Noticias obtenidas');
  };

  getLatest = async (req: Request, res: Response) => {
    const limit = Number(req.query['limit'] ?? 5);
    const news = await this.newsRepo.findLatest(limit);
    AppResponse.ok(res, news, 'Últimas noticias obtenidas');
  };

  create = async (req: AuthRequest, res: Response) => {
    try {
      const news = this.newsRepo.create({
        ...req.body,
        author: { id: Number(req.user?.id ?? 0) },
      } as Partial<News>);

      await this.newsRepo.save(news);
      AppResponse.created(res, news, 'Noticia publicada con éxito');
    } catch (error) {
      throw AppResponse.internal('Error al publicar la noticia');
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const news = await this.newsRepo.findOneBy({ id: Number(id) });
      if (!news) throw AppResponse.notFound('Noticia no encontrada');

      this.newsRepo.merge(news, req.body);
      await this.newsRepo.save(news);
      AppResponse.ok(res, news, 'Noticia actualizada');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al actualizar la noticia');
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const news = await this.newsRepo.findOneBy({ id: Number(id) });
      if (!news) throw AppResponse.notFound('Noticia no encontrada');

      await this.newsRepo.remove(news);
      AppResponse.ok(res, null, 'Noticia eliminada');
    } catch (error) {
      if (error instanceof AppResponse) throw error;
      throw AppResponse.internal('Error al eliminar la noticia');
    }
  };
}

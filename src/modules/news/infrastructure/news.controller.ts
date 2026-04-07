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
    const news = this.newsRepo.create({
      ...req.body,
      author: { id: Number(req.user?.id ?? 0) },
    } as Partial<News>);

    await this.newsRepo.save(news);
    AppResponse.created(res, news, 'Noticia publicada con éxito');
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const news = await this.newsRepo.findOneBy({ id: Number(id) });
    if (!news) {
      AppResponse.notFound('Noticia no encontrada');
      return;
    }

    // this.newsRepo.merge(news, req.body);
    await this.newsRepo.save(news);
    AppResponse.ok(res, news, 'Noticia actualizada');
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.newsRepo.delete(id);
    AppResponse.ok(res, null, 'Noticia eliminada');
  };
}

import { AppDataSource } from '../../../app/data-source';
import { News } from '../domain/news.entity';

export const NewsRepository = AppDataSource.getRepository(News).extend({
  async findLatest(limit = 10) {
    return this.find({
      order: { publishedAt: 'DESC' },
      take: limit,
      relations: ['author'],
    });
  },
});

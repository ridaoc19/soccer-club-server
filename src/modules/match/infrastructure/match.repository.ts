import { AppDataSource } from '../../../app/data-source';
import { Match } from '../domain/match.entity';

export const MatchRepository = AppDataSource.getRepository(Match).extend({
  async findUpcoming() {
    return this.createQueryBuilder('match')
      .where('match.date > :now', { now: new Date() })
      .orderBy('match.date', 'ASC')
      .getMany();
  },

  async findPrevious() {
    return this.createQueryBuilder('match')
      .where('match.date < :now', { now: new Date() })
      .orderBy('match.date', 'DESC')
      .getMany();
  },
});

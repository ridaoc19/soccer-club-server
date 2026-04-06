import { AppDataSource } from '../../../app/data-source';
import { League } from '../domain/league.entity';

export const LeagueRepository = AppDataSource.getRepository(League).extend({
  async findWithSeasons() {
    return this.find({ relations: ['seasons'], order: { name: 'ASC' } });
  }
});

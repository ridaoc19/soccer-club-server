import { AppDataSource } from '../../../app/data-source';
import { Season } from '../domain/season.entity';

export const SeasonRepository = AppDataSource.getRepository(Season).extend({
  async findActiveByLeague(leagueId: number) {
    return this.find({
      where: { league: { id: leagueId }, isActive: true },
      order: { startDate: 'DESC' }
    });
  }
});

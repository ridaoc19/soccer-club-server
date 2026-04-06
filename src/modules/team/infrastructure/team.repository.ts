import { AppDataSource } from '../../../app/data-source';
import { Team } from '../domain/team.entity';

export const TeamRepository = AppDataSource.getRepository(Team).extend({
  async findClubTeams() {
    return this.find({ where: { isClub: true }, order: { name: 'ASC' } });
  },

  async findRivals() {
    return this.find({ where: { isClub: false }, order: { name: 'ASC' } });
  },
});

import { AppDataSource } from '../../../app/data-source';
import { Player } from '../domain/player.entity';

export const PlayerRepository = AppDataSource.getRepository(Player).extend({
  async findByTeam(teamId: number) {
    return this.find({ where: { team: { id: teamId } }, order: { number: 'ASC' } });
  },

  async findAllWithTeam() {
    return this.find({ relations: ['team'], order: { name: 'ASC' } });
  }
});

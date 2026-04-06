import { Match } from '../domain/match.entity';
import { MatchRepository } from '../infrastructure/match.repository';

export class GetMatchesUseCase {
  constructor(private matchRepo: typeof MatchRepository) {}

  async getAll(): Promise<Match[]> {
    return this.matchRepo.find({ order: { date: 'DESC' } });
  }

  async getUpcoming(): Promise<Match[]> {
    return this.matchRepo.findUpcoming();
  }

  async getById(id: number): Promise<Match | null> {
    return this.matchRepo.findOneBy({ id });
  }
}

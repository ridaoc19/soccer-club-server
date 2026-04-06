import { Match } from '../domain/match.entity';
import { MatchRepository } from '../infrastructure/match.repository';

export class SaveMatchUseCase {
  constructor(private matchRepo: typeof MatchRepository) {}

  async create(data: Partial<Match>): Promise<Match> {
    const match = this.matchRepo.create(data);
    return this.matchRepo.save(match);
  }

  async update(id: number, data: Partial<Match>): Promise<Match | null> {
    const existing = await this.matchRepo.findOneBy({ id });
    if (!existing) return null;

    Object.assign(existing, data);
    return this.matchRepo.save(existing);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.matchRepo.delete(id);
    return !!result.affected;
  }
}

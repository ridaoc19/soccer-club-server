import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { User } from '../domain/user.entity';

export class UsersRepository {
  constructor(private repo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.repo.find({ relations: ['roles'] });
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['roles', 'notifications'],
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  create(data: Partial<User>): Promise<User> {
    return this.repo.save(data);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}

import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';

export class CreateUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(data: { email: string }): Promise<User> {
    const exists = await this.usersRepo.findByEmail(data.email);

    if (exists) throw new Error('User already exists');

    return this.usersRepo.create(data);
  }
}

import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';

export class GetUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw AppResponse.notFound('Usuario no encontrado');
    }

    return user;
  }
}

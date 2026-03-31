import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';

export class DeleteUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number): Promise<void> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw AppResponse.notFound('Usuario no encontrado');
    }

    await this.usersRepo.delete(id);
  }
}

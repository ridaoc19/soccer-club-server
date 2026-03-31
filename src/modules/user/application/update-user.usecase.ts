import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';

export class UpdateUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number, data: { email?: string; name?: string; avatar?: string }): Promise<User> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw AppResponse.notFound('Usuario no encontrado');
    }

    if (data.email && data.email !== user.email) {
      const exists = await this.usersRepo.findByEmail(data.email);
      if (exists) {
        throw AppResponse.conflict('El correo electrónico ya está registrado por otro usuario');
      }
    }

    const updatedUser = await this.usersRepo.update(id, data);
    if (!updatedUser) {
      throw AppResponse.internal('No se pudo actualizar el usuario');
    }

    return updatedUser;
  }
}

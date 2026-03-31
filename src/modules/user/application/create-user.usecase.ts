import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';
import { PasswordUtils } from '../../../core/utils/password.utils';

export class CreateUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(data: { email: string; name: string; password: string; avatar?: string }): Promise<User> {
    const exists = await this.usersRepo.findByEmail(data.email);

    if (exists) {
      throw new AppResponse('El correo electrónico ya está registrado', 409);
    }

    // Hash de la contraseña antes de guardar
    const hashedPassword = await PasswordUtils.hash(data.password);

    return this.usersRepo.create({
      ...data,
      password: hashedPassword,
    });
  }
}

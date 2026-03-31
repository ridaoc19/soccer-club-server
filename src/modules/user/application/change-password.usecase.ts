import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';
import { PasswordUtils } from '../../../core/utils/password.utils';

export class ChangePasswordUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number, data: { oldPassword: string; newPassword: string }): Promise<void> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw AppResponse.notFound('Usuario no encontrado');
    }

    const isPasswordValid = await PasswordUtils.compare(data.oldPassword, user.password);

    if (!isPasswordValid) {
      throw AppResponse.unauthorized('La contraseña actual es incorrecta');
    }

    const hashedNewPassword = await PasswordUtils.hash(data.newPassword);

    await this.usersRepo.update(id, { password: hashedNewPassword });
  }
}

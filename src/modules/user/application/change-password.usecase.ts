import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';
import { PasswordUtils } from '../../../core/utils/password.utils';
import { ChangePasswordDto } from '../dto/change-password.dto';

export class ChangePasswordUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number, { password, confirmPassword }: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw AppResponse.notFound('Usuario no encontrado');
    }

    // const isPasswordValid = await PasswordUtils.compare(data.oldPassword, user.password);
    const isPasswordValid = password === confirmPassword;

    if (!isPasswordValid) {
      throw AppResponse.unauthorized('Las contraseñas no son iguales');
    }

    const hashedNewPassword = await PasswordUtils.hash(password);

    await this.usersRepo.update(id, { password: hashedNewPassword });
  }
}

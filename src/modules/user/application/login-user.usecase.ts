import { AppResponse } from '../../../core/base/http-response';
import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';
import { PasswordUtils } from '../../../core/utils/password.utils';
import { JwtUtils } from '../../../core/utils/jwt.utils';

export interface ILoginResponse {
  user: Omit<User, 'password'> & { token: string };
  message: string;
}

export class LoginUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(email: string, password: string): Promise<ILoginResponse> {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new AppResponse('El usuario no existe', 404);
    }

    // Comparar contraseñas
    const isPasswordValid = await PasswordUtils.compare(password, user.password);

    if (!isPasswordValid) {
      throw AppResponse.unauthorized('Contraseña incorrecta');
    }

    // Generar token JWT real
    const token = JwtUtils.sign('auth', { id: String(user.id), email: user.email });

    // Omitir la contraseña de la respuesta
    const { password: _pass, ...userWithoutPassword } = user;

    return {
      user: { ...userWithoutPassword, token },
      message: `${userWithoutPassword.name} inicio de sesión existoso`,
    };
  }
}

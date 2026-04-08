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
      throw new AppResponse('Usuario o contraseña incorrecta', 404);
    }

    const isPasswordValid = await PasswordUtils.compare(password, user.password);

    if (!isPasswordValid) {
      throw AppResponse.unauthorized('Usuario o contraseña incorrecta');
    }

    const token = JwtUtils.sign('login', { id: String(user.id), email: user.email });

    const { password: _pass, ...userWithoutPassword } = user;

    return {
      user: { ...userWithoutPassword, token },
      message: `${userWithoutPassword.name} inicio de sesión existoso`,
    };
  }
}

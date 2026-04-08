import { AppResponse } from '../../../core/base/http-response';
import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';

export interface IProfileResponse {
  user: Omit<User, 'password'>;
  message: string;
}
export class GetUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number, token: string): Promise<IProfileResponse> {
    let user = await this.usersRepo.findById(id);

    if (!user) throw AppResponse.notFound('Usuario no encontrado');

    // Usuario recien creados
    if (user.password && token === user.verification_token)
      throw AppResponse.badRequest('Este toquen ya fue utilizado, solicita un nuevo restablecimiento de contraseña');
    if (!user.password) {
      if ((user.verified_email, user.verification_token))
        throw AppResponse.badRequest('Cambia tu contraseña para ingresar a la web');
      user = await this.usersRepo.update(id, { verified_email: true, verification_token: token });
    }

    if (!user) throw AppResponse.notFound('Usuario no encontrado');

    const { password, ...userWithoutPassword } = user;

    return {
      message: !password
        ? `${user.name} acabas de validar tu correo, solo falta cambiar tu contreseña`
        : 'Perfil obtenido',
      user: userWithoutPassword,
    };
  }
}

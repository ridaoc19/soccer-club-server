import { AppResponse } from '../../../core/base/http-response';
import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';

export interface IProfileResponse {
  user: Omit<User, 'password'>;
  message: string;
}
export class GetUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(id: number): Promise<IProfileResponse> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw AppResponse.notFound('Usuario no encontrado');
    }

    const { password: _pass, ...userWithoutPassword } = user;
    return {
      message: 'Perfil obtenido',
      user: userWithoutPassword,
    };
  }
}

import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';

export class LoginUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) throw new Error('No se ha encontrado al usuario');

    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}

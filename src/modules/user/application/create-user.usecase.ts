import { AppResponse } from '../../../core/base/http-response';
import { JwtUtils } from '../../../core/utils/jwt.utils';
import { mailTemplates } from '../../../core/utils/mailer.utils';
import { User } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/user.repository';

export class CreateUserUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(data: { email: string; name: string; avatar?: string }): Promise<User> {
    const exists = await this.usersRepo.findByEmail(data.email);

    if (exists) {
      throw new AppResponse('El correo electrónico ya está registrado', 409);
    }

    // Hash de la contraseña antes de guardar
    // const hashedPassword = await PasswordUtils.hash(data.password);

    const userCreated = await this.usersRepo.create({
      ...data,
      // password: hashedPassword,
    });

    try {
      const resetToken = JwtUtils.sign('create_user', { id: String(userCreated.id), email: userCreated.email });
      const resetUrl = `${process.env.CLIENT_URL}/auth/change?token=${resetToken}`;

      const template = mailTemplates.resetPassword(resetUrl);
      console.log(template);
      // await sendMail({ to: userCreated.email, ...template });

      return userCreated;
    } catch (_error) {
      await this.usersRepo.delete(userCreated.id);
      throw new AppResponse('Error al enviar el correo de activación. El usuario no fue creado.', 500);
    }
  }
}

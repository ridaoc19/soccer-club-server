import { UsersRepository } from '../infrastructure/user.repository';
import { AppResponse } from '../../../core/base/http-response';
import { JwtUtils } from '../../../core/utils/jwt.utils';
import { sendMail, mailTemplates } from '../../../core/utils/mailer.utils';

export class ResetPasswordUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepo.findByEmail(email);

    // No revelamos si el email existe o no (seguridad)
    if (!user) return;

    const resetToken = JwtUtils.sign({ id: String(user.id), email: user.email });
    const resetUrl = `${process.env.CLIENT_URL}/auth/change?token=${resetToken}`;

    const template = mailTemplates.resetPassword(resetUrl);
    await sendMail({ to: user.email, ...template });
  }
}

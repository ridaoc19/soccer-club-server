import { JwtUtils } from '../../../core/utils/jwt.utils';
import { mailTemplates, sendMail } from '../../../core/utils/mailer.utils';
import { UsersRepository } from '../infrastructure/user.repository';

export class ResetPasswordUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepo.findByEmail(email);

    // No revelamos si el email existe o no (seguridad)
    if (!user) return;

    const resetToken = JwtUtils.sign('password_reset', { id: String(user.id), email: user.email });
    const resetUrl = `${process.env.CLIENT_URL}/auth/change?token=${resetToken}`;

    const template = mailTemplates.resetPassword(resetUrl);
    await sendMail({ to: user.email, ...template });
  }
}

import nodemailer, { type Transporter, type SendMailOptions } from 'nodemailer';

// ─── Transporter singleton ────────────────────────────────────────────────────

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465, // true solo para puerto 465 (SSL)
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  return transporter;
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// ─── Función principal ────────────────────────────────────────────────────────

export async function sendMail(options: MailOptions): Promise<void> {
  const mail: SendMailOptions = {
    from: process.env.MAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  await getTransporter().sendMail(mail);
}

// ─── Templates reutilizables ──────────────────────────────────────────────────

export const mailTemplates = {
  /**
   * Correo para restablecer contraseña.
   * @param resetUrl - URL completa con el token de reset
   */
  resetPassword: (resetUrl: string): Pick<MailOptions, 'subject' | 'html' | 'text'> => ({
    subject: 'Restablecer contraseña — Soccer Club',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}\n\nEste enlace expira en 1 hora.\nSi no solicitaste esto, ignora este correo.`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background: #1a1a1a; padding: 28px 32px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 1.4rem; letter-spacing: 2px; text-transform: uppercase;">
            ⚽ Soccer Club
          </h1>
        </div>
        <div style="padding: 36px 32px;">
          <h2 style="color: #1a1a1a; font-size: 1.2rem; margin: 0 0 12px;">Restablecer contraseña</h2>
          <p style="color: #616161; font-size: 0.95rem; line-height: 1.6; margin: 0 0 28px;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta.
            Haz clic en el botón de abajo para continuar. El enlace expira en <strong>1 hora</strong>.
          </p>
          <div style="text-align: center; margin-bottom: 28px;">
            <a href="${resetUrl}"
               style="display: inline-block; background: #e50000; color: #fff; text-decoration: none;
                      padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 0.95rem;
                      letter-spacing: 0.5px; text-transform: uppercase;">
              Restablecer contraseña
            </a>
          </div>
          <p style="color: #9e9e9e; font-size: 0.8rem; line-height: 1.5; margin: 0;">
            Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña no será modificada.<br><br>
            O copia y pega este enlace en tu navegador:<br>
            <a href="${resetUrl}" style="color: #e50000; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>
        <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
          <p style="color: #bdbdbd; font-size: 0.75rem; margin: 0;">
            © ${new Date().getFullYear()} Soccer Club. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `,
  }),
};

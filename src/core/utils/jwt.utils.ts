import jwt from 'jsonwebtoken';

const SECRET = process.env['JWT_SECRET'] ?? 'default_secret_key';

export type TokenType = 'login' | 'password_reset' | 'create_user';

export interface ITokenPayload {
  id: string;
  email: string;
  type: TokenType;
}

const TOKEN_EXPIRATION: Record<TokenType, string> = {
  login: '7d',
  create_user: '30m',
  password_reset: '1h',
};

export class JwtUtils {
  /**
   * Genera un token basado en el tipo especificado
   */
  static sign(type: TokenType, payload: Omit<ITokenPayload, 'type'>): string {
    const expiresIn = TOKEN_EXPIRATION[type];

    return jwt.sign({ ...payload, type }, SECRET as jwt.Secret, {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Verifica el token y retorna el payload tipado
   */
  static verify(token: string): ITokenPayload {
    return jwt.verify(token, SECRET) as ITokenPayload;
  }
}

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env['JWT_SECRET'] ?? 'default_secret_key';
const EXPIRES_IN = process.env['JWT_EXPIRES_IN'] ?? '7d';

export interface ITokenPayload {
  id: string;
  email: string;
}

export class JwtUtils {
  static sign(payload: ITokenPayload): string {
    return jwt.sign(payload, SECRET as jwt.Secret, {
      expiresIn: EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  static verify(token: string): ITokenPayload {
    return jwt.verify(token, SECRET) as ITokenPayload;
  }
}

import { Request, Response, NextFunction } from 'express';
import { ITokenPayload, JwtUtils } from '../utils/jwt.utils';
import { AppResponse } from '../base/http-response';

export interface AuthRequest extends Request {
  user?: ITokenPayload;
  token?: string;
}

export const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw AppResponse.unauthorized('No se proporcionó un token de autenticación');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = JwtUtils.verify(token || '');
    req.user = payload;
    req.token = token;
    next();
  } catch {
    throw AppResponse.unauthorized('Token inválido o expirado');
  }
};

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import configAuth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenDecoded {
  iat: number;

  exp: number;

  sub: string;
}

export default function endureAutehenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('JWT token missing.', 401);
  }

  try {
    const [, token] = authorization.split(' ');
    const decoded = verify(token, configAuth.jwt.secret);

    const { sub } = decoded as TokenDecoded;

    req.user = { id: sub };

    next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}

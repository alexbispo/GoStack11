import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import configAuth from '../config/auth';

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
    res.status(401).json({ error: 'JWT token missing.' });
    return;
  }

  try {
    const [, token] = authorization.split(' ');
    const decoded = verify(token, configAuth.jwt.secret);

    const { sub } = decoded as TokenDecoded;

    req.user = { id: sub };

    next();
  } catch {
    res.status(401).json({ error: 'Invalid JWT token.' });
  }
}

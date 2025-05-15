import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function getUserIdFromRawHeaders(req: Request): string | null {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return null;

  const token = (authHeader as string).split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as any;
    return decoded?.sub || null;
  } catch (err) {
    return null;
  }
}

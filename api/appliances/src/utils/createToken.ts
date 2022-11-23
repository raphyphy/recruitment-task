import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';

export const createToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION, // setting expiry time of tokens
  });
};
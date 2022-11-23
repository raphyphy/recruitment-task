import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/JwtPayload';
import { createToken } from '../utils/createToken';
import { CustomError } from '../utils/response/CustomError';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header('Authorization')?.replace('Bearer ', '') || undefined
  if (process.env.ENABLE_SESSION_JWT) { // Just to quickly verify token from session (parsing jwt from session)
    token = token || req.session!.jwt || undefined
  }

  if (!token) {
    return next(new CustomError(401, 'Unauthorized', 'User is not logged in!'))
  }
  try {
    // try / catch simplifies the error checking for token verification AND creation of new token
    let jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any }; // as generic object with string fields and generic field type
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]); // remove these fields to successfully create a new token

    const newToken = createToken(jwtPayload as JwtPayload);
    req.session!.jwt = newToken
  } catch(err) {
    return next(new CustomError(400, 'General', err as string))
  }
  return next()
};
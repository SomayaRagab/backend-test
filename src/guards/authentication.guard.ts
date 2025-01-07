import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from '../errors/unauthenticated-error';
import { User } from '../models/user.model';
import { IJwtPayload } from  '../types/jwt';

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new UnauthenticatedError('access token not found'));

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as IJwtPayload;
    const user = await User.findById(payload.id);
    if (!user) return next(new UnauthenticatedError('user not found'));

    req.loggedUser = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError('invalid or expire token');
  }
};

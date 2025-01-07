import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { IJwtPayload } from '../types/jwt';

export const generateAccessToken = (payload: IJwtPayload) =>
  jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.environment === 'development' ? '1d' : '2h',
  });

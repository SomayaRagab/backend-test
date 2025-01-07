/* eslint-disable @typescript-eslint/no-namespace */

import { IJwtPayload } from './jwt';
import { IPagination } from './Pagination';

declare module 'express-session' {
  interface SessionData {
    access: string;
    refresh: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      loggedUser: IJwtPayload;
      pagination: IPagination;
      lang: 'ar' | 'en';
    }
  }
}

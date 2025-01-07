import './types/custom.definition';

import cors from 'cors';
import express from 'express';

import { globalErrorHandlingMiddleware } from './middlewares/global-error-handling.middleware';
import { mountRoutes } from './routes';

export const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*', // allow all origins
  }),
);

app.use('/media', express.static('media'));

// mount all routes
mountRoutes(app);

app.use(globalErrorHandlingMiddleware);

import { ErrorRequestHandler } from 'express';

import { CustomError } from '../errors/custom-error';

export const globalErrorHandlingMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') console.log('error', err);

  // handle custom error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  if (err.name === 'MongoServerError' && err.code == '11000')
    return res
      .status(400)
      .json({ errors: [{ message: `${Object.keys(err.keyPattern)} is already exists` }] });

  if (err.name === 'JsonWebTokenError')
    return res.status(401).json({ errors: [{ message: 'invalid token' }] });

  if (err.name === 'TokenExpiredError')
    return res.status(401).json({ errors: [{ message: 'expired token' }] });

  if (err instanceof SyntaxError && 'body' in err)
    return res
      .status(400)
      .json({ errors: [{ message: 'Invalid JSON format. Please check your request body.' }] });

  res.status(500).json({ errors: [{ message: 'server error', details: err }] });
  next();
};

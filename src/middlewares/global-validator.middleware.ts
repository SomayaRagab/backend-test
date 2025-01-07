import fs from 'fs';
import path from 'path';

import { RequestHandler } from 'express';
import { validationResult, matchedData } from 'express-validator';

import { ValidationError } from '../errors/validation-error';

const errorMessagesFile = () => {
  try {
    const filePath = path.join(__dirname, '../messages/messages.json');
    const data = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading Error MessagesFile', error);
  }
};

export const globalValidatorMiddleware: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errorMessagesFile();
    const translatedErrors = errors.array().map((error) => ({
      ...error,
      msg: messages[error.msg] || error.msg,
    }));
    return next(new ValidationError(translatedErrors));
  }
  req.body = matchedData(req, { locations: ['body'] });
  req.params = matchedData(req, { locations: ['params'] });
  req.query = matchedData(req, { locations: ['query'] });
  next();
};

import { body, param, query } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/global-validator.middleware';

export const createUser = [
  body('firstName').isString().exists().withMessage('fieldRequired').bail(),
  body('lastName').isString().exists().withMessage('fieldRequired').bail(),
  body('email').isEmail().withMessage('invalidEmail').bail(),
  body('password').isStrongPassword().withMessage('invalidPassword').bail(),
  body('role').isMongoId().withMessage('invalidMongoId').bail(),

  globalValidatorMiddleware,
];

export const updateUser = [
  body('firstName').optional().isString().withMessage('fieldRequired').bail(),
  body('lastName').optional().isString().withMessage('fieldRequired').bail(),
  body('email').optional().isEmail().withMessage('invalidEmail').bail(),
  body('role').optional().isMongoId().withMessage('invalidMongoId').bail(),

  globalValidatorMiddleware,
];

export const updateMe = [
  body('firstName').optional().isString().withMessage('fieldRequired').bail(),
  body('lastName').optional().isString().withMessage('fieldRequired').bail(),
  body('email').optional().isEmail().withMessage('invalidEmail').bail(),

  globalValidatorMiddleware,
];

export const getUser = [
  param('userId').isMongoId().withMessage('invalidMongoId').bail(),
  globalValidatorMiddleware,
];

export const getAll = [
  query('limit').optional().isInt({ min: 1 }).toInt().withMessage('invalidLimit').bail(),
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('invalidPage').bail(),
  query('search').optional().isString().withMessage('invalidSearchKeyword').bail(),
  query('role').optional().isMongoId().withMessage('invalidMongoId').bail(),

  globalValidatorMiddleware,
];



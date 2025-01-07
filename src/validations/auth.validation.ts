import { body } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/global-validator.middleware';

export const login = [
  body('email').isEmail().withMessage('invalidEmail').bail(),
  body('password').isString().exists().withMessage('invalidPassword').bail(),
  globalValidatorMiddleware,
];

export const signup = [
  body('firstName').isString().exists().withMessage('fieldRequired').bail(),
  body('lastName').isString().exists().withMessage('fieldRequired').bail(),
  body('email').isEmail().withMessage('invalidEmail').bail(),
  body('password').isStrongPassword().withMessage('invalidPassword').bail(),
  body('confirmPassword')
    .isString()
    .exists()
    .withMessage('fieldRequired')
    .custom((value, { req }) => {
      if (req.body.password && value !== req.body.password) {
        throw new Error('passwordsNotMatched');
      }
      return true;
    })
    .bail(),

  globalValidatorMiddleware,
];

import { body, param, query } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/global-validator.middleware';

export const create = [
  body('name').isString().exists().withMessage('fieldRequired').bail(),
  body('quantity').isInt({ min: 1 }).exists().withMessage('invalidQuantity').bail(),
  body('price').isFloat({ min: 1 }).exists().withMessage('invalidPrice').bail(),
  body('category').optional().isString().withMessage('invalidCategory').bail(),
  globalValidatorMiddleware,
];

export const update = [
  param('productId').isMongoId().withMessage('invalidMongoId').bail(),
  body('name').optional().isString().withMessage('fieldRequired').bail(),
  body('quantity').optional().isInt({ min: 1 }).withMessage('invalidQuantity').bail(),
  body('price').optional().isFloat({ min: 1 }).withMessage('invalidPrice').bail(),
  body('category').optional().isString().withMessage('invalidCategory').bail(),

  globalValidatorMiddleware,
];

export const getOne = [
  param('productId').isMongoId().withMessage('invalidMongoId').bail(),
  globalValidatorMiddleware,
];

export const deleteOne = [
  param('productId').isMongoId().withMessage('invalidMongoId').bail(),
  globalValidatorMiddleware,
];

export const getAll = [
  query('limit').optional().isInt({ min: 1 }).toInt().withMessage('invalidLimit').bail(),
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('invalidPage').bail(),
  query('search').optional().isString().withMessage('invalidSearchKeyword').bail(),
  query('category').optional().isString().withMessage('invalidCategory').bail(),
  query('minPrice').optional().isFloat({ min: 1 }).withMessage('invalidPrice'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 1 })
    .custom((value, { req }) => !req.query?.minPrice || value >= req.query.minPrice)
    .withMessage('minMaxMismatch'),
  query('minQuantity').optional().isInt({ min: 0 }).withMessage('invalidQuantity'),
  query('maxQuantity')
    .optional()
    .isInt({ min: 0 })
    .custom((value, { req }) => !req.query?.minQuantity || value >= req.query.minQuantity)
    .withMessage('minMaxMismatch'),

  globalValidatorMiddleware,
];

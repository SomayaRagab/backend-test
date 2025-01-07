import { body, param, query } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/global-validator.middleware';
import { PERMISSIONS } from '../types/Permissions';

export const create = [
  body('key').isString().exists().withMessage('fieldRequired').bail(),
  body('permissions').isArray({ min: 1 }).withMessage('permissionsArrayRequired').bail(),
  body('permissions.*').isIn(Object.values(PERMISSIONS)).withMessage('invalidPermission').bail(),
  globalValidatorMiddleware,
];

export const update = [
  param('roleId').isMongoId().withMessage('invalidMongoId').bail(),
  body('key').optional().isString().exists().withMessage('keyArRequired').bail(),
  body('permissions').optional().isArray({ min: 1 }).withMessage('permissionsArrayRequired').bail(),
  body('permissions.*')
    .optional()
    .isIn(Object.values(PERMISSIONS))
    .withMessage('invalidPermission')
    .bail(),
  globalValidatorMiddleware,
];

export const getOne = [
  param('roleId').isMongoId().withMessage('invalidMongoId').bail(),
  globalValidatorMiddleware,
];

export const deleteOne = [
  param('roleId').isMongoId().withMessage('invalidMongoId').bail(),
  globalValidatorMiddleware,
];

export const getAll = [
  query('limit').optional().isInt({ min: 1 }).toInt().withMessage('invalidLimit').bail(),
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('invalidPage').bail(),
  query('search').optional().isString().withMessage('invalidSearchKeyword').bail(),
  query('permissions').optional().isArray().withMessage('invalidPermissions').bail(),
  query('permissions.*').optional().isString().withMessage('invalidPermission').bail(),
  query('system').optional().isBoolean().toBoolean().withMessage('invalidBoolean').bail(),
  globalValidatorMiddleware,
];

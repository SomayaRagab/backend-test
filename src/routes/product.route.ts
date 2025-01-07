import express from 'express';

import * as controllers from '../controllers/products';
import { isAuthenticated } from '../guards/authentication.guard';
import { isAuthorized } from '../guards/isAuthorized.guard';
import { isOptionalAuthenticated } from '../guards/optionalAuthentication.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { PERMISSIONS } from '../types/Permissions';
import * as val from '../validations/product.validation';

export const router = express.Router();

router
  .route('/')
  .post(
    isAuthenticated,
    isAuthorized(PERMISSIONS.createProduct),
    val.create,
    controllers.createProductHandler,
  )
  .get(
    isOptionalAuthenticated,
    val.getAll,
    globalPaginationMiddleware,
    controllers.getProductsPagination,
    controllers.getProductsHandler,
  );

router
  .route('/:productId')
  .put(
    isAuthenticated,
    isAuthorized(PERMISSIONS.updateProduct),
    val.update,
    controllers.updateProductHandler,
  )
  .get(isOptionalAuthenticated, val.getOne, controllers.getProductHandler)
  .delete(
    isAuthenticated,
    isAuthorized(PERMISSIONS.deleteProduct),
    val.deleteOne,
    controllers.deleteProductHandler,
  );

import express from 'express';

import * as controllers from '../controllers/users';
import { isAuthenticated } from '../guards/authentication.guard';
import { isAuthorized } from '../guards/isAuthorized.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { PERMISSIONS } from '../types/Permissions';
import * as val from '../validations/user.validation';

export const router = express.Router();

router.use(isAuthenticated);

router
  .route('/')
  .post(isAuthorized(PERMISSIONS.createUser), val.createUser, controllers.createUserHandler)
  .get(
    isAuthorized(PERMISSIONS.getUsers),
    val.getAll,
    globalPaginationMiddleware,
    controllers.getUsersPagination,
    controllers.getUsersHandler,
  );
router
  .route('/me')
  .get(controllers.getLoggedUserHandler)
  .put(val.updateMe, controllers.updateLoggedUserHandler);
router
  .route('/:userId')
  .put(isAuthorized(PERMISSIONS.updateUser), val.getUser, controllers.updateUserHandler)
  .get(isAuthorized(PERMISSIONS.getUser), val.getUser, controllers.getUserHandler)
  .delete(isAuthorized(PERMISSIONS.deleteUser), val.getUser, controllers.deleteUserHandler);

import express from 'express';

import * as controllers from '../controllers/roles';
import { isAuthenticated } from '../guards/authentication.guard';
import { isAuthorized } from '../guards/isAuthorized.guard';
import { globalPaginationMiddleware } from '../middlewares/global-pagination.middleware';
import { PERMISSIONS } from '../types/Permissions';
import * as val from '../validations/role.validation';

export const router = express.Router();

router.use(isAuthenticated);

router
  .route('/permissions')
  .get(isAuthorized(PERMISSIONS.getPermissions), controllers.getPermissionsHandler);

router
  .route('/')
  .post(isAuthorized(PERMISSIONS.createRole), val.create, controllers.createRoleHandler)
  .get(
    isAuthorized(PERMISSIONS.getRoles),
    val.getAll,
    globalPaginationMiddleware,
    controllers.getRolesPagination,
    controllers.getRolesHandler,
  );

router
  .route('/:roleId')
  .put(isAuthorized(PERMISSIONS.updateRole), val.update, controllers.updateRoleHandler)
  .get(isAuthorized(PERMISSIONS.getRole), val.getOne, controllers.getRoleHandler)
  .delete(isAuthorized(PERMISSIONS.deleteRole), val.deleteOne, controllers.deleteRoleHandler);

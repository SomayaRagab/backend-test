import { RequestHandler } from 'express';

import { UnauthorizedError } from '../errors/unauthorized-error';
import { PERMISSIONS } from '../types/Permissions';
import { SYSTEMROLES } from '../types/systemRoles';

export const isAuthorized = (permission: PERMISSIONS) => <RequestHandler>(async (req, res, next) => {
  if (req.loggedUser.role.key === SYSTEMROLES.admin) return next();

  if (!req.loggedUser.role.permissions.includes(permission))
    return next(new UnauthorizedError('you do not have permission to access this route'));
  return next();
});

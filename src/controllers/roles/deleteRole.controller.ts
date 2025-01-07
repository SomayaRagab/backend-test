import { RequestHandler } from 'express';

import 'express-async-errors';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';

export const deleteRoleHandler: RequestHandler<
  { roleId: string },
  SuccessResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  const role = await Role.findOneAndDelete({ _id: req.params.roleId, system: { $ne: true } });

  if (!role) return next(new UnauthorizedError('this role created by system can not delete it'));

  const users = await User.find({ role: req.params.roleId });
  if (users.length > 0) {
    return next(
      new UnauthorizedError('this role has users, please reassign users before deleting it'),
    );
  }
  res.status(204).json({ message: 'success' });
};

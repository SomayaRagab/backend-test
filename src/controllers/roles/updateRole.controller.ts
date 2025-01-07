import { RequestHandler } from 'express';

import 'express-async-errors';
import { BadRequestError } from '../../errors/bad-request-error';
import { NotFound } from '../../errors/notfound-error';
import { IRole, Role } from '../../models/role.model';
import { SuccessResponse } from '../../types/response';
import { SYSTEMROLES } from '../../types/systemRoles';

export const updateRoleHandler: RequestHandler<
  { roleId: string },
  SuccessResponse<{ data: IRole }>,
  Partial<Pick<IRole, 'key' | 'permissions'>>,
  unknown
> = async (req, res, next) => {
  const role = await Role.findOne({
    _id: req.params.roleId,
    // not equal admin or defualt
    key: { $nin: [SYSTEMROLES.admin, SYSTEMROLES.default] },
  });

  if (!role) return next(new NotFound(`role with id ${req.params.roleId} not found`));

  if (role.system && req.body.key)
    return next(new BadRequestError('can not update system role key'));

  const updatedRole = await Role.findByIdAndUpdate(req.params.roleId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: 'success', data: updatedRole! });
};

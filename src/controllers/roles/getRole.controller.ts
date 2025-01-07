import { RequestHandler } from 'express';

import 'express-async-errors';
import { NotFound } from '../../errors/notfound-error';
import { IRole, Role } from '../../models/role.model';
import { SuccessResponse } from '../../types/response';

export const getRoleHandler: RequestHandler<
  { roleId: string },
  SuccessResponse<{ data: IRole }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const role = await Role.findById(req.params.roleId);
  if (!role)
    return next(new NotFound(`role with id ${req.params.roleId} not found`));

  res.status(200).json({ message: 'success', data: role });
};

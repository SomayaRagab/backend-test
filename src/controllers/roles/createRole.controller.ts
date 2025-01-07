import { RequestHandler } from 'express';

import 'express-async-errors';
import { IRole, Role } from '../../models/role.model';
import { SuccessResponse } from '../../types/response';

export const createRoleHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IRole }>,
  Pick<IRole, 'key' | 'permissions'>,
  unknown
> = async (req, res) => {
  const role = await Role.create(req.body);
  res.status(201).json({ message: 'success', data: role });
};

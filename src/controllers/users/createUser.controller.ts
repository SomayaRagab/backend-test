import { RequestHandler } from 'express';

import 'express-async-errors';
import { NotFound } from '../../errors/notfound-error';
import { Role } from '../../models/role.model';
import { IUser, User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';
import { hashPassword } from '../../utils/bcrypt';

export const createUserHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IUser }>,
  Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password' | 'role'>,
  unknown
> = async (req, res, next) => {
  const role = await Role.findById(req.body.role);
  if (!role) return next(new NotFound(`role with id ${req.body.role} not found`));

  const user = await User.create({
    ...req.body,
    password: await hashPassword(req.body.password),
  });
  res.status(201).json({ message: 'success', data: user });
};

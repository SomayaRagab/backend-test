import { RequestHandler } from 'express';

import 'express-async-errors';
import { NotFound } from '../../errors/notfound-error';
import { IUser, User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';

export const getUserHandler: RequestHandler<
  { userId: string },
  SuccessResponse<{ data: IUser }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate({ path: 'role', select: 'key permissions' })
    .select('-password');

  if (!user) return next(new NotFound(`user with id ${req.params.userId} not found`));

  res.status(200).json({ message: 'success', data: user });
};

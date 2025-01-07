import { RequestHandler } from 'express';

import 'express-async-errors';

import { NotFound } from '../../errors/notfound-error';
import { IUser, User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';

export const updateLoggedUserHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IUser }>,
  Partial<Pick<IUser, 'firstName' | 'lastName' | 'email'>>,
  unknown
> = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.loggedUser.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new NotFound('User not found'));

  res.status(200).json({ message: 'success', data: updatedUser });
};

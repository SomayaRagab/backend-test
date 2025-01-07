import { RequestHandler } from 'express';

import 'express-async-errors';

import { NotFound } from '../../errors/notfound-error';
import { IUser, User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';

export const updateUserHandler: RequestHandler<
  { userId: string },
  SuccessResponse<{ data: IUser }>,
  Partial<Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password' | 'role'>>,
  unknown
> = async (req, res, next) => {
  if (req.body.role) {
    const role = await User.findOne({
      _id: req.body.role,
    });

    if (!role) return next(new NotFound(`role with id ${req.body.role} not found`));
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new NotFound(`user with id ${req.params.userId} not found`));

  res.status(200).json({ message: 'success', data: updatedUser });
};

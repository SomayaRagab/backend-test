import { RequestHandler } from 'express';

import { NotFound } from '../../errors/notfound-error';
import { User, IUser } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';

export const getLoggedUserHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IUser }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const user = await User.findById(req.loggedUser.id)
    .select('-password')
    .populate({ path: 'role', select: 'key permissions' });

  if (!user) return next(new NotFound('User not found'));

  return res.status(200).json({ message: 'success', data: user  });
};

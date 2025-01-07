import { RequestHandler } from 'express';

import 'express-async-errors';
import { NotFound } from '../../errors/notfound-error';
import { User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';

export const deleteUserHandler: RequestHandler<
  { userId: string },
  SuccessResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.userId, system: { $ne: true } });

  if (!user) return next(new NotFound(`user with id ${req.params.userId} not found`));

  res.status(204).json({ message: 'success' });
};

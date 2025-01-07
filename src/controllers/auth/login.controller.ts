import { RequestHandler } from 'express';

import 'express-async-errors';
import { BadRequestError } from '../../errors/bad-request-error';
import { NotFound } from '../../errors/notfound-error';
import { Role } from '../../models/role.model';
import { IUser, User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';
import { comparePassword } from '../../utils/bcrypt';
import { generateAccessToken } from '../../utils/generateAcessToken';

export const loginHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IUser }>,
  Pick<IUser, 'email' | 'password'>,
  unknown
> = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new NotFound('user not found'));

  if (!(await comparePassword(req.body.password , user.password)))
    return next(new BadRequestError('Invalid email or password'));

  const role = await Role.findById(user.role);
  // generate token
  const token = generateAccessToken({
    id: user._id.toString(),
    role: { id: role!._id.toString(), key: role!.key, permissions: role!.permissions },
  });

  user.token = token;
  await user.save();

  res.status(200).json({ message: 'success', data: user });
};

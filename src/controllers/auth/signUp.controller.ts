import { RequestHandler } from 'express';

import 'express-async-errors';
import { BadRequestError } from '../../errors/bad-request-error';
import { Role } from '../../models/role.model';
import { IUser, User } from '../../models/user.model';
import { SuccessResponse } from '../../types/response';
import { SYSTEMROLES } from '../../types/systemRoles';
import { hashPassword } from '../../utils/bcrypt';
import { generateAccessToken } from '../../utils/generateAcessToken';

export const signupHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IUser }>,
  Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName'>,
  unknown
> = async (req, res, next) => {
  const existEmail = await User.findOne({ email: req.body.email });

  if (existEmail) return next(new BadRequestError('email is exist, please login'));

  const role = await Role.findOne({ key: SYSTEMROLES.default });
  const user = await User.create({
    ...req.body,
    role: role!._id,
    password: await hashPassword(req.body.password),
  });
  // generate token
  const token = generateAccessToken({
    id: user._id.toString(),
    role: { id: role!._id.toString(), key: role!.key, permissions: role!.permissions },
  });

  user.token = token;
  await user.save();

  res.status(201).json({ message: 'success', data: user });
};

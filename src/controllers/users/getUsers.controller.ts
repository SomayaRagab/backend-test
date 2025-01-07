import { RequestHandler } from 'express';

import 'express-async-errors';
import { IUser, User } from '../../models/user.model';
import { PaginationResponse } from '../../types/response';

export const getUsersPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    search?: string;
    email?: string[];
    role?: string;
    system?: boolean;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.search)
    req.pagination.filter.$or = [
      { firsName: { $regex: req.query.search, $options: 'i' } },
      { lastName: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
    ];

  if (req.query.role) {
    req.pagination.filter.role = req.query.role;
  }

  if (req.query.email) {
    req.pagination.filter.email = { $all: req.query.email };
  }

  next();
};

export const getUsersHandler: RequestHandler<
  unknown,
  PaginationResponse<{ data: IUser[] }>,
  unknown,
  unknown
> = async (req, res) => {
  const roles = await User.find(req.pagination.filter)
    .populate({ path: 'role', select: 'key permissions' })
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit);

  const resultCount = await User.countDocuments(req.pagination.filter);

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: roles,
  });
};

import { RequestHandler } from 'express';

import 'express-async-errors';
import { IRole, Role } from '../../models/role.model';
import { PaginationResponse } from '../../types/response';

export const getRolesPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    search?: string;
    permissions?: string[];
    system?: boolean;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};

  if (req.query.search)
    req.pagination.filter.$or = [
      { 'key.ar': { $regex: req.query.search, $options: 'i' } },
      { 'key.en': { $regex: req.query.search, $options: 'i' } },
    ];

  if (req.query.permissions?.length) {
    req.pagination.filter.permissions = { $all: req.query.permissions };
  }

  if (req.query.system !== undefined) {
    req.pagination.filter.system = req.query.system;
  }

  next();
};

export const getRolesHandler: RequestHandler<
  unknown,
  PaginationResponse<{ data: IRole[] }>,
  unknown,
  unknown
> = async (req, res) => {
  const roles = await Role.find(req.pagination.filter)
    .sort({ createdAt: -1 })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit);

  const resultCount = await Role.countDocuments(req.pagination.filter);

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

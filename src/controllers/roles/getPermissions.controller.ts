import { RequestHandler } from 'express';

import 'express-async-errors';
import { permissions } from '../../types/Permissions';
import { SuccessResponse } from '../../types/response';

export const getPermissionsHandler: RequestHandler<
  unknown,
  SuccessResponse,
  unknown,
  unknown
> = async (req, res) => {
  res.status(200).json(<any>{ data: permissions });
};

import { RequestHandler } from 'express';

import 'express-async-errors';

import { NotFound } from '../../errors/notfound-error';
import { Product } from '../../models/product.model';
import { SuccessResponse } from '../../types/response';

export const deleteProductHandler: RequestHandler<
  { productId: string },
  SuccessResponse,
  unknown,
  unknown
> = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (!product) return next(new NotFound(`product with id ${req.params.productId} not found`));

  res.status(204).json({ message: 'success' });
};

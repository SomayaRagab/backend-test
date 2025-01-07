import { RequestHandler } from 'express';

import 'express-async-errors';

import { NotFound } from '../../errors/notfound-error';
import { IProduct, Product } from '../../models/product.model';
import { SuccessResponse } from '../../types/response';

export const getProductHandler: RequestHandler<
  { productId: string },
  SuccessResponse<{ data: IProduct }>,
  unknown,
  unknown
> = async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return next(new NotFound(`product with id ${req.params.productId} not found`));

  res.status(200).json({ message: 'success', data: product });
};

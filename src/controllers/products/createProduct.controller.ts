import { RequestHandler } from 'express';

import 'express-async-errors';

import { IProduct, Product } from '../../models/product.model';
import { SuccessResponse } from '../../types/response';

export const createProductHandler: RequestHandler<
  unknown,
  SuccessResponse<{ data: IProduct }>,
  Pick<IProduct, 'name' | 'price' | 'category' | 'quantity'>,
  unknown
> = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: 'success', data: product });
};

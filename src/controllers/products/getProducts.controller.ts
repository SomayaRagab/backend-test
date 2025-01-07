import { RequestHandler } from 'express';

import 'express-async-errors';

import { IProduct, Product } from '../../models/product.model';
import { PaginationResponse } from '../../types/response';

export const getProductsPagination: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minQuantity?: number;
    maxQuantity?: number;
  }
> = async (req, res, next) => {
  req.pagination.filter = {};
  if (req.query.search) {
    req.pagination.filter.name = { $regex: req.query.search, $options: 'i' };
  }

  if (req.query.category) {
    req.pagination.filter.category = req.query.category;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    req.pagination.filter.price = {};
    if (req.query.minPrice) {
      req.pagination.filter.price.$gte = req.query.minPrice;
    }
    if (req.query.maxPrice) {
      req.pagination.filter.price.$lte = req.query.maxPrice;
    }
  }

  if (req.query.minQuantity || req.query.maxQuantity) {
    req.pagination.filter.quantity = {};
    if (req.query.minQuantity) {
      req.pagination.filter.quantity.$gte = req.query.minQuantity;
    }
    if (req.query.maxQuantity) {
      req.pagination.filter.quantity.$lte = req.query.maxQuantity;
    }
  }
  next();
};

export const getProductsHandler: RequestHandler<
  unknown,
  PaginationResponse<{ data: IProduct[] }>,
  unknown,
  unknown
> = async (req, res) => {
  const products = await Product.find(req.pagination.filter)
    .sort({ createdAt: -1 })
    .skip(req.pagination.skip)
    .limit(req.pagination.limit);

  const resultCount = await Product.countDocuments(req.pagination.filter);

  res.status(200).json({
    message: 'success',
    pagination: {
      currentPage: req.pagination.page,
      resultCount,
      totalPages: Math.ceil(resultCount / req.pagination.limit),
    },
    data: products,
  });
};

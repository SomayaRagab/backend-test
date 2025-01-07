import { Document, Schema, model } from 'mongoose';

import { MODELS } from '../types/modelsName';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export const Product = model<IProduct>(
  MODELS.product,
  new Schema<IProduct>(
    {
      name: { type: String, required: true },
      category: { type: String, default: null },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    { timestamps: true, collection: MODELS.product },
  ),
);

Product.collection.createIndex({
  firstName: 1,
  lastName: 1,
});

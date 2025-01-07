import { Document, Schema, model } from 'mongoose';

import { MODELS } from '../types/modelsName';
import { PERMISSIONS } from '../types/Permissions';

export interface IRole extends Document {
  _id: string;
  key: string;
  permissions: PERMISSIONS[];
  system: boolean;
}

export const Role = model<IRole>(
  MODELS.role,
  new Schema<IRole>(
    {
      key: { type: String, required: true, unique: true },
      permissions: { type: [String] },
      system: { type: Boolean, default: false },
    },
    { timestamps: true, collection: MODELS.role },
  ),
);


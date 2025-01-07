import { Document, Types, Schema, model } from 'mongoose';

import { IRole } from './role.model';
import { MODELS } from '../types/modelsName';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IRole;
  token: string;
  system: boolean;
}

export const User = model<IUser>(
  MODELS.user,
  new Schema<IUser>(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: Types.ObjectId, ref: MODELS.role },
      token : { type: String  , default: null },
      system: { type: Boolean, default: false },

    },
    { timestamps: true, collection: MODELS.user },
  ),
);

// pre hook for hashing password

User.collection.createIndex({
  firstName: 1,
  lastName: 1,
});

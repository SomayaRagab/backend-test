import mongoose from 'mongoose';

import { DatabaseConnectionError } from '../errors/data-base-connections';

export const dbConnection = (URI: string) => {
  return mongoose
    .connect(URI, { serverSelectionTimeoutMS: 50000 })
    .then((conn) => {
      console.log(`database connected in : ${conn.connection.host}`);
    })
    .catch(() => {
      throw new DatabaseConnectionError();
    });
};

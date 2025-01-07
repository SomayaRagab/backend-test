import { app } from './app';

import { dbConnection } from './config/database-connection';
import { checkEnvVariables, env } from './config/env';
import { ServerError } from './errors/server-error';

const start = async () => {
  // check required environment
  checkEnvVariables();
  await dbConnection(env.mongoDb.uri);

  const server = app.listen(env.port, async () => {
    console.log(`app listen on port ${env.port}`);
  });
};


start();

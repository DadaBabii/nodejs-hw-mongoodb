import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import rootRouter from './routers/index.js';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.get('/', (req, res, next) => {
    res.send('Welcome');
  });

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(rootRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

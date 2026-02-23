import cors from 'cors';
import express, { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { errorHandlerMiddleware } from '@shared/infrastructure/middleware/error-handler.middleware';
import { notFoundMiddleware } from '@shared/infrastructure/middleware/not-found.middleware';

export function createHttpApp(container: Container): Application {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(cors());
    app.use(express.json());
  });

  server.setErrorConfig((app) => {
    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
  });

  return server.build();
}

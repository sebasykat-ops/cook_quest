import cors from 'cors';
import express, { Express } from 'express';
import { Container } from 'inversify';
import { errorHandlerMiddleware } from '../middleware/error-handler.middleware';
import { notFoundMiddleware } from '../middleware/not-found.middleware';
import { registerHttpRoutes } from './register-http-routes';

export function createHttpApp(container: Container): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  registerHttpRoutes(app, container);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
}

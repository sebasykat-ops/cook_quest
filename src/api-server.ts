import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { createMainContainer } from './shared-kernel/infrastructure/di/container';
import { registerHttpRoutes } from './shared-kernel/infrastructure/http/register-http-routes';
import { seedData } from './shared-kernel/infrastructure/seed-data';

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT ?? 3000);

createMainContainer()
  .then(async (container) => {
    registerHttpRoutes(app, container);
    await seedData(container);

    app.listen(port, () => {
      console.log(`CookQuest API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('API bootstrap failed', error);
    process.exit(1);
  });

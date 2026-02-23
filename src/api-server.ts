import 'reflect-metadata';

import { createMainContainer } from '@shared/infrastructure/container/container';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';
import { runMigrationsUp } from '@shared/infrastructure/database/run-migrations-up';
import { createHttpApp } from '@shared/infrastructure/http/create-http-app';
import { seedData } from '@shared/infrastructure/seed-data';
import { Knex } from 'knex';

const port = Number(process.env.PORT ?? 3000);

try {
  const container = createMainContainer();
  const app = createHttpApp(container);
  const useInMemory = process.env.USE_IN_MEMORY === 'true';
  const setupPromise = useInMemory
    ? Promise.resolve()
    : runMigrationsUp(container.get<Knex>(sharedKernelContainerTypes.knexClient));

  setupPromise
    .then(() => seedData(container))
    .then(() => {
      app.listen(port, () => {
        console.log(`CookQuest API running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('API bootstrap failed', error);
      process.exit(1);
    });
} catch (error) {
  console.error('API bootstrap failed', error);
  process.exit(1);
}

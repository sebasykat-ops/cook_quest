import 'reflect-metadata';

import { createMainContainer } from './shared-kernel/infrastructure/di/container';
import { createHttpApp } from './shared-kernel/infrastructure/http/create-http-app';
import { seedData } from './shared-kernel/infrastructure/seed-data';

const port = Number(process.env.PORT ?? 3000);

createMainContainer()
  .then(async (container) => {
    const app = createHttpApp(container);
    await seedData(container);

    app.listen(port, () => {
      console.log(`CookQuest API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('API bootstrap failed', error);
    process.exit(1);
  });

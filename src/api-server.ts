import 'reflect-metadata';

import { createMainContainer } from '@shared/infrastructure/container/container';
import { createHttpApp } from '@shared/infrastructure/http/create-http-app';
import { seedData } from '@shared/infrastructure/seed-data';

const port = Number(process.env.PORT ?? 3000);

try {
  const container = createMainContainer();
  const app = createHttpApp(container);

  seedData(container)
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

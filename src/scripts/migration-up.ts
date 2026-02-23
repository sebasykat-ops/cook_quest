import 'reflect-metadata';

import { Knex } from 'knex';
import { createMainContainer } from '@shared/infrastructure/container/container';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';
import { runMigrationsUp } from '@shared/infrastructure/database/run-migrations-up';

async function run(): Promise<void> {
  const container = createMainContainer();
  const knexClient = container.get<Knex>(sharedKernelContainerTypes.knexClient);

  await runMigrationsUp(knexClient);
  console.log('✅ migration:up completed (all pending migrations executed).');

  await knexClient.destroy();
}

run().catch((error) => {
  console.error('❌ migration:up failed', error);
  process.exit(1);
});

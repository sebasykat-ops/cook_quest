import 'reflect-metadata';

import { Knex } from 'knex';
import { createMainContainer } from '@shared/infrastructure/container/container';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';
import { ensureDatabaseSchema } from '@shared/infrastructure/database/ensure-database-schema';
import { resetAndSeedData } from '@shared/infrastructure/seed-data';

async function run(): Promise<void> {
  const container = createMainContainer();
  const knexClient = container.get<Knex>(sharedKernelContainerTypes.knexClient);

  await ensureDatabaseSchema(knexClient);
  await resetAndSeedData(container);

  console.log('✅ Seed completed: database reset and populated with 5 recipes.');
  await knexClient.destroy();
}

run().catch((error) => {
  console.error('❌ Seed failed', error);
  process.exit(1);
});

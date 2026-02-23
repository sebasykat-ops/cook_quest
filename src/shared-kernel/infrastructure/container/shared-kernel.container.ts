import { ContainerModule } from 'inversify';
import '@shared/infrastructure/controllers';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';
import { createKnexClient } from '@shared/infrastructure/database/create-knex-client';

export const sharedKernelContainer = new ContainerModule((bind) => {
  bind(sharedKernelContainerTypes.knexClient).toConstantValue(createKnexClient());
});

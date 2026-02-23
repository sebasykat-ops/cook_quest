import { ContainerModule } from 'inversify';
import '@shared/infrastructure/controllers';

export const sharedKernelContainer = new ContainerModule(() => {
  // Shared kernel bindings can be added here.
});

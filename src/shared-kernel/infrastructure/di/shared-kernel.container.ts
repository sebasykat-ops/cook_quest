import { ContainerModule } from 'inversify';
import '../controllers';

export const sharedKernelContainer = new ContainerModule(() => {
  // Shared kernel bindings can be added here.
});

import { ContainerModule } from 'inversify';
import { GetHealthController } from '../controllers/get-health.controller';
import { tokens } from './tokens';

export const sharedKernelContainer = new ContainerModule(({ bind }) => {
  bind(tokens.sharedKernel.getHealthController).to(GetHealthController).inSingletonScope();
});

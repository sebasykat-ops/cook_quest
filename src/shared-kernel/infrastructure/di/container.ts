import { Container } from 'inversify';
import { missionExecutionContainer } from '../../../mission-execution/infrastructure/di/mission-execution.container';
import { recipeCatalogContainer } from '../../../recipe-catalog/infrastructure/di/recipe-catalog.container';
import { sharedKernelContainer } from './shared-kernel.container';

export async function createMainContainer(): Promise<Container> {
  const mainContainer = new Container();

  await mainContainer.load(sharedKernelContainer);
  await mainContainer.load(recipeCatalogContainer);
  await mainContainer.load(missionExecutionContainer);

  return mainContainer;
}

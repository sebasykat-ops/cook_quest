import { Container } from 'inversify';
import { missionExecutionContainer } from '@mission-execution/infrastructure/container/mission-execution.container';
import { recipeCatalogContainer } from '@recipe-catalog/infrastructure/container/recipe-catalog.container';
import { sharedKernelContainer } from '@shared/infrastructure/container/shared-kernel.container';

export function createMainContainer(): Container {
  const mainContainer = new Container();
  mainContainer.load(sharedKernelContainer, recipeCatalogContainer, missionExecutionContainer);
  return mainContainer;
}

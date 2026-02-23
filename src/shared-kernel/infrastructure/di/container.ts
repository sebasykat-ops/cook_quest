import { Container } from 'inversify';
import { missionExecutionContainer } from '@mission-execution/infrastructure/di/mission-execution.container';
import { recipeCatalogContainer } from '@recipe-catalog/infrastructure/di/recipe-catalog.container';
import { sharedKernelContainer } from '@shared/infrastructure/di/shared-kernel.container';

export function createMainContainer(): Container {
  const mainContainer = new Container();

  mainContainer.load(sharedKernelContainer, recipeCatalogContainer, missionExecutionContainer);

  return mainContainer;
}

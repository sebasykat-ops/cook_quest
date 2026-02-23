import { Container } from 'inversify';
import { CreateRecipeUseCase } from '../../../recipe-catalog/application/use-cases/create-recipe.use-case';
import { InMemoryRecipeRepository } from '../../../recipe-catalog/infrastructure/repositories/in-memory-recipe.repository';
import { AdvanceMissionStepUseCase } from '../../../mission-execution/application/use-cases/advance-mission-step.use-case';
import { InMemoryMissionProgressRepository } from '../../../mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';
import { tokens } from './tokens';

export function createContainer(): Container {
  const container = new Container();

  container.bind<InMemoryRecipeRepository>(tokens.recipeRepository).to(InMemoryRecipeRepository).inSingletonScope();
  container.bind<InMemoryMissionProgressRepository>(tokens.missionProgressRepository).to(InMemoryMissionProgressRepository).inSingletonScope();

  container
    .bind<CreateRecipeUseCase>(tokens.createRecipeUseCase)
    .toDynamicValue(() => new CreateRecipeUseCase(container.get(tokens.recipeRepository)))
    .inSingletonScope();

  container
    .bind<AdvanceMissionStepUseCase>(tokens.advanceMissionStepUseCase)
    .toDynamicValue(() => new AdvanceMissionStepUseCase(container.get(tokens.missionProgressRepository)))
    .inSingletonScope();

  return container;
}

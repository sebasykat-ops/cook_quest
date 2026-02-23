import { Container } from 'inversify';
import { CreateRecipeUseCase } from '@recipe-catalog/application/use-cases/create-recipe.use-case';
import { MissionProgress } from '@mission-execution/domain/entities/mission-progress.entity';
import { MissionId } from '@mission-execution/domain/value-objects/mission-id.value-object';
import { InMemoryMissionProgressRepository } from '@mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';

export async function seedData(container: Container): Promise<void> {
  const createRecipeUseCase = container.get<CreateRecipeUseCase>(recipeCatalogContainerTypes.createRecipeUseCase);
  const missionProgressRepository = container.get<InMemoryMissionProgressRepository>(
    missionExecutionContainerTypes.missionProgressRepository
  );

  await createRecipeUseCase.execute({
    id: 'recipe-1',
    title: 'Brownie sin horno',
    difficulty: 'easy',
    totalMinutes: 20,
    requiresAdult: false
  });

  await missionProgressRepository.save(
    MissionProgress.create(MissionId.create('mission-1'), {
      recipeId: 'recipe-1',
      currentStep: 1,
      totalSteps: 5,
      isCompleted: false
    })
  );
}

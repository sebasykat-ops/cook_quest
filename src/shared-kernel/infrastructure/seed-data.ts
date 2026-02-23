import { Container } from 'inversify';
import { CreateRecipeUseCase } from '@recipe-catalog/application/use-cases/create-recipe.use-case';
import { RecipeStep } from '@recipe-catalog/domain/entities/recipe-step.entity';
import { InMemoryRecipeStepRepository } from '@recipe-catalog/infrastructure/repositories/in-memory-recipe-step.repository';
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
  const recipeStepRepository = container.get<InMemoryRecipeStepRepository>(
    recipeCatalogContainerTypes.recipeStepRepository
  );

  await createRecipeUseCase.execute({
    id: 'recipe-1',
    title: 'Brownie sin horno',
    difficulty: 'easy',
    totalMinutes: 20,
    requiresAdult: false
  });

  await recipeStepRepository.saveMany([
    RecipeStep.create(
      'step-1',
      'recipe-1',
      1,
      'Lava tus manos y prepara un bowl grande.',
      'La higiene es el primer paso de toda receta.',
      undefined,
      false,
      'none'
    ),
    RecipeStep.create(
      'step-2',
      'recipe-1',
      2,
      'Mezcla 6 cucharadas de cacao con 4 cucharadas de azúcar.',
      'Usa una cuchara seca para evitar grumos.',
      60,
      false,
      'none'
    ),
    RecipeStep.create(
      'step-3',
      'recipe-1',
      3,
      'Agrega 4 cucharadas de leche y 2 cucharadas de mantequilla derretida.',
      'Si no hay mantequilla, usa aceite neutro.',
      90,
      false,
      'none'
    ),
    RecipeStep.create(
      'step-4',
      'recipe-1',
      4,
      'Lleva la mezcla al microondas por 1 minuto y revisa textura.',
      'Haz este paso con un adulto cerca.',
      60,
      true,
      'heat'
    ),
    RecipeStep.create(
      'step-5',
      'recipe-1',
      5,
      'Deja enfriar 2 minutos y sirve tu brownie sin horno.',
      'Puedes decorar con chips de chocolate.',
      120,
      false,
      'none'
    )
  ]);

  await missionProgressRepository.save(
    MissionProgress.create(MissionId.create('mission-1'), 'recipe-1', 1, 5, false)
  );
}

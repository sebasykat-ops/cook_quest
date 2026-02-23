import { Container } from 'inversify';
import { Knex } from 'knex';
import { CreateRecipeUseCase } from '@recipe-catalog/application/use-cases/create-recipe.use-case';
import { RecipeStep } from '@recipe-catalog/domain/entities/recipe-step.entity';
import { RecipeStepRepository } from '@recipe-catalog/domain/repositories/recipe-step.repository';
import { MissionProgress } from '@mission-execution/domain/entities/mission-progress.entity';
import { MissionProgressRepository } from '@mission-execution/domain/repositories/mission-progress.repository';
import { MissionId } from '@mission-execution/domain/value-objects/mission-id.value-object';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import sharedKernelContainerTypes from '@shared/infrastructure/container/shared-kernel.container.types';

const recipeSchema = process.env.MYSQL_RECIPE_SCHEMA ?? 'cookquest_recipe_catalog';
const missionSchema = process.env.MYSQL_MISSION_SCHEMA ?? 'cookquest_mission_execution';

interface SeedRecipe {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalMinutes: number;
  requiresAdult: boolean;
  steps: Array<{
    id: string;
    order: number;
    instruction: string;
    tip?: string;
    timerSeconds?: number;
    requiresAdult: boolean;
    hazard?: 'none' | 'knife' | 'heat' | 'allergen';
  }>;
}

const seedRecipes: SeedRecipe[] = [
  {
    id: 'recipe-1',
    title: 'Brownie sin horno',
    difficulty: 'easy',
    totalMinutes: 20,
    requiresAdult: false,
    steps: [
      { id: 'step-1-1', order: 1, instruction: 'Lava tus manos y prepara un bowl grande.', tip: 'La higiene es el primer paso.', requiresAdult: false, hazard: 'none' },
      { id: 'step-1-2', order: 2, instruction: 'Mezcla cacao y azúcar.', tip: 'Evita grumos.', timerSeconds: 60, requiresAdult: false, hazard: 'none' },
      { id: 'step-1-3', order: 3, instruction: 'Agrega leche y mantequilla derretida.', timerSeconds: 90, requiresAdult: false, hazard: 'none' },
      { id: 'step-1-4', order: 4, instruction: 'Lleva al microondas 1 minuto.', tip: 'Hazlo con un adulto cerca.', timerSeconds: 60, requiresAdult: true, hazard: 'heat' },
      { id: 'step-1-5', order: 5, instruction: 'Deja enfriar y sirve.', timerSeconds: 120, requiresAdult: false, hazard: 'none' }
    ]
  },
  {
    id: 'recipe-2',
    title: 'Sándwich arcoíris',
    difficulty: 'easy',
    totalMinutes: 10,
    requiresAdult: false,
    steps: [
      { id: 'step-2-1', order: 1, instruction: 'Ordena pan, palta, tomate y queso.', requiresAdult: false, hazard: 'none' },
      { id: 'step-2-2', order: 2, instruction: 'Muele la palta con un tenedor.', timerSeconds: 60, requiresAdult: false, hazard: 'none' },
      { id: 'step-2-3', order: 3, instruction: 'Corta tomate en rodajas finas.', tip: 'Usa cuchillo sin punta y adulto si es necesario.', requiresAdult: true, hazard: 'knife' },
      { id: 'step-2-4', order: 4, instruction: 'Arma el sándwich por capas.', requiresAdult: false, hazard: 'none' }
    ]
  },
  {
    id: 'recipe-3',
    title: 'Mugcake de plátano',
    difficulty: 'medium',
    totalMinutes: 12,
    requiresAdult: true,
    steps: [
      { id: 'step-3-1', order: 1, instruction: 'Pisa un plátano en una taza grande.', requiresAdult: false, hazard: 'none' },
      { id: 'step-3-2', order: 2, instruction: 'Agrega huevo y avena, mezcla bien.', timerSeconds: 90, requiresAdult: false, hazard: 'allergen' },
      { id: 'step-3-3', order: 3, instruction: 'Añade chips de chocolate.', requiresAdult: false, hazard: 'none' },
      { id: 'step-3-4', order: 4, instruction: 'Microondas por 1:30 min.', tip: 'Retirar con paño o ayuda adulta.', timerSeconds: 90, requiresAdult: true, hazard: 'heat' }
    ]
  },
  {
    id: 'recipe-4',
    title: 'Ensalada power',
    difficulty: 'easy',
    totalMinutes: 15,
    requiresAdult: false,
    steps: [
      { id: 'step-4-1', order: 1, instruction: 'Lava lechuga y tomate.', timerSeconds: 90, requiresAdult: false, hazard: 'none' },
      { id: 'step-4-2', order: 2, instruction: 'Corta verduras en trozos pequeños.', tip: 'Cuidado con cuchillo.', requiresAdult: true, hazard: 'knife' },
      { id: 'step-4-3', order: 3, instruction: 'Agrega aceite de oliva y limón.', requiresAdult: false, hazard: 'none' },
      { id: 'step-4-4', order: 4, instruction: 'Mezcla y sirve.', requiresAdult: false, hazard: 'none' }
    ]
  },
  {
    id: 'recipe-5',
    title: 'Yogurt parfait',
    difficulty: 'easy',
    totalMinutes: 8,
    requiresAdult: false,
    steps: [
      { id: 'step-5-1', order: 1, instruction: 'Busca vaso transparente y cuchara.', requiresAdult: false, hazard: 'none' },
      { id: 'step-5-2', order: 2, instruction: 'Pon capa de yogurt.', requiresAdult: false, hazard: 'allergen' },
      { id: 'step-5-3', order: 3, instruction: 'Agrega granola y fruta.', requiresAdult: false, hazard: 'none' },
      { id: 'step-5-4', order: 4, instruction: 'Repite capas y termina con fruta.', requiresAdult: false, hazard: 'none' }
    ]
  }
];

export async function seedData(container: Container): Promise<void> {
  const missionProgressRepository = container.get<MissionProgressRepository>(
    missionExecutionContainerTypes.missionProgressRepository
  );

  const existingMission = await missionProgressRepository.findById('mission-recipe-1');

  if (existingMission) {
    return;
  }

  await insertSeedRecipes(container);
}

export async function resetAndSeedData(container: Container): Promise<void> {
  const useInMemory = process.env.USE_IN_MEMORY === 'true';

  if (useInMemory) {
    throw new Error('resetAndSeedData requires MySQL persistence. Disable USE_IN_MEMORY.');
  }

  const knexClient = container.get<Knex>(sharedKernelContainerTypes.knexClient);

  await knexClient.withSchema(recipeSchema).table('recipe_steps').del();
  await knexClient.withSchema(recipeSchema).table('recipes').del();
  await knexClient.withSchema(missionSchema).table('mission_progress').del();

  await insertSeedRecipes(container);
}

async function insertSeedRecipes(container: Container): Promise<void> {
  const createRecipeUseCase = container.get<CreateRecipeUseCase>(recipeCatalogContainerTypes.createRecipeUseCase);
  const missionProgressRepository = container.get<MissionProgressRepository>(
    missionExecutionContainerTypes.missionProgressRepository
  );
  const recipeStepRepository = container.get<RecipeStepRepository>(recipeCatalogContainerTypes.recipeStepRepository);

  for (const recipe of seedRecipes) {
    await createRecipeUseCase.execute({
      id: recipe.id,
      title: recipe.title,
      difficulty: recipe.difficulty,
      totalMinutes: recipe.totalMinutes,
      requiresAdult: recipe.requiresAdult
    });

    await recipeStepRepository.saveMany(
      recipe.steps.map((step) =>
        RecipeStep.create(
          step.id,
          recipe.id,
          step.order,
          step.instruction,
          step.tip,
          step.timerSeconds,
          step.requiresAdult,
          step.hazard
        )
      )
    );

    await missionProgressRepository.save(
      MissionProgress.create(
        MissionId.create(`mission-${recipe.id}`),
        recipe.id,
        1,
        recipe.steps.length,
        false,
        0
      )
    );
  }
}

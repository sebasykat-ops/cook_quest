import cors from 'cors';
import express, { Request, Response } from 'express';
import { CreateRecipeUseCase } from './recipe-catalog/application/use-cases/create-recipe.use-case';
import { InMemoryRecipeRepository } from './recipe-catalog/infrastructure/repositories/in-memory-recipe.repository';
import { MissionProgress } from './mission-execution/domain/entities/mission-progress.entity';
import { MissionId } from './mission-execution/domain/value-objects/mission-id.value-object';
import { InMemoryMissionProgressRepository } from './mission-execution/infrastructure/repositories/in-memory-mission-progress.repository';
import { AdvanceMissionStepUseCase } from './mission-execution/application/use-cases/advance-mission-step.use-case';

const app = express();
app.use(cors());
app.use(express.json());

const recipeRepository = new InMemoryRecipeRepository();
const missionProgressRepository = new InMemoryMissionProgressRepository();
const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository);
const advanceMissionStepUseCase = new AdvanceMissionStepUseCase(missionProgressRepository);

async function seedData(): Promise<void> {
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

app.get('/health', (_request: Request, response: Response) => {
  response.json({ status: 'ok' });
});

app.get('/recipes', async (_request: Request, response: Response) => {
  const recipes = await recipeRepository.findAll();

  response.json({
    data: recipes.map((recipe) => ({
      id: recipe.id.value,
      title: recipe.title,
      difficulty: recipe.difficulty,
      totalMinutes: recipe.totalMinutes,
      requiresAdult: recipe.requiresAdult
    }))
  });
});

app.post('/recipes', async (request: Request, response: Response) => {
  try {
    await createRecipeUseCase.execute(request.body);
    response.status(201).json({ message: 'Recipe created' });
  } catch (error) {
    response.status(400).json({ message: (error as Error).message });
  }
});

app.get('/missions/:missionId', async (request: Request, response: Response) => {
  const missionId = String(request.params.missionId);
  const missionProgress = await missionProgressRepository.findById(missionId);

  if (!missionProgress) {
    response.status(404).json({ message: 'Mission not found' });
    return;
  }

  response.json({
    data: {
      missionId: missionProgress.id.value,
      recipeId: missionProgress.recipeId,
      currentStep: missionProgress.currentStep,
      isCompleted: missionProgress.isCompleted
    }
  });
});

app.post('/missions/:missionId/advance-step', async (request: Request, response: Response) => {
  try {
    const missionId = String(request.params.missionId);
    await advanceMissionStepUseCase.execute({ missionId });
    const missionProgress = await missionProgressRepository.findById(missionId);

    response.json({
      message: 'Mission step advanced',
      data: {
        missionId: missionProgress?.id.value,
        currentStep: missionProgress?.currentStep,
        isCompleted: missionProgress?.isCompleted
      }
    });
  } catch (error) {
    response.status(400).json({ message: (error as Error).message });
  }
});

const port = Number(process.env.PORT ?? 3000);

seedData()
  .then(() => {
    app.listen(port, () => {
      console.log(`CookQuest API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('API bootstrap failed', error);
    process.exit(1);
  });

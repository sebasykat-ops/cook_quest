import { CreateRecipeUseCase } from './recipe-catalog/application/use-cases/create-recipe.use-case';
import { InMemoryRecipeRepository } from './recipe-catalog/infrastructure/repositories/in-memory-recipe.repository';

async function bootstrap(): Promise<void> {
  const recipeRepository = new InMemoryRecipeRepository();
  const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository);

  await createRecipeUseCase.execute({
    id: 'recipe-1',
    title: 'Brownie sin horno',
    difficulty: 'easy',
    totalMinutes: 20,
    requiresAdult: false
  });

  const recipes = await recipeRepository.findAll();
  console.log(`CookQuest bootstrap ok. Recipes loaded: ${recipes.length}`);
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed', error);
  process.exit(1);
});

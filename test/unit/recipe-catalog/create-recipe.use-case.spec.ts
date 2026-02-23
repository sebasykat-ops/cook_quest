import 'reflect-metadata';

import { describe, expect, it } from 'vitest';
import { CreateRecipeUseCase } from '../../../src/recipe-catalog/application/use-cases/create-recipe.use-case';
import { InMemoryRecipeRepository } from '../../../src/recipe-catalog/infrastructure/repositories/in-memory-recipe.repository';

describe('CreateRecipeUseCase', () => {
  it('creates a recipe in repository', async () => {
    const recipeRepository = new InMemoryRecipeRepository();
    const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository);

    await createRecipeUseCase.execute({
      id: 'recipe-101',
      title: 'Panqueques',
      difficulty: 'easy',
      totalMinutes: 10,
      requiresAdult: false
    });

    const recipes = await recipeRepository.findAll();
    expect(recipes).toHaveLength(1);
    expect(recipes[0]?.title).toBe('Panqueques');
  });
});

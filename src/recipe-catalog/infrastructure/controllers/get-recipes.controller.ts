import { Express, Request, Response } from 'express';
import { Container } from 'inversify';
import { InMemoryRecipeRepository } from '../repositories/in-memory-recipe.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

export function registerGetRecipesController(app: Express, container: Container): void {
  app.get('/recipes', async (_request: Request, response: Response) => {
    const recipeRepository = container.get<InMemoryRecipeRepository>(tokens.recipeRepository);
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
}

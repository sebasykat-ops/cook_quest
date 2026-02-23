import { Express, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';

@injectable()
export class GetRecipesController {
  constructor(
    @inject(tokens.recipeCatalog.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  public register(app: Express): void {
    app.get('/recipes', async (_request: Request, response: Response) => {
      const recipes = await this.recipeRepository.findAll();

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
}

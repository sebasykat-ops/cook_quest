import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';
import { asyncHandler } from '../../../shared-kernel/infrastructure/http/async-handler';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';

@injectable()
export class GetRecipesController {
  constructor(
    @inject(tokens.recipeCatalog.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  public register(app: Express): void {
    app.get(
      '/recipes',
      asyncHandler(async (_request, response) => {
        const recipes = await this.recipeRepository.findAll();

        response.json(
          successResponse(
            recipes.map((recipe) => ({
              id: recipe.id.value,
              title: recipe.title,
              difficulty: recipe.difficulty,
              totalMinutes: recipe.totalMinutes,
              requiresAdult: recipe.requiresAdult
            }))
          )
        );
      })
    );
  }
}

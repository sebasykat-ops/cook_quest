import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';

@controller('/recipes')
export class GetRecipesController {
  constructor(
    @inject(tokens.recipeCatalog.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  @httpGet('')
  public async run(_request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const recipes = await this.recipeRepository.findAll();

      return response.json(
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
    } catch (error) {
      next(error);
    }
  }
}

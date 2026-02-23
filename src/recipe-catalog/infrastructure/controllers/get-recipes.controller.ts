import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { z } from 'zod';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import { RecipeRepository } from '@recipe-catalog/domain/repositories/recipe.repository';
import getRecipesSchema from '@recipe-catalog/infrastructure/schema/get-recipes.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/recipes')
export class GetRecipesController {
  constructor(
    @inject(recipeCatalogContainerTypes.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      getRecipesSchema.parse({ query: request.query });
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
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid recipes query', error.flatten()));
      }

      next(error);
    }
  }
}

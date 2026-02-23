import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { z } from 'zod';
import { CreateRecipeUseCase } from '@recipe-catalog/application/use-cases/create-recipe.use-case';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import postRecipesSchema from '@recipe-catalog/infrastructure/schema/post-recipes.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/recipes')
export class PostRecipesController {
  constructor(
    @inject(recipeCatalogContainerTypes.createRecipeUseCase)
    private readonly createRecipeUseCase: CreateRecipeUseCase
  ) {}

  @httpPost('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedRequest = postRecipesSchema.parse(request.body);
      await this.createRecipeUseCase.execute(parsedRequest);
      return response.status(201).json(successResponse({ message: 'Recipe created' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid recipe payload', error.flatten()));
      }

      next(error);
    }
  }
}

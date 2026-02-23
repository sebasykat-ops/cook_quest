import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { z } from 'zod';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import { GetRecipesUseCase } from '@recipe-catalog/application/use-cases/get-recipes.use-case';
import getRecipesSchema from '@recipe-catalog/infrastructure/schema/get-recipes.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/recipes')
export class GetRecipesController {
  constructor(
    @inject(recipeCatalogContainerTypes.getRecipesUseCase)
    private readonly getRecipesUseCase: GetRecipesUseCase
  ) {}

  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      getRecipesSchema.parse({ query: request.query });
      const recipes = await this.getRecipesUseCase.execute({});
      return response.json(successResponse(recipes));
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid recipes query', error.flatten()));
      }

      next(error);
    }
  }
}

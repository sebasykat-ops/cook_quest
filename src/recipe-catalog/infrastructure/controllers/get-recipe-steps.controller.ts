import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { z } from 'zod';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import { GetRecipeStepsUseCase } from '@recipe-catalog/application/use-cases/get-recipe-steps.use-case';
import getRecipeStepsSchema from '@recipe-catalog/infrastructure/schema/get-recipe-steps.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/recipes/:recipeId/steps')
export class GetRecipeStepsController {
  constructor(
    @inject(recipeCatalogContainerTypes.getRecipeStepsUseCase)
    private readonly getRecipeStepsUseCase: GetRecipeStepsUseCase
  ) {}

  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedParams = getRecipeStepsSchema.parse(request.params);
      const steps = await this.getRecipeStepsUseCase.execute({ recipeId: parsedParams.recipeId });
      return response.json(successResponse(steps));
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid recipe id for steps', error.flatten()));
      }

      next(error);
    }
  }
}

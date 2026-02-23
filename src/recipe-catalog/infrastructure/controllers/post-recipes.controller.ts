import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { z } from 'zod';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';
import { ValidationError } from '../../../shared-kernel/domain/errors/validation-error';
import { createRecipeRequestSchema } from '../http/create-recipe.request-schema';

@controller('/recipes')
export class PostRecipesController {
  constructor(
    @inject(tokens.recipeCatalog.createRecipeUseCase)
    private readonly createRecipeUseCase: CreateRecipeUseCase
  ) {}

  @httpPost('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedRequest = createRecipeRequestSchema.parse(request.body);

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

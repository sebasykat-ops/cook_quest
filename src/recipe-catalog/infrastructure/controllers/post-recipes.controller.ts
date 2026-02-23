import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { asyncHandler } from '../../../shared-kernel/infrastructure/http/async-handler';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';
import { ValidationError } from '../../../shared-kernel/domain/errors/validation-error';
import { createRecipeRequestSchema } from '../http/create-recipe.request-schema';

@injectable()
export class PostRecipesController {
  constructor(
    @inject(tokens.recipeCatalog.createRecipeUseCase)
    private readonly createRecipeUseCase: CreateRecipeUseCase
  ) {}

  public register(app: Express): void {
    app.post(
      '/recipes',
      asyncHandler(async (request, response) => {
        const parsedRequest = createRecipeRequestSchema.safeParse(request.body);

        if (!parsedRequest.success) {
          throw new ValidationError('Invalid recipe payload', parsedRequest.error.flatten());
        }

        await this.createRecipeUseCase.execute(parsedRequest.data);
        response.status(201).json(successResponse({ message: 'Recipe created' }));
      })
    );
  }
}

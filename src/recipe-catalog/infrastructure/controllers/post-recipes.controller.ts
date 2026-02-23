import { Express, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

@injectable()
export class PostRecipesController {
  constructor(
    @inject(tokens.recipeCatalog.createRecipeUseCase)
    private readonly createRecipeUseCase: CreateRecipeUseCase
  ) {}

  public register(app: Express): void {
    app.post('/recipes', async (request: Request, response: Response) => {
      try {
        await this.createRecipeUseCase.execute(request.body);
        response.status(201).json({ message: 'Recipe created' });
      } catch (error) {
        response.status(400).json({ message: (error as Error).message });
      }
    });
  }
}

import { Express, Request, Response } from 'express';
import { Container } from 'inversify';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

export function registerPostRecipesController(app: Express, container: Container): void {
  app.post('/recipes', async (request: Request, response: Response) => {
    try {
      const createRecipeUseCase = container.get<CreateRecipeUseCase>(tokens.createRecipeUseCase);
      await createRecipeUseCase.execute(request.body);
      response.status(201).json({ message: 'Recipe created' });
    } catch (error) {
      response.status(400).json({ message: (error as Error).message });
    }
  });
}

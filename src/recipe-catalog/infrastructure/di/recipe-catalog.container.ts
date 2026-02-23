import { ContainerModule } from 'inversify';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { InMemoryRecipeRepository } from '../repositories/in-memory-recipe.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import '../controllers';

export const recipeCatalogContainer = new ContainerModule((bind) => {
  bind(tokens.recipeCatalog.recipeRepository).to(InMemoryRecipeRepository).inSingletonScope();
  bind(tokens.recipeCatalog.createRecipeUseCase).to(CreateRecipeUseCase).inSingletonScope();
});

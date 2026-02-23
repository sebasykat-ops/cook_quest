import { ContainerModule } from 'inversify';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { GetRecipesController } from '../controllers/get-recipes.controller';
import { PostRecipesController } from '../controllers/post-recipes.controller';
import { InMemoryRecipeRepository } from '../repositories/in-memory-recipe.repository';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';

export const recipeCatalogContainer = new ContainerModule(({ bind }) => {
  bind(tokens.recipeCatalog.recipeRepository).to(InMemoryRecipeRepository).inSingletonScope();
  bind(tokens.recipeCatalog.createRecipeUseCase).to(CreateRecipeUseCase).inSingletonScope();
  bind(tokens.recipeCatalog.getRecipesController).to(GetRecipesController).inSingletonScope();
  bind(tokens.recipeCatalog.postRecipesController).to(PostRecipesController).inSingletonScope();
});

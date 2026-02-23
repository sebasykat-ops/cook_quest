import { ContainerModule } from 'inversify';
import { CreateRecipeUseCase } from '@recipe-catalog/application/use-cases/create-recipe.use-case';
import { InMemoryRecipeRepository } from '@recipe-catalog/infrastructure/repositories/in-memory-recipe.repository';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import '@recipe-catalog/infrastructure/controllers';

export const recipeCatalogContainer = new ContainerModule((bind) => {
  bind(recipeCatalogContainerTypes.recipeRepository).to(InMemoryRecipeRepository).inSingletonScope();
  bind(recipeCatalogContainerTypes.createRecipeUseCase).to(CreateRecipeUseCase).inSingletonScope();
});

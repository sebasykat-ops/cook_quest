import { ContainerModule } from 'inversify';
import { CreateRecipeUseCase } from '@recipe-catalog/application/use-cases/create-recipe.use-case';
import { GetRecipesUseCase } from '@recipe-catalog/application/use-cases/get-recipes.use-case';
import { GetRecipeStepsUseCase } from '@recipe-catalog/application/use-cases/get-recipe-steps.use-case';
import { InMemoryRecipeRepository } from '@recipe-catalog/infrastructure/repositories/in-memory-recipe.repository';
import { InMemoryRecipeStepRepository } from '@recipe-catalog/infrastructure/repositories/in-memory-recipe-step.repository';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import '@recipe-catalog/infrastructure/controllers';

export const recipeCatalogContainer = new ContainerModule((bind) => {
  bind(recipeCatalogContainerTypes.recipeRepository).to(InMemoryRecipeRepository).inSingletonScope();
  bind(recipeCatalogContainerTypes.recipeStepRepository).to(InMemoryRecipeStepRepository).inSingletonScope();
  bind(recipeCatalogContainerTypes.createRecipeUseCase).to(CreateRecipeUseCase).inSingletonScope();
  bind(recipeCatalogContainerTypes.getRecipesUseCase).to(GetRecipesUseCase).inSingletonScope();
  bind(recipeCatalogContainerTypes.getRecipeStepsUseCase).to(GetRecipeStepsUseCase).inSingletonScope();
});

import { inject, injectable } from 'inversify';
import { UseCase } from '@shared/application/use-case';
import { NotFoundError } from '@shared/domain/errors/not-found-error';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import { RecipeRepository } from '@recipe-catalog/domain/repositories/recipe.repository';
import { RecipeStepRepository } from '@recipe-catalog/domain/repositories/recipe-step.repository';
import { RecipeStepPrimitives } from '@recipe-catalog/domain/entities/recipe-step.entity';
import { GetRecipeStepsDto } from '@recipe-catalog/application/dto/get-recipe-steps.dto';

@injectable()
export class GetRecipeStepsUseCase implements UseCase<GetRecipeStepsDto, RecipeStepPrimitives[]> {
  constructor(
    @inject(recipeCatalogContainerTypes.recipeRepository)
    private readonly recipeRepository: RecipeRepository,
    @inject(recipeCatalogContainerTypes.recipeStepRepository)
    private readonly recipeStepRepository: RecipeStepRepository
  ) {}

  public async execute(request: GetRecipeStepsDto): Promise<RecipeStepPrimitives[]> {
    const recipe = await this.recipeRepository.findById(request.recipeId);

    if (!recipe) {
      throw new NotFoundError('Recipe not found');
    }

    const recipeSteps = await this.recipeStepRepository.findByRecipeId(request.recipeId);
    return recipeSteps.map((step) => step.toPrimitives());
  }
}

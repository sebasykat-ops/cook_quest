import { inject, injectable } from 'inversify';
import { UseCase } from '@shared/application/use-case';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import { Recipe } from '@recipe-catalog/domain/entities/recipe.entity';
import { RecipeRepository } from '@recipe-catalog/domain/repositories/recipe.repository';
import { RecipeId } from '@recipe-catalog/domain/value-objects/recipe-id.value-object';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@injectable()
export class CreateRecipeUseCase implements UseCase<CreateRecipeDto, void> {
  constructor(
    @inject(recipeCatalogContainerTypes.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  public async execute(request: CreateRecipeDto): Promise<void> {
    const recipe = Recipe.create(
      RecipeId.create(request.id),
      request.title,
      request.difficulty,
      request.totalMinutes,
      request.requiresAdult
    );

    await this.recipeRepository.save(recipe);
  }
}

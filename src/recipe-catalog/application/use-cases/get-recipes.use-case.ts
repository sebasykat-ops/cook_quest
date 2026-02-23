import { inject, injectable } from 'inversify';
import { UseCase } from '@shared/application/use-case';
import recipeCatalogContainerTypes from '@recipe-catalog/infrastructure/container/recipe-catalog.container.types';
import { RecipeRepository } from '@recipe-catalog/domain/repositories/recipe.repository';
import { RecipePrimitives } from '@recipe-catalog/domain/entities/recipe.entity';
import { GetRecipesDto } from '@recipe-catalog/application/dto/get-recipes.dto';

@injectable()
export class GetRecipesUseCase implements UseCase<GetRecipesDto, RecipePrimitives[]> {
  constructor(
    @inject(recipeCatalogContainerTypes.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  public async execute(_request: GetRecipesDto): Promise<RecipePrimitives[]> {
    const recipes = await this.recipeRepository.findAll();
    return recipes.map((recipe) => recipe.toPrimitives());
  }
}

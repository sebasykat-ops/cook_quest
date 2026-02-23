import { inject, injectable } from 'inversify';
import { UseCase } from '../../../shared-kernel/application/use-case';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { Recipe } from '../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';
import { RecipeId } from '../../domain/value-objects/recipe-id.value-object';
import { CreateRecipeDto } from '../dto/create-recipe.dto';

@injectable()
export class CreateRecipeUseCase implements UseCase<CreateRecipeDto, void> {
  constructor(
    @inject(tokens.recipeCatalog.recipeRepository)
    private readonly recipeRepository: RecipeRepository
  ) {}

  public async execute(request: CreateRecipeDto): Promise<void> {
    const recipe = Recipe.create(RecipeId.create(request.id), {
      title: request.title,
      difficulty: request.difficulty,
      totalMinutes: request.totalMinutes,
      requiresAdult: request.requiresAdult
    });

    await this.recipeRepository.save(recipe);
  }
}

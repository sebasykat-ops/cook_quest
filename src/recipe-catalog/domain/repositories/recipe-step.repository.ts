import { RecipeStep } from '@recipe-catalog/domain/entities/recipe-step.entity';

export interface RecipeStepRepository {
  saveMany(steps: RecipeStep[]): Promise<void>;
  findByRecipeId(recipeId: string): Promise<RecipeStep[]>;
}

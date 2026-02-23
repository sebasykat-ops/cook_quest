import { Recipe } from '../entities/recipe.entity';

export interface RecipeRepository {
  save(recipe: Recipe): Promise<void>;
  findById(recipeId: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
}

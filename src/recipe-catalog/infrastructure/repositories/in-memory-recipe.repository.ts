import { Recipe } from '../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';

export class InMemoryRecipeRepository implements RecipeRepository {
  private readonly recipes = new Map<string, Recipe>();

  public async save(recipe: Recipe): Promise<void> {
    this.recipes.set(recipe.id.value, recipe);
  }

  public async findById(recipeId: string): Promise<Recipe | null> {
    return this.recipes.get(recipeId) ?? null;
  }

  public async findAll(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }
}

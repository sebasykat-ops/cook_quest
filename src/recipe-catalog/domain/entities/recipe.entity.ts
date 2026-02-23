import { Entity } from '../../../shared-kernel/domain/entity';
import { RecipeId } from '../value-objects/recipe-id.value-object';

interface RecipeProps {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalMinutes: number;
  requiresAdult: boolean;
}

export class Recipe extends Entity<RecipeId> {
  private constructor(id: RecipeId, private readonly recipeProps: RecipeProps) {
    super(id);
  }

  public static create(id: RecipeId, recipeProps: RecipeProps): Recipe {
    if (!recipeProps.title.trim()) {
      throw new Error('Recipe title cannot be empty');
    }

    if (recipeProps.totalMinutes <= 0) {
      throw new Error('Recipe total minutes must be greater than zero');
    }

    return new Recipe(id, recipeProps);
  }

  public get title(): string {
    return this.recipeProps.title;
  }

  public get difficulty(): 'easy' | 'medium' | 'hard' {
    return this.recipeProps.difficulty;
  }

  public get totalMinutes(): number {
    return this.recipeProps.totalMinutes;
  }

  public get requiresAdult(): boolean {
    return this.recipeProps.requiresAdult;
  }
}

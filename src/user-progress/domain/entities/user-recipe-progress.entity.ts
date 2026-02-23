import { Entity } from '../../../shared-kernel/domain/entity';
import { Rating } from '../value-objects/rating.value-object';

interface UserRecipeProgressProps {
  recipeId: string;
  isFavorite: boolean;
  completedAt: Date | null;
  rating: Rating | null;
}

export class UserRecipeProgress extends Entity<string> {
  private constructor(id: string, private progressProps: UserRecipeProgressProps) {
    super(id);
  }

  public static create(id: string, progressProps: UserRecipeProgressProps): UserRecipeProgress {
    return new UserRecipeProgress(id, progressProps);
  }

  public markAsFavorite(): void {
    this.progressProps.isFavorite = true;
  }

  public completeRecipe(): void {
    this.progressProps.completedAt = new Date();
  }

  public rateRecipe(rating: Rating): void {
    this.progressProps.rating = rating;
  }

  public get recipeId(): string {
    return this.progressProps.recipeId;
  }
}

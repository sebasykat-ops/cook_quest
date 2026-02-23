import AggregateRoot from '@shared/domain/aggregate-root';
import { Rating } from '@user-progress/domain/value-objects/rating.value-object';

export interface UserRecipeProgressPrimitives {
  id: string;
  recipeId: string;
  isFavorite: boolean;
  completedAt: string | null;
  rating: number | null;
}

export class UserRecipeProgress extends AggregateRoot<UserRecipeProgressPrimitives> {
  public static create(
    id: string,
    recipeId: string,
    isFavorite: boolean,
    completedAt: Date | null,
    rating: Rating | null
  ): UserRecipeProgress {
    return new UserRecipeProgress(id, recipeId, isFavorite, completedAt, rating);
  }

  public static fromPrimitives(primitives: UserRecipeProgressPrimitives): UserRecipeProgress {
    return new UserRecipeProgress(
      primitives.id,
      primitives.recipeId,
      primitives.isFavorite,
      primitives.completedAt ? new Date(primitives.completedAt) : null,
      primitives.rating ? Rating.create(primitives.rating) : null
    );
  }

  readonly #id: string;
  readonly #recipeId: string;
  #isFavorite: boolean;
  #completedAt: Date | null;
  #rating: Rating | null;

  private constructor(id: string, recipeId: string, isFavorite: boolean, completedAt: Date | null, rating: Rating | null) {
    super();
    this.#id = id;
    this.#recipeId = recipeId;
    this.#isFavorite = isFavorite;
    this.#completedAt = completedAt;
    this.#rating = rating;
  }

  public get id(): string {
    return this.#id;
  }

  public get recipeId(): string {
    return this.#recipeId;
  }

  public markAsFavorite(): void {
    this.#isFavorite = true;
  }

  public completeRecipe(): void {
    this.#completedAt = new Date();
  }

  public rateRecipe(rating: Rating): void {
    this.#rating = rating;
  }

  public override toPrimitives(): UserRecipeProgressPrimitives {
    return {
      id: this.#id,
      recipeId: this.#recipeId,
      isFavorite: this.#isFavorite,
      completedAt: this.#completedAt ? this.#completedAt.toISOString() : null,
      rating: this.#rating ? this.#rating.value : null
    };
  }
}

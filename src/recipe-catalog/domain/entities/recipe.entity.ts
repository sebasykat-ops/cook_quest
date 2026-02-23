import AggregateRoot from '@shared/domain/aggregate-root';
import { RecipeId } from '@recipe-catalog/domain/value-objects/recipe-id.value-object';

export interface RecipePrimitives {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  totalMinutes: number;
  requiresAdult: boolean;
  ingredients: string[];
  utensils: string[];
}

export class Recipe extends AggregateRoot<RecipePrimitives> {
  public static create(
    id: RecipeId,
    title: string,
    difficulty: 'easy' | 'medium' | 'hard',
    totalMinutes: number,
    requiresAdult: boolean,
    ingredients: string[],
    utensils: string[]
  ): Recipe {
    if (!title.trim()) {
      throw new Error('Recipe title cannot be empty');
    }

    if (totalMinutes <= 0) {
      throw new Error('Recipe total minutes must be greater than zero');
    }

    return new Recipe(id, title, difficulty, totalMinutes, requiresAdult, ingredients, utensils);
  }

  public static fromPrimitives(primitives: RecipePrimitives): Recipe {
    return new Recipe(
      RecipeId.create(primitives.id),
      primitives.title,
      primitives.difficulty,
      primitives.totalMinutes,
      primitives.requiresAdult,
      primitives.ingredients,
      primitives.utensils
    );
  }

  readonly #id: RecipeId;
  readonly #title: string;
  readonly #difficulty: 'easy' | 'medium' | 'hard';
  readonly #totalMinutes: number;
  readonly #requiresAdult: boolean;
  readonly #ingredients: string[];
  readonly #utensils: string[];

  private constructor(
    id: RecipeId,
    title: string,
    difficulty: 'easy' | 'medium' | 'hard',
    totalMinutes: number,
    requiresAdult: boolean,
    ingredients: string[],
    utensils: string[]
  ) {
    super();
    this.#id = id;
    this.#title = title;
    this.#difficulty = difficulty;
    this.#totalMinutes = totalMinutes;
    this.#requiresAdult = requiresAdult;
    this.#ingredients = ingredients;
    this.#utensils = utensils;
  }

  public get id(): RecipeId {
    return this.#id;
  }

  public get title(): string {
    return this.#title;
  }

  public get difficulty(): 'easy' | 'medium' | 'hard' {
    return this.#difficulty;
  }

  public get totalMinutes(): number {
    return this.#totalMinutes;
  }

  public get requiresAdult(): boolean {
    return this.#requiresAdult;
  }

  public override toPrimitives(): RecipePrimitives {
    return {
      id: this.#id.value,
      title: this.#title,
      difficulty: this.#difficulty,
      totalMinutes: this.#totalMinutes,
      requiresAdult: this.#requiresAdult,
      ingredients: this.#ingredients,
      utensils: this.#utensils
    };
  }
}

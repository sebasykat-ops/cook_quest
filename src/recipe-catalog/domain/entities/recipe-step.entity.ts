import AggregateRoot from '@shared/domain/aggregate-root';

export interface RecipeStepPrimitives {
  id: string;
  recipeId: string;
  order: number;
  instruction: string;
  tip?: string;
  timerSeconds?: number;
  requiresAdult: boolean;
  hazard?: 'none' | 'knife' | 'heat' | 'allergen';
}

export class RecipeStep extends AggregateRoot<RecipeStepPrimitives> {
  public static create(
    id: string,
    recipeId: string,
    order: number,
    instruction: string,
    tip: string | undefined,
    timerSeconds: number | undefined,
    requiresAdult: boolean,
    hazard: 'none' | 'knife' | 'heat' | 'allergen' | undefined
  ): RecipeStep {
    if (!id.trim() || !recipeId.trim()) {
      throw new Error('RecipeStep id and recipeId are required');
    }

    if (order <= 0) {
      throw new Error('RecipeStep order must be positive');
    }

    if (!instruction.trim()) {
      throw new Error('RecipeStep instruction cannot be empty');
    }

    return new RecipeStep(id, recipeId, order, instruction, tip, timerSeconds, requiresAdult, hazard);
  }

  public static fromPrimitives(primitives: RecipeStepPrimitives): RecipeStep {
    return new RecipeStep(
      primitives.id,
      primitives.recipeId,
      primitives.order,
      primitives.instruction,
      primitives.tip,
      primitives.timerSeconds,
      primitives.requiresAdult,
      primitives.hazard
    );
  }

  readonly #id: string;
  readonly #recipeId: string;
  readonly #order: number;
  readonly #instruction: string;
  readonly #tip?: string;
  readonly #timerSeconds?: number;
  readonly #requiresAdult: boolean;
  readonly #hazard?: 'none' | 'knife' | 'heat' | 'allergen';

  private constructor(
    id: string,
    recipeId: string,
    order: number,
    instruction: string,
    tip: string | undefined,
    timerSeconds: number | undefined,
    requiresAdult: boolean,
    hazard: 'none' | 'knife' | 'heat' | 'allergen' | undefined
  ) {
    super();
    this.#id = id;
    this.#recipeId = recipeId;
    this.#order = order;
    this.#instruction = instruction;
    this.#tip = tip;
    this.#timerSeconds = timerSeconds;
    this.#requiresAdult = requiresAdult;
    this.#hazard = hazard;
  }

  public get id(): string {
    return this.#id;
  }

  public get recipeId(): string {
    return this.#recipeId;
  }

  public get order(): number {
    return this.#order;
  }

  public override toPrimitives(): RecipeStepPrimitives {
    return {
      id: this.#id,
      recipeId: this.#recipeId,
      order: this.#order,
      instruction: this.#instruction,
      tip: this.#tip,
      timerSeconds: this.#timerSeconds,
      requiresAdult: this.#requiresAdult,
      hazard: this.#hazard
    };
  }
}

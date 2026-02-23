import AggregateRoot from '@shared/domain/aggregate-root';
import { MissionId } from '@mission-execution/domain/value-objects/mission-id.value-object';

export interface MissionProgressPrimitives {
  id: string;
  recipeId: string;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

export class MissionProgress extends AggregateRoot<MissionProgressPrimitives> {
  public static create(
    id: MissionId,
    recipeId: string,
    currentStep: number,
    totalSteps: number,
    isCompleted: boolean
  ): MissionProgress {
    if (totalSteps <= 0) {
      throw new Error('Total steps must be greater than zero');
    }

    return new MissionProgress(id, recipeId, currentStep, totalSteps, isCompleted);
  }

  public static fromPrimitives(primitives: MissionProgressPrimitives): MissionProgress {
    return new MissionProgress(
      MissionId.create(primitives.id),
      primitives.recipeId,
      primitives.currentStep,
      primitives.totalSteps,
      primitives.isCompleted
    );
  }

  readonly #id: MissionId;
  #recipeId: string;
  #currentStep: number;
  #totalSteps: number;
  #isCompleted: boolean;

  private constructor(id: MissionId, recipeId: string, currentStep: number, totalSteps: number, isCompleted: boolean) {
    super();
    this.#id = id;
    this.#recipeId = recipeId;
    this.#currentStep = currentStep;
    this.#totalSteps = totalSteps;
    this.#isCompleted = isCompleted;
  }

  public advanceStep(): void {
    if (this.#currentStep < this.#totalSteps) {
      this.#currentStep += 1;
    }

    if (this.#currentStep >= this.#totalSteps) {
      this.#isCompleted = true;
    }
  }

  public get id(): MissionId {
    return this.#id;
  }

  public get recipeId(): string {
    return this.#recipeId;
  }

  public get currentStep(): number {
    return this.#currentStep;
  }

  public get isCompleted(): boolean {
    return this.#isCompleted;
  }

  public override toPrimitives(): MissionProgressPrimitives {
    return {
      id: this.#id.value,
      recipeId: this.#recipeId,
      currentStep: this.#currentStep,
      totalSteps: this.#totalSteps,
      isCompleted: this.#isCompleted
    };
  }
}

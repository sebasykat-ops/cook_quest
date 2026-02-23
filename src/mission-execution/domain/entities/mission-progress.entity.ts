import AggregateRoot from '@shared/domain/aggregate-root';
import { MissionId } from '@mission-execution/domain/value-objects/mission-id.value-object';

export interface MissionProgressPrimitives {
  id: string;
  recipeId: string;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  completedTimes: number;
}

export class MissionProgress extends AggregateRoot<MissionProgressPrimitives> {
  public static create(
    id: MissionId,
    recipeId: string,
    currentStep: number,
    totalSteps: number,
    isCompleted: boolean,
    completedTimes = 0
  ): MissionProgress {
    if (totalSteps <= 0) {
      throw new Error('Total steps must be greater than zero');
    }

    return new MissionProgress(id, recipeId, currentStep, totalSteps, isCompleted, completedTimes);
  }

  public static fromPrimitives(primitives: MissionProgressPrimitives): MissionProgress {
    return new MissionProgress(
      MissionId.create(primitives.id),
      primitives.recipeId,
      primitives.currentStep,
      primitives.totalSteps,
      primitives.isCompleted,
      primitives.completedTimes
    );
  }

  readonly #id: MissionId;
  #recipeId: string;
  #currentStep: number;
  #totalSteps: number;
  #isCompleted: boolean;
  #completedTimes: number;

  private constructor(
    id: MissionId,
    recipeId: string,
    currentStep: number,
    totalSteps: number,
    isCompleted: boolean,
    completedTimes: number
  ) {
    super();
    this.#id = id;
    this.#recipeId = recipeId;
    this.#currentStep = currentStep;
    this.#totalSteps = totalSteps;
    this.#isCompleted = isCompleted;
    this.#completedTimes = completedTimes;
  }

  public advanceStep(): void {
    if (this.#currentStep < this.#totalSteps) {
      this.#currentStep += 1;
    }

    if (this.#currentStep >= this.#totalSteps && !this.#isCompleted) {
      this.#isCompleted = true;
      this.#completedTimes += 1;
    }
  }

  public restart(): void {
    this.#currentStep = 1;
    this.#isCompleted = false;
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

  public get totalSteps(): number {
    return this.#totalSteps;
  }

  public get isCompleted(): boolean {
    return this.#isCompleted;
  }

  public get completedTimes(): number {
    return this.#completedTimes;
  }

  public override toPrimitives(): MissionProgressPrimitives {
    return {
      id: this.#id.value,
      recipeId: this.#recipeId,
      currentStep: this.#currentStep,
      totalSteps: this.#totalSteps,
      isCompleted: this.#isCompleted,
      completedTimes: this.#completedTimes
    };
  }
}

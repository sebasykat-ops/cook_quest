import AggregateRoot from '@shared/domain/aggregate-root';
import { MissionId } from '@mission-execution/domain/value-objects/mission-id.value-object';

export interface MissionStepCompletionPrimitives {
  stepOrder: number;
  completedAt: string;
}

export interface MissionProgressPrimitives {
  id: string;
  recipeId: string;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  completedTimes: number;
  stepCompletions: MissionStepCompletionPrimitives[];
}

export class MissionProgress extends AggregateRoot<MissionProgressPrimitives> {
  public static create(
    id: MissionId,
    recipeId: string,
    currentStep: number,
    totalSteps: number,
    isCompleted: boolean,
    completedTimes = 0,
    stepCompletions: MissionStepCompletionPrimitives[] = []
  ): MissionProgress {
    if (totalSteps <= 0) {
      throw new Error('Total steps must be greater than zero');
    }

    return new MissionProgress(
      id,
      recipeId,
      currentStep,
      totalSteps,
      isCompleted,
      completedTimes,
      stepCompletions
    );
  }

  public static fromPrimitives(primitives: MissionProgressPrimitives): MissionProgress {
    return new MissionProgress(
      MissionId.create(primitives.id),
      primitives.recipeId,
      primitives.currentStep,
      primitives.totalSteps,
      primitives.isCompleted,
      primitives.completedTimes,
      primitives.stepCompletions
    );
  }

  readonly #id: MissionId;
  #recipeId: string;
  #currentStep: number;
  #totalSteps: number;
  #isCompleted: boolean;
  #completedTimes: number;
  #stepCompletions: MissionStepCompletionPrimitives[];

  private constructor(
    id: MissionId,
    recipeId: string,
    currentStep: number,
    totalSteps: number,
    isCompleted: boolean,
    completedTimes: number,
    stepCompletions: MissionStepCompletionPrimitives[]
  ) {
    super();
    this.#id = id;
    this.#recipeId = recipeId;
    this.#currentStep = currentStep;
    this.#totalSteps = totalSteps;
    this.#isCompleted = isCompleted;
    this.#completedTimes = completedTimes;
    this.#stepCompletions = stepCompletions;
  }

  public advanceStep(): void {
    if (this.#isCompleted) {
      return;
    }

    const stepOrder = this.#currentStep;

    if (!this.#stepCompletions.some((item) => item.stepOrder === stepOrder)) {
      this.#stepCompletions.push({
        stepOrder,
        completedAt: new Date().toISOString()
      });
    }

    if (this.#currentStep < this.#totalSteps) {
      this.#currentStep += 1;
    } else {
      this.#isCompleted = true;
      this.#completedTimes += 1;
    }
  }

  public restart(): void {
    this.#currentStep = 1;
    this.#isCompleted = false;
    this.#stepCompletions = [];
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

  public get stepCompletions(): MissionStepCompletionPrimitives[] {
    return this.#stepCompletions;
  }

  public override toPrimitives(): MissionProgressPrimitives {
    return {
      id: this.#id.value,
      recipeId: this.#recipeId,
      currentStep: this.#currentStep,
      totalSteps: this.#totalSteps,
      isCompleted: this.#isCompleted,
      completedTimes: this.#completedTimes,
      stepCompletions: this.#stepCompletions
    };
  }
}

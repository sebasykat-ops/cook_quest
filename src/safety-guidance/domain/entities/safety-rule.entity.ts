import AggregateRoot from '@shared/domain/aggregate-root';
import { HazardLevel } from '@safety-guidance/domain/value-objects/hazard-level.value-object';

export interface SafetyRulePrimitives {
  id: string;
  title: string;
  description: string;
  hazardLevel: 'low' | 'medium' | 'high';
  requiresAdult: boolean;
}

export class SafetyRule extends AggregateRoot<SafetyRulePrimitives> {
  public static create(
    id: string,
    title: string,
    description: string,
    hazardLevel: HazardLevel,
    requiresAdult: boolean
  ): SafetyRule {
    if (!title.trim()) {
      throw new Error('Safety rule title cannot be empty');
    }

    return new SafetyRule(id, title, description, hazardLevel, requiresAdult);
  }

  public static fromPrimitives(primitives: SafetyRulePrimitives): SafetyRule {
    return new SafetyRule(
      primitives.id,
      primitives.title,
      primitives.description,
      HazardLevel.create(primitives.hazardLevel),
      primitives.requiresAdult
    );
  }

  readonly #id: string;
  readonly #title: string;
  readonly #description: string;
  readonly #hazardLevel: HazardLevel;
  readonly #requiresAdult: boolean;

  private constructor(id: string, title: string, description: string, hazardLevel: HazardLevel, requiresAdult: boolean) {
    super();
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#hazardLevel = hazardLevel;
    this.#requiresAdult = requiresAdult;
  }

  public get id(): string {
    return this.#id;
  }

  public get requiresAdult(): boolean {
    return this.#requiresAdult;
  }

  public get hazardLevel(): HazardLevel {
    return this.#hazardLevel;
  }

  public override toPrimitives(): SafetyRulePrimitives {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      hazardLevel: this.#hazardLevel.value,
      requiresAdult: this.#requiresAdult
    };
  }
}

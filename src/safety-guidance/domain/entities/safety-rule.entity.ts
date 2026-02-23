import { Entity } from '../../../shared-kernel/domain/entity';
import { HazardLevel } from '../value-objects/hazard-level.value-object';

interface SafetyRuleProps {
  title: string;
  description: string;
  hazardLevel: HazardLevel;
  requiresAdult: boolean;
}

export class SafetyRule extends Entity<string> {
  private constructor(id: string, private readonly safetyRuleProps: SafetyRuleProps) {
    super(id);
  }

  public static create(id: string, safetyRuleProps: SafetyRuleProps): SafetyRule {
    if (!safetyRuleProps.title.trim()) {
      throw new Error('Safety rule title cannot be empty');
    }

    return new SafetyRule(id, safetyRuleProps);
  }

  public get requiresAdult(): boolean {
    return this.safetyRuleProps.requiresAdult;
  }

  public get hazardLevel(): HazardLevel {
    return this.safetyRuleProps.hazardLevel;
  }
}

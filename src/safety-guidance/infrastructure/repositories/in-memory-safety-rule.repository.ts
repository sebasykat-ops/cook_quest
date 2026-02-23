import { SafetyRule } from '../../domain/entities/safety-rule.entity';
import { SafetyRuleRepository } from '../../domain/repositories/safety-rule.repository';

export class InMemorySafetyRuleRepository implements SafetyRuleRepository {
  private readonly safetyRules = new Map<string, SafetyRule>();

  public async save(safetyRule: SafetyRule): Promise<void> {
    this.safetyRules.set(safetyRule.id, safetyRule);
  }

  public async findById(safetyRuleId: string): Promise<SafetyRule | null> {
    return this.safetyRules.get(safetyRuleId) ?? null;
  }
}

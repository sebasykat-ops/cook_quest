import { SafetyRule } from '@safety-guidance/domain/entities/safety-rule.entity';

export interface SafetyRuleRepository {
  save(safetyRule: SafetyRule): Promise<void>;
  findById(safetyRuleId: string): Promise<SafetyRule | null>;
}

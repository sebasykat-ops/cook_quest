import { SafetyRule } from '../entities/safety-rule.entity';

export interface SafetyRuleRepository {
  save(safetyRule: SafetyRule): Promise<void>;
  findById(safetyRuleId: string): Promise<SafetyRule | null>;
}

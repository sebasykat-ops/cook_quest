import { UseCase } from '../../../shared-kernel/application/use-case';
import { SafetyRuleRepository } from '../../domain/repositories/safety-rule.repository';
import { EvaluateSafetyStepDto } from '../dto/evaluate-safety-step.dto';

export interface EvaluateSafetyStepResponse {
  shouldShowAdultWarning: boolean;
  hazardLevel: 'low' | 'medium' | 'high';
}

export class EvaluateSafetyStepUseCase
  implements UseCase<EvaluateSafetyStepDto, EvaluateSafetyStepResponse>
{
  constructor(private readonly safetyRuleRepository: SafetyRuleRepository) {}

  public async execute(request: EvaluateSafetyStepDto): Promise<EvaluateSafetyStepResponse> {
    const safetyRule = await this.safetyRuleRepository.findById(request.safetyRuleId);

    if (!safetyRule) {
      throw new Error('Safety rule not found');
    }

    return {
      shouldShowAdultWarning: safetyRule.requiresAdult,
      hazardLevel: safetyRule.hazardLevel.value
    };
  }
}

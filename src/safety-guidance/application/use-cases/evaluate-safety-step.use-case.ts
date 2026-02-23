import { UseCase } from '@shared/application/use-case';
import { SafetyRuleRepository } from '@safety-guidance/domain/repositories/safety-rule.repository';
import { EvaluateSafetyStepDto } from '@safety-guidance/application/dto/evaluate-safety-step.dto';

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

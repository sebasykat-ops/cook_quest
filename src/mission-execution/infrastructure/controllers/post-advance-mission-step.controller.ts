import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { AdvanceMissionStepUseCase } from '../../application/use-cases/advance-mission-step.use-case';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';
import { NotFoundError } from '../../../shared-kernel/domain/errors/not-found-error';

@controller('/missions/:missionId/advance-step')
export class PostAdvanceMissionStepController {
  constructor(
    @inject(tokens.missionExecution.advanceMissionStepUseCase)
    private readonly advanceMissionStepUseCase: AdvanceMissionStepUseCase,
    @inject(tokens.missionExecution.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  @httpPost('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const missionId = String(request.params.missionId);
      await this.advanceMissionStepUseCase.execute({ missionId });
      const missionProgress = await this.missionProgressRepository.findById(missionId);

      if (!missionProgress) {
        throw new NotFoundError('Mission not found');
      }

      return response.json(
        successResponse({
          missionId: missionProgress.id.value,
          currentStep: missionProgress.currentStep,
          isCompleted: missionProgress.isCompleted
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

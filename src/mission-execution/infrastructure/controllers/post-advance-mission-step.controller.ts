import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { AdvanceMissionStepUseCase } from '../../application/use-cases/advance-mission-step.use-case';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';
import { asyncHandler } from '../../../shared-kernel/infrastructure/http/async-handler';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';
import { NotFoundError } from '../../../shared-kernel/domain/errors/not-found-error';

@injectable()
export class PostAdvanceMissionStepController {
  constructor(
    @inject(tokens.missionExecution.advanceMissionStepUseCase)
    private readonly advanceMissionStepUseCase: AdvanceMissionStepUseCase,
    @inject(tokens.missionExecution.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public register(app: Express): void {
    app.post(
      '/missions/:missionId/advance-step',
      asyncHandler(async (request, response) => {
        const missionId = String(request.params.missionId);
        await this.advanceMissionStepUseCase.execute({ missionId });
        const missionProgress = await this.missionProgressRepository.findById(missionId);

        if (!missionProgress) {
          throw new NotFoundError('Mission not found');
        }

        response.json(
          successResponse({
            missionId: missionProgress.id.value,
            currentStep: missionProgress.currentStep,
            isCompleted: missionProgress.isCompleted
          })
        );
      })
    );
  }
}

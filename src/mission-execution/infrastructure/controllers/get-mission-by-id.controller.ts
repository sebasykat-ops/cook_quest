import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';
import { asyncHandler } from '../../../shared-kernel/infrastructure/http/async-handler';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';
import { NotFoundError } from '../../../shared-kernel/domain/errors/not-found-error';

@injectable()
export class GetMissionByIdController {
  constructor(
    @inject(tokens.missionExecution.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  public register(app: Express): void {
    app.get(
      '/missions/:missionId',
      asyncHandler(async (request, response) => {
        const missionId = String(request.params.missionId);
        const missionProgress = await this.missionProgressRepository.findById(missionId);

        if (!missionProgress) {
          throw new NotFoundError('Mission not found');
        }

        response.json(
          successResponse({
            missionId: missionProgress.id.value,
            recipeId: missionProgress.recipeId,
            currentStep: missionProgress.currentStep,
            isCompleted: missionProgress.isCompleted
          })
        );
      })
    );
  }
}

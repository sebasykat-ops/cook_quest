import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { tokens } from '../../../shared-kernel/infrastructure/di/tokens';
import { MissionProgressRepository } from '../../domain/repositories/mission-progress.repository';
import { successResponse } from '../../../shared-kernel/infrastructure/http/api-response';
import { NotFoundError } from '../../../shared-kernel/domain/errors/not-found-error';

@controller('/missions/:missionId')
export class GetMissionByIdController {
  constructor(
    @inject(tokens.missionExecution.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const missionId = String(request.params.missionId);
      const missionProgress = await this.missionProgressRepository.findById(missionId);

      if (!missionProgress) {
        throw new NotFoundError('Mission not found');
      }

      return response.json(
        successResponse({
          missionId: missionProgress.id.value,
          recipeId: missionProgress.recipeId,
          currentStep: missionProgress.currentStep,
          isCompleted: missionProgress.isCompleted
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

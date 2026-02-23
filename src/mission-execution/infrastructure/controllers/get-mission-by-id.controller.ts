import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { z } from 'zod';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { MissionProgressRepository } from '@mission-execution/domain/repositories/mission-progress.repository';
import getMissionByIdSchema from '@mission-execution/infrastructure/schema/get-mission-by-id.schema';
import { NotFoundError } from '@shared/domain/errors/not-found-error';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/missions/:missionId')
export class GetMissionByIdController {
  constructor(
    @inject(missionExecutionContainerTypes.missionProgressRepository)
    private readonly missionProgressRepository: MissionProgressRepository
  ) {}

  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedParams = getMissionByIdSchema.parse(request.params);
      const missionProgress = await this.missionProgressRepository.findById(parsedParams.missionId);

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
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid mission id', error.flatten()));
      }

      next(error);
    }
  }
}

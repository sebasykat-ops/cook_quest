import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { z } from 'zod';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { RestartMissionUseCase } from '@mission-execution/application/use-cases/restart-mission.use-case';
import { GetMissionByIdUseCase } from '@mission-execution/application/use-cases/get-mission-by-id.use-case';
import postRestartMissionSchema from '@mission-execution/infrastructure/schema/post-restart-mission.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/missions/:missionId/restart')
export class PostRestartMissionController {
  constructor(
    @inject(missionExecutionContainerTypes.restartMissionUseCase)
    private readonly restartMissionUseCase: RestartMissionUseCase,
    @inject(missionExecutionContainerTypes.getMissionByIdUseCase)
    private readonly getMissionByIdUseCase: GetMissionByIdUseCase
  ) {}

  @httpPost('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedParams = postRestartMissionSchema.parse(request.params);
      await this.restartMissionUseCase.execute({ missionId: parsedParams.missionId });
      const missionProgress = await this.getMissionByIdUseCase.execute({ missionId: parsedParams.missionId });

      return response.json(
        successResponse({
          missionId: missionProgress.id,
          currentStep: missionProgress.currentStep,
          totalSteps: missionProgress.totalSteps,
          isCompleted: missionProgress.isCompleted,
          completedTimes: missionProgress.completedTimes,
          stepCompletions: missionProgress.stepCompletions,
          missionCode: buildMissionCode(missionProgress.id, missionProgress.recipeId)
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


function buildMissionCode(missionId: string, recipeId: string): string {
  const missionSegment = missionId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4) || 'MISS';
  const recipeSegment = recipeId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4) || 'RECP';
  return `CQ-${recipeSegment}-${missionSegment}`;
}

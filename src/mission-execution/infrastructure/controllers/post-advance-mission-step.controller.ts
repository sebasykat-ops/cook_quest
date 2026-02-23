import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { z } from 'zod';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { AdvanceMissionStepUseCase } from '@mission-execution/application/use-cases/advance-mission-step.use-case';
import { GetMissionByIdUseCase } from '@mission-execution/application/use-cases/get-mission-by-id.use-case';
import postAdvanceMissionStepSchema from '@mission-execution/infrastructure/schema/post-advance-mission-step.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/missions/:missionId/advance-step')
export class PostAdvanceMissionStepController {
  constructor(
    @inject(missionExecutionContainerTypes.advanceMissionStepUseCase)
    private readonly advanceMissionStepUseCase: AdvanceMissionStepUseCase,
    @inject(missionExecutionContainerTypes.getMissionByIdUseCase)
    private readonly getMissionByIdUseCase: GetMissionByIdUseCase
  ) {}

  @httpPost('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedParams = postAdvanceMissionStepSchema.parse(request.params);
      await this.advanceMissionStepUseCase.execute({ missionId: parsedParams.missionId });
      const missionProgress = await this.getMissionByIdUseCase.execute({ missionId: parsedParams.missionId });

      return response.json(
        successResponse({
          missionId: missionProgress.id,
          currentStep: missionProgress.currentStep,
          totalSteps: missionProgress.totalSteps,
          isCompleted: missionProgress.isCompleted,
          completedTimes: missionProgress.completedTimes
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

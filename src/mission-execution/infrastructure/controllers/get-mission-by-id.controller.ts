import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { z } from 'zod';
import missionExecutionContainerTypes from '@mission-execution/infrastructure/container/mission-execution.container.types';
import { GetMissionByIdUseCase } from '@mission-execution/application/use-cases/get-mission-by-id.use-case';
import getMissionByIdSchema from '@mission-execution/infrastructure/schema/get-mission-by-id.schema';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';

@controller('/missions/:missionId')
export class GetMissionByIdController {
  constructor(
    @inject(missionExecutionContainerTypes.getMissionByIdUseCase)
    private readonly getMissionByIdUseCase: GetMissionByIdUseCase
  ) {}

  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsedParams = getMissionByIdSchema.parse(request.params);
      const missionProgress = await this.getMissionByIdUseCase.execute({ missionId: parsedParams.missionId });
      return response.json(successResponse(missionProgress));
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid mission id', error.flatten()));
      }

      next(error);
    }
  }
}

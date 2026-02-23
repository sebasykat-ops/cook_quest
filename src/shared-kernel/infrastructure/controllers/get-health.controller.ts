import { Request, Response, NextFunction } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { z } from 'zod';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { successResponse } from '@shared/infrastructure/http/api-response';
import getHealthSchema from '@shared/infrastructure/schema/get-health.schema';

@controller('/health')
export class GetHealthController {
  @httpGet('')
  public async run(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      getHealthSchema.parse({ params: request.params, query: request.query });
      return response.json(successResponse({ status: 'ok' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new ValidationError('Invalid health request', error.flatten()));
      }

      next(error);
    }
  }
}

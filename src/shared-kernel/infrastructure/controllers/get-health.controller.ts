import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { successResponse } from '../http/api-response';

@controller('/health')
export class GetHealthController {
  @httpGet('')
  public async run(_request: Request, response: Response): Promise<Response> {
    return response.json(successResponse({ status: 'ok' }));
  }
}

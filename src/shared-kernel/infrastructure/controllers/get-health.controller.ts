import { Express } from 'express';
import { injectable } from 'inversify';
import { successResponse } from '../http/api-response';

@injectable()
export class GetHealthController {
  public register(app: Express): void {
    app.get('/health', (_request, response) => {
      response.json(successResponse({ status: 'ok' }));
    });
  }
}

import { Express, Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class GetHealthController {
  public register(app: Express): void {
    app.get('/health', (_request: Request, response: Response) => {
      response.json({ status: 'ok' });
    });
  }
}

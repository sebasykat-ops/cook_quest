import { Express, Request, Response } from 'express';

export function registerGetHealthController(app: Express): void {
  app.get('/health', (_request: Request, response: Response) => {
    response.json({ status: 'ok' });
  });
}

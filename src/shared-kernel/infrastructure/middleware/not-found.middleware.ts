import { Request, Response } from 'express';
import { errorResponse } from '@shared/infrastructure/http/api-response';

export function notFoundMiddleware(_request: Request, response: Response): void {
  response.status(404).json(errorResponse('ROUTE_NOT_FOUND', 'Route not found'));
}

import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../domain/errors/app-error';
import { errorResponse } from '../http/api-response';

export function errorHandlerMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  if (error instanceof AppError) {
    response.status(error.statusCode).json(errorResponse(error.code, error.message, error.details));
    return;
  }

  response.status(500).json(errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'));
}

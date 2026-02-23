export interface SuccessResponse<TData> {
  success: true;
  data: TData;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function successResponse<TData>(data: TData): SuccessResponse<TData> {
  return { success: true, data };
}

export function errorResponse(code: string, message: string, details?: unknown): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details
    }
  };
}

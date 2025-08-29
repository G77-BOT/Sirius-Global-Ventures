import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Ensure the error stack is captured
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export const handleError = (error: unknown): { message: string; statusCode: number } => {
  console.error('Error:', error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    return {
      message: validationError.message,
      statusCode: 400,
    };
  }

  // Handle custom application errors
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  // Handle other Error instances
  if (error instanceof Error) {
    return {
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error || 'An unexpected error occurred',
      statusCode: 500,
    };
  }

  // Default fallback
  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
};

export const handleApiError = (error: unknown): Response => {
  const { message, statusCode } = handleError(error);
  
  return new Response(JSON.stringify({ 
    success: false, 
    error: message 
  }), { 
    status: statusCode,
    headers: { 'Content-Type': 'application/json' }
  });
};

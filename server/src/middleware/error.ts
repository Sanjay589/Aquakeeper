import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Central Express error handler. Must have 4 parameters so Express
 * can recognise it as an error-handling middleware.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[AquaKeeper Error]', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation Failure',
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  const statusCode: number = (err as { status?: number; statusCode?: number }).status
    || (err as { status?: number; statusCode?: number }).statusCode
    || 500;
  const message: string = (err as Error).message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: (err as Error).stack }),
  });
};

export default errorMiddleware;

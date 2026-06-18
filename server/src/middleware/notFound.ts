import { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
};
export default notFoundMiddleware;

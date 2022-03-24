import { Response } from 'express';
import { logger } from '../config/logger';

class ErrorHandler extends Error {
  readonly statusCode: number;
  readonly message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, ErrorHandler.prototype);
    this.statusCode = statusCode;
  }
}

const handleError = (err: iError, res: Response) => {
  const { statusCode, message } = err;

  logger.info(`${statusCode}, ${message}`);
  res.status(statusCode);
  res.json({
    status: 'error',
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };

import { Response } from 'express';

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

  res.status(statusCode);
  res.json({
    status: 'error',
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };

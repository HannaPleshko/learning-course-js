import { Response } from 'express';
import { ErrorHandler, handleError } from '../../error';

describe('test error.ts', () => {
  describe('class ErrorHandler:', () => {
    it('should success', () => {
      const mockErrorHandler = new ErrorHandler(404, 'Error');

      expect(mockErrorHandler.statusCode).toBe(404);
      expect(mockErrorHandler.message).toBe('Error');
    });
  });

  describe('function handleError()', () => {
    it('should success', () => {
      const err: iError = {
        statusCode: 500,
        message: 'Error',
      };
      const response: Response = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const mJson = {
        status: 'error',
        statusCode: err.statusCode,
        message: err.message,
      };
      handleError(err, response);

      expect(response.json).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith(mJson);
      expect(response.status).toHaveBeenCalledWith(err.statusCode);
    });
  });
});

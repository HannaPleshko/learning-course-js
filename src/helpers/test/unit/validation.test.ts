import { Request, Response, NextFunction } from 'express';
import { ExceptionType } from '../../../exception/exception';
import { ErrorHandler } from '../../error';
import { verifyToken, validData } from '../../validation';

describe('function validDataTask()', () => {
  const mRequest: Request = { body: {} };
  const mResponse: Response = jest.fn();
  const mNextFunction: NextFunction = jest.fn();

  it('should success', () => {
    const [title, description] = ['title', 'description'];

    mRequest.body.title = title;
    mRequest.body.description = description;
    validData(mRequest, mResponse, mNextFunction);

    expect(mNextFunction).toHaveBeenCalled();
  });

  it('should failure', () => {
    const [title, description] = [' ', ' '];
    mRequest.body.title = title;
    mRequest.body.description = description;
    let exception;
    try {
      validData(mRequest, mResponse, mNextFunction);
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
  });
});

describe('function verifyToken()', () => {
  const mRequest: Request = {
    headers: {
      authorization: '',
    },
  };
  const mResponse: Response = jest.fn();
  const mNextFunction: NextFunction = jest.fn();

  it('should success', () => {
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjY5LCJpYXQiOjE2MzQxMjUzMTksImV4cCI6MTYzNDEyODkxOX0.gyFOYeLk5zCCCo_LOy7s8OJayEblo2pDQwtrSFSLUwY';

    mRequest.headers.authorization = token;
    verifyToken(mRequest, mResponse, mNextFunction);

    expect(mNextFunction).toHaveBeenCalled();
  });

  it('should failure', () => {
    const token = 'Bearer';

    mRequest.headers.authorization = token;
    let exception;
    try {
      verifyToken(mRequest, mResponse, mNextFunction);
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(ExceptionType.TOKEN_MISSING);
  });
});

import { Request, Response, NextFunction } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from './error';
import { buildResponse } from './response';

export const validData = (req: Request, res: Response, next: NextFunction) => {
  const [firstVal, secondVal] = Object.values(req.body);
  if (firstVal.trim() && secondVal.trim()) next();
  else throw new ErrorHandler(500, ExceptionType.EMPTY_NAME); // TODO: validData
};

export const validDataAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } =(() => ({ email: req.body.email.trim(), name: req.body.name.trim(), password: req.body.password.trim() }))();
    if (email && name && password) {
      if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email))
        throw new ErrorHandler(500, ExceptionType.WRONG_EMAIL);
      next();
    } else {
      if (!email) throw new ErrorHandler(500, ExceptionType.EMPTY_EMAIL);
      if (!name) throw new ErrorHandler(500, ExceptionType.EMPTY_NAME);
      if (!password) throw new ErrorHandler(500, ExceptionType.EMPTY_PWD);
    }
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]) next();
  else throw new ErrorHandler(500, ExceptionType.EMPTY_TOKEN);
};


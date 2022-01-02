import { Request, Response, NextFunction } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from './error';

const validData = (req: Request, res: Response, next: NextFunction) => {
  const [firstVal, secondVal] = Object.values(req.body);
  if (firstVal.trim() && secondVal.trim()) next();
  else throw new ErrorHandler(500, ExceptionType.CHECK_FOR_EMPTY);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]) next();
  else throw new ErrorHandler(500, ExceptionType.TOKEN_MISSING);
};

export { verifyToken, validData };

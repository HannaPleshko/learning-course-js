import { Response } from 'express';
import { ExceptionType, SuccessType } from '../exception/exception';

const buildResponse = (
  res: Response,
  st: number,
  mess: iAuth | iAuth[] | iCourse | iCourse[] | iTopic | iTopic[] | iLesson | iLesson[] | iTask | iTokenData | string
) => {
  res.status(st);
  res.json(mess);
};

export { buildResponse };

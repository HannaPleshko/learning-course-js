import { Response } from 'express';

const buildResponse = (res: Response, st: number, mess: iTask[] | iTask | string | iAuth | iTokenData) => {
  res.status(st);
  res.json(mess);
};

export { buildResponse };

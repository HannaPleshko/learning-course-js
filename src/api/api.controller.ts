import express, { Request, Response } from 'express';
import { ExceptionType, SuccessType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { createCookie } from '../helpers/jwt';
import { buildResponse } from '../helpers/response';
import { validDataAuth, validEmailAuth, validData } from '../helpers/validation';
import { regUser, authUser, deleteUser } from './api.service';

const router = express.Router();

// request contains email, name, password
// response body contains type SUCCESS
router.post('/register', validDataAuth, async (req: Request, res: Response) => {
  try {
    const { email, name, surname, role, password } = (() => (
      {
        email: req.body.email.trim().toLowerCase(), 
        name: req.body.name.trim().toLowerCase(),
        surname: req.body.name.trim().toLowerCase(), 
        role: req.body.role, 
        password: req.body.password.trim()
      }))();

    const user = await regUser(email, name, surname, role, password);

    buildResponse(res, 200, SuccessType.SUCCESS); // TODO: ДОБАВИТЬ ВОЗМОЖНО ОТПРАВКУ ТОКЕНА
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

// request contains email, name, password
// response body contains type SUCCESS, header contains authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjUsImlhdCI6MTY0MTIzNzExNH0.k77ftUNxoh0ghzznpr_4BQJVLZMmEfD0CfTBmKKAanY
router.post('/auth', validData, async (req: Request, res: Response) => {
  try {
    const { email, password } = (() => (
      {
        email: req.body.email.trim().toLowerCase(), 
        password: req.body.password.trim()
      }))();

    const tokenData = await authUser(email, password);

    res.setHeader('authorization', [createCookie(tokenData)]);
    buildResponse(res, 200, tokenData);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

// request - header contains authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjUsImlhdCI6MTY0MTIzNzExNH0.k77ftUNxoh0ghzznpr_4BQJVLZMmEfD0CfTBmKKAanY
// response body contains type SUCCESS, header contains authorization: Bearer
router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.setHeader('authorization', [
      createCookie({
        token: ' ',
      }),
    ]);

    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (error) {
    buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.delete('/delUser', validEmailAuth, async (req: Request, res: Response) => {
  try {
    const { email } = (() => ({ email: req.body.email.trim().toLowerCase() }))();

    await deleteUser(email);
    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

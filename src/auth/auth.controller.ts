import express, { Request, Response } from 'express';
import { ExceptionType, SuccessType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { createCookie } from '../helpers/jwt';
import { buildResponse } from '../helpers/response';
import { validDataAuth } from '../helpers/validation';
import { regUser, authUser, deleteUser } from './auth.service';

const router = express.Router();

// request contains email, name, password, status, role
// response body contains type SUCCESS
router.post('/register', validDataAuth, async (req: Request, res: Response) => {
  try {
    const { email, name, password } = (() => ({ email: req.body.email.trim(), name: req.body.name.trim(), password: req.body.password.trim() }))();

    const user = await regUser(email, name, password);

    buildResponse(res, 200, SuccessType.SUCCESS); // TODO: ДОБАВИТЬ ВОЗМОЖНО АВТОРИЗАЦИЮ И ОТПРАВКУ ТОКЕНА
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

// request contains email, password, name
// response body contains type SUCCESS, header contains authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjUsImlhdCI6MTY0MTIzNzExNH0.k77ftUNxoh0ghzznpr_4BQJVLZMmEfD0CfTBmKKAanY
router.post('/auth', validDataAuth, async (req: Request, res: Response) => {
  try {
    const { email, name, password } = (() => ({ email: req.body.email.trim(), name: req.body.name.trim(), password: req.body.password.trim() }))();

    const tokenData = await authUser(email, name, password);

    res.setHeader('authorization', [createCookie(tokenData)]);
    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

// request -
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

router.delete('/delUser', async (req: Request, res: Response) => {
  try {
    await deleteUser(req.body.login);

    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

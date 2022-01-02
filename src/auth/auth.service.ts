import bcrypt, { hash } from 'bcrypt';
import express, { Request } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { createToken } from '../helpers/jwt';
import { createNewUser, findLogin, hardDelUser, delUser } from './repository';

const saltround = 10;

const createUser = async (email: string, name: string, status: number, role: number, password: string): Promise<iAuth> => {
  const user = await findLogin(email).catch((err) => {
    throw err;
  });

  if (user) throw new ErrorHandler(500, ExceptionType.USER_ALREADY_EXISTS);

  const hashedPassword = await bcrypt.hash(password, saltround);

  const newUser = await createNewUser(email, name, status, role, hashedPassword).catch((err) => {
    throw err;
  });

  if (!newUser) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return newUser;
};

const findUser = async (login: string, password: string): Promise<iTokenData> => {
  const user = await findLogin(login).catch((err) => {
    throw err;
  });

  if (!user) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);

  const hashedPassword = user.password;

  if (!(await bcrypt.compare(password, hashedPassword))) throw new ErrorHandler(500, ExceptionType.INPUT_ERROR_PASSWORD);
  return createToken(user);
};

const deleteUser = async (login: string): Promise<iAuth> => {
  let user;
  if (process.env.NODE_ENV === 'DEV') {
    user = await hardDelUser(login).catch((err) => {
      throw err;
    });
  } else {
    user = await delUser(login).catch((err) => {
      throw err;
    });
  }

  if (!user) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return user;
};

export { createUser, findUser, deleteUser };

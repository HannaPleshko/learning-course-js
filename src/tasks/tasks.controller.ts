import express, { Request, Response } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { decodeToken } from '../helpers/jwt';
import { buildResponse } from '../helpers/response';
import { verifyToken, validData } from '../helpers/validation';
import { getAllTasks, getTask, updateTask, deleteTask, createTask } from './tasks.service';
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjY5LCJpYXQiOjE2MzQxMjUzMTksImV4cCI6MTYzNDEyODkxOX0.gyFOYeLk5zCCCo_LOy7s8OJayEblo2pDQwtrSFSLUwY

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const user = decodeToken(req.headers.authorization.split(' ')[1]);
    const allTasks = await getAllTasks(user._id);

    buildResponse(res, 200, allTasks);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = decodeToken(req.headers.authorization.split(' ')[1]);
    const task = await getTask(id, user._id);

    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/', validData, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const user = decodeToken(req.headers.authorization.split(' ')[1]);
    const newTask = await createTask(title, description, user._id);

    buildResponse(res, 200, newTask);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.put('/:id', validData, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const user = decodeToken(req.headers.authorization.split(' ')[1]);
    const updTask = await updateTask(id, title, description, user._id);

    buildResponse(res, 200, updTask);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = decodeToken(req.headers.authorization.split(' ')[1]);
    const delTask = await deleteTask(id, user._id);

    buildResponse(res, 200, delTask);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

import express, { Request, Response } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { getTask, updateTask, deleteTask, createTask } from '../service/task.service';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await getTask(id);

    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id, lesson_id, code } = req.body;
    const task = await createTask(user_id, lesson_id, code);

    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const task = await updateTask(id, title);

    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/del/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await deleteTask(id);

    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

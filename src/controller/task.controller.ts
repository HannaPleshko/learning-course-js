import express, { Request, Response } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { getTasks, updateTask, deleteTask, createTask, isDoneTask } from '../service/task.service';

const router = express.Router();

router.get('/:user_id', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const task = await getTasks(user_id);

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

router.post('/upd/:id', async (req: Request, res: Response) => {
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

router.post('/is_done', async (req: Request, res: Response) => {
  try {
    const { user_id, lesson_id, is_done } = req.body;
    const task = await isDoneTask(user_id, lesson_id, is_done);

    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

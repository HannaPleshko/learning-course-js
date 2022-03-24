import express, { Request, Response } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { getTopics, getTopic, updateTopic, deleteTopic, createTopic } from '../service/Topic.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const topic = await getTopics();

    buildResponse(res, 200, topic);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await getTopic(id);

    buildResponse(res, 200, topic);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { course_id, title } = req.body;
    const topic = await createTopic(course_id, title);

    buildResponse(res, 200, topic);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const course = await updateTopic(id, title);

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await deleteTopic(id);

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

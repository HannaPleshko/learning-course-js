import express, { Request, Response } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { getCourses, getCourse, updateCourse, deleteCourse, createCourse } from '../service/course.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const course = await getCourses();

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await getCourse(id);

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const course = await createCourse(title);

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const course = await updateCourse(id, title);

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await deleteCourse(id);

    buildResponse(res, 200, course);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };

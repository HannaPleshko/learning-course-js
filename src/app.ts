import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { router as auth } from './controller/auth.controller';
import { ExceptionType } from './exception/exception';
import { handleError, ErrorHandler } from './helpers/error';
import { router as course } from './controller/course.controller';
import { router as topic } from './controller/topic.controller';
import { router as lesson } from './controller/lesson.controller';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send(`Success ${res.statusCode} ${req.originalUrl}`);
});
app.get('/error', (req: Request, res: Response) => {
  throw new ErrorHandler(500, ExceptionType.SERVER_ERROR);
});

app.use('/api', auth);
app.use('/course', course);
app.use('/topic', topic);
app.use('/lesson', lesson);
app.use((err, req: Request, res: Response, next: NextFunction) => handleError(err, res));

export { app };

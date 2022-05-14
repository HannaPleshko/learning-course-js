import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { router as auth } from './controller/auth.controller';
import { router as course } from './controller/course.controller';
import { router as lesson } from './controller/lesson.controller';
import { router as topic } from './controller/topic.controller';
import { router as task } from './controller/task.controller';
import { ExceptionType } from './exception/exception';
import { handleError, ErrorHandler } from './helpers/error';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  });
});
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
app.use('/task', task);
app.use((err, req: Request, res: Response, next: NextFunction) => handleError(err, res));

export { app };

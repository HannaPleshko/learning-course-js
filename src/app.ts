import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { router as auth } from './api/api.controller';
import { ExceptionType } from './exception/exception';
import { handleError, ErrorHandler } from './helpers/error';
import { verifyToken } from './helpers/validation';
import { router as tasks } from './tasks/tasks.controller';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send(`Success ${res.statusCode} ${req.originalUrl}`);
});
app.get('/error', (req: Request, res: Response) => {
  throw new ErrorHandler(500, ExceptionType.SERVER_ERROR);
});

app.use('/tasks', verifyToken, tasks);
app.use('/api', auth);
app.use((err, req: Request, res: Response, next: NextFunction) => handleError(err, res));

export { app };

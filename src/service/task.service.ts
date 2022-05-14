import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { getTaskDB, createTaskDB, updateTaskDB, deleteTaskDB } from '../repository/task.repository';

export const getTask = async (id: number): Promise<iTask> => {
  const task = await getTaskDB(id).catch((err) => {
    throw err;
  });

  if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return task;
};

export const createTask = async (user_id: number, lesson_id: number, code: string): Promise<iTask> => {
  const task = await createTaskDB(user_id, lesson_id, code).catch((err) => {
    throw err;
  });

  if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return task;
};

export const updateTask = async (id: number, title: string): Promise<iTask> => {
  const task = await updateTaskDB(id, title).catch((err) => {
    throw err;
  });

  if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return task;
};

export const deleteTask = async (id): Promise<iTask> => {
  const task = await deleteTaskDB(id).catch((err) => {
    throw err;
  });

  if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return task;
};

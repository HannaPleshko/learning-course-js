import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { getTasksDB, getTaskDB, createTaskDB, updateTaskDB, updateCodeDB, deleteTaskDB, getStatusOfTask, isDoneTaskCreateStatus, isDoneTaskUpdateStatus } from '../repository/task.repository';

export const getTasks = async (user_id: number): Promise<iTask> => {
  const task = await getTasksDB(user_id).catch((err) => {
    throw err;
  });

  if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return task;
};

export const createTask = async (user_id: number, lesson_id: number, code: string): Promise<iTask> => {
  const task = await getTaskDB(user_id, lesson_id).catch((err) => {
    throw err;
  });

  if (task) return updateCodeDB(user_id, lesson_id, code);

  const newNask = await createTaskDB(user_id, lesson_id, code).catch((err) => {
    throw err;
  });

  if (!newNask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return newNask;
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

export const isDoneTask = async (user_id: number, lesson_id: number, is_done: boolean): Promise<iTask> => {
  const statusTask = await getStatusOfTask(user_id, lesson_id).catch((err) => {
    throw err;
  });

  if (statusTask) return isDoneTaskUpdateStatus(user_id, lesson_id, is_done);

  const newStatusTask = await isDoneTaskCreateStatus(user_id, lesson_id, is_done).catch((err) => {
    throw err;
  });

  if (!newStatusTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return newStatusTask;
};

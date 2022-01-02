import { findLogin } from '../auth/repository';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById } from './repository';

const getAllTasks = async (user_id: number): Promise<iTask[]> => {
  const allTasks = await getAllTasksDB(user_id).catch((err) => {
    throw err;
  });

  if (!allTasks) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return allTasks;
};

const getTask = async (id: number, user_id: number): Promise<iTask> => {
  const task = await getTaskById(id, user_id).catch((err) => {
    throw err;
  });

  if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return task;
};

const createTask = async (title: string, description: string, user_id: number): Promise<iTask> => {
  const newTask = await createNewTask(title, description, user_id).catch((err) => {
    throw err;
  });
  if (!newTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return newTask;
};

const updateTask = async (id: number, title: string, description: string, user_id: number): Promise<iTask> => {
  const updTask = await updateTaskById(id, title, description, user_id).catch((err) => {
    throw err;
  });
  if (!updTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return updTask;
};

const deleteTask = async (id: number, user_id: number): Promise<iTask> => {
  const delTask = await deleteTaskById(id, user_id).catch((err) => {
    throw err;
  });
  if (!delTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return delTask;
};

export { getAllTasks, getTask, updateTask, deleteTask, createTask };

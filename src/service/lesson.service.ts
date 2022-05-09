import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { getLessonsDB, getLessonDB, createLessonDB, updateLessonDB, deleteLessonDB } from '../repository/lesson.repository';

export const getLessons = async (topic_id: number, course_id: number): Promise<iLesson[]> => {
  const lesson = await getLessonsDB(topic_id, course_id).catch((err) => {
    throw err;
  });

  if (!lesson) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return lesson;
};

export const getLesson = async (id: number): Promise<iLesson> => {
  const lesson = await getLessonDB(id).catch((err) => {
    throw err;
  });

  if (!lesson) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return lesson;
};

export const createLesson = async (topic_id: number, is_read: boolean, title: string, content: string): Promise<iLesson> => {
  const lesson = await createLessonDB(topic_id, is_read, title, content).catch((err) => {
    throw err;
  });

  if (!lesson) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return lesson;
};

export const updateLesson = async (id: number, topic_id: number, is_read: boolean, title: string, content: string): Promise<iLesson> => {
  const lesson = await updateLessonDB(id, topic_id, is_read, title, content).catch((err) => {
    throw err;
  });

  if (!lesson) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return lesson;
};

export const deleteLesson = async (id: number): Promise<iLesson> => {
  const lesson = await deleteLessonDB(id).catch((err) => {
    throw err;
  });

  if (!lesson) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return lesson;
};

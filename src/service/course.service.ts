import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { getCoursesDB, getCourseDB, createCourseDB, updateCourseDB, deleteCourseDB } from '../repository/course.repository';

export const getCourses = async (): Promise<iCourse[]> => {
  const course = await getCoursesDB().catch((err) => {
    throw err;
  });

  if (!course) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return course;
};

export const getCourse = async (id: number): Promise<iCourse> => {
  const course = await getCourseDB(id).catch((err) => {
    throw err;
  });

  if (!course) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return course;
};

export const createCourse = async (title: string): Promise<iCourse> => {
  const course = await createCourseDB(title).catch((err) => {
    throw err;
  });

  if (!course) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return course;
};

export const updateCourse = async (id: number, title: string): Promise<iCourse> => {
  const course = await updateCourseDB(id, title).catch((err) => {
    throw err;
  });

  if (!course) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return course;
};

export const deleteCourse = async (id): Promise<iCourse> => {
  const course = await deleteCourseDB(id).catch((err) => {
    throw err;
  });

  if (!course) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return course;
};

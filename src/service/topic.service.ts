import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from '../helpers/error';
import { getTopicsDB, getTopicDB, createTopicDB, updateTopicDB, deleteTopicDB } from '../repository/topic.repository';

export const getTopics = async (): Promise<iTopic[]> => {
  const topic = await getTopicsDB().catch((err) => {
    throw err;
  });

  if (!topic) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return topic;
};

export const getTopic = async (course_id: number): Promise<iTopic> => {
  const topic = await getTopicDB(course_id).catch((err) => {
    throw err;
  });

  if (!topic) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return topic;
};

export const createTopic = async (course_id: number, title: string): Promise<iTopic> => {
  const topic = await createTopicDB(course_id, title).catch((err) => {
    throw err;
  });

  if (!topic) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return topic;
};

export const updateTopic = async (id: number, title: string): Promise<iTopic> => {
  const topic = await updateTopicDB(id, title).catch((err) => {
    throw err;
  });

  if (!topic) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return topic;
};

export const deleteTopic = async (id): Promise<iTopic> => {
  const topic = await deleteTopicDB(id).catch((err) => {
    throw err;
  });

  if (!topic) throw new ErrorHandler(404, ExceptionType.NOT_FOUND);
  return topic;
};

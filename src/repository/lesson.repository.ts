import { pool } from '../database';

export const getLessonsDB = async (topic_id: number, course_id: number): Promise<iLesson[] | null> => {
  try {
    const sql = 
    `select lesson.id, lesson.topic_id, lesson.is_read, lesson.title, lesson.content
    from lesson
    join topic on topic.id = lesson.topic_id
    join course on topic.course_id = course.id
    where lesson.topic_id = $1 and topic.course_id = $2`;
    const arrOfVal = (await pool.query(sql, [topic_id, course_id])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getLessonDB: ${err}`);
    return null;
  }
};

export const getLessonDB = async (id: number): Promise<iLesson | null> => {
  try {
    const sql = 'SELECT * FROM lesson WHERE id = $1';
    const arrOfVal = (await pool.query(sql, [id])).rows;
    return arrOfVal;
  } catch (err) {
    console.log(`Exception in getLessonDB: ${err}`);
    return null;
  }
};

export const createLessonDB = async (topic_id: number, is_read: boolean, title: string, content: string): Promise<iLesson | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO lesson (topic_id, is_read, title, content) VALUES($1, $2, $3, $4) RETURNING lesson.*';
    const arrOfVal = (await client.query(sql, [topic_id, is_read, title, content])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createLessonDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};
export const updateLessonDB = async (): Promise<iLesson | null> => {
  try {
    // TODO
    const sql = '';
    const arrOfVal = (await pool.query(sql, [])).rows[0];
    return arrOfVal;
  } catch (err) {
    console.log(`Exception in updateLessonDB: ${err}`);
    return null;
  }
};
export const deleteLessonDB = async (id): Promise<iLesson | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM lesson WHERE id = $1 RETURNING lesson.*';
    const arrOfVal = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in deleteLessonDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

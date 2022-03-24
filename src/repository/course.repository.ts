import { pool } from '../database';

export const getCoursesDB = async (): Promise<iCourse[] | null> => {
  try {
    const sql = 'SELECT * FROM course';
    const arrOfVal = (await pool.query(sql, [])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getCoursesDB: ${err}`);
    return null;
  }
};

export const getCourseDB = async (id: number): Promise<iCourse | null> => {
  try {
    const sql = 'SELECT * FROM course WHERE id = $1';
    const arrOfVal = (await pool.query(sql, [id])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getCourseDB: ${err}`);
    return null;
  }
};

export const createCourseDB = async (title: string): Promise<iCourse | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO course (title) VALUES($1) RETURNING course.*';
    const arrOfVal = (await client.query(sql, [title])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createCourseDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export const updateCourseDB = async (id: number, title: string): Promise<iCourse | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE course SET title = $1 WHERE id = $2 RETURNING course.*';
    const arrOfVal = (await client.query(sql, [title, id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in updateCourseDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export const deleteCourseDB = async (id: number): Promise<iCourse | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM course WHERE id = $1 RETURNING course.*';
    const arrOfVal = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in deleteCourseDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

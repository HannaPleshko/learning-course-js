import { pool } from '../database';

export const getTopicsDB = async (): Promise<iTopic[] | null> => {
  try {
    const sql = 'SELECT * FROM topic';
    const arrOfVal = (await pool.query(sql, [])).rows[0];
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getTopicDB: ${err}`);
    return null;
  }
};

export const getTopicDB = async (course_id: number): Promise<iTopic | null> => {
  try {
    const sql = 'SELECT * FROM topic WHERE course_id = $1';
    const arrOfVal = (await pool.query(sql, [course_id])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getTopicDB: ${err}`);
    return null;
  }
};

export const createTopicDB = async (course_id: number, title: string, description: string): Promise<iTopic | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO topic (course_id, title, description) VALUES($1, $2, $3) RETURNING topic.*';
    const arrOfVal = (await client.query(sql, [course_id, title, description])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createTopicDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export const updateTopicDB = async (id: number, title: string): Promise<iTopic | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE topic SET title = $1 WHERE id = $2 RETURNING topic.*';
    const arrOfVal = (await client.query(sql, [title, id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in updateTopicDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export const deleteTopicDB = async (id: number): Promise<iTopic | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM topic WHERE id = $1 RETURNING topic.*';
    const arrOfVal = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in deleteTopicDB: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

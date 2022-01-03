import { pool } from '../database';

const getAllTasksDB = async (user_id: number): Promise<iTask[] | null> => {
  try {
    const sql = 'SELECT * FROM tasks WHERE user_id = $1';
    const arrOfVal = (await pool.query(sql, [user_id])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getTaskById: ${err}`);
    return null;
  }
};

const getTaskById = async (id: number, user_id: number): Promise<iTask | null> => {
  try {
    const sql = 'SELECT * FROM tasks WHERE id = $1 AND user_id = $2';
    const arrOfVal = (await pool.query(sql, [id, user_id])).rows;
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in getTaskById: ${err}`);
    return null;
  }
};

const createNewTask = async (title: string, description: string, user_id: number): Promise<iTask | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO tasks (title, description, user_id) VALUES($1, $2, $3) RETURNING tasks.*';
    const arrOfVal = (await client.query(sql, [title, description, user_id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createNewTask: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

const updateTaskById = async (id: number, title: string, description: string, user_id: number): Promise<iTask | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING tasks.*';
    const arrOfVal = (await client.query(sql, [title, description, id, user_id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in updateTaskById: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

const deleteTaskById = async (id: number, user_id: number): Promise<iTask | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING tasks.*';
    const arrOfVal = (await client.query(sql, [id, user_id])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in updateTaskById: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export { createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById };

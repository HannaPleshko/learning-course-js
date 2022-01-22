import { pool } from '../database';

export const getUser = async (email: string): Promise<iAuth | null> => {
  try {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const arrOfVal = (await pool.query(sql, [email])).rows[0];
    return arrOfVal;
  } catch (err) {
    console.log(`Exception in getUser: ${err}`);
    return null;
  }
};

//role = 1-student 2-teacher 0-admin status = 0 - active, 1 - inactive
export const createUser = async (email: string, name: string, surname: string, password: string, role: number, status: number = 0): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log(role);
    
    const sql = 'INSERT INTO users (email, name, surname, password, role, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING users.*';
    const arrOfVal = (await client.query(sql, [email, name, surname, password, role, status])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

//TODO: do user restore
export const restoreUser = async (email: string, status: number = 0): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE users SET status = $1 WHERE email = $2 RETURNING users.*';
    const arrOfVal = (await client.query(sql, [status, email])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in restoreUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export const delUser = async (email: string, status: number = 1): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE users SET status = $1 WHERE email = $2 RETURNING users.*';
    const arrOfVal = (await client.query(sql, [status, email])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in delUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export const hardDelUser = async (email: string): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM users WHERE login = $1 RETURNING users.*';
    const arrOfVal = (await client.query(sql, [email])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in hardDelUser: ${err}`);
    await client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};



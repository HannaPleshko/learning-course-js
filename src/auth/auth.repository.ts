import { pool } from '../database';

export const getUser = async (email: string, name: string): Promise<iAuth | null> => {
  try {
    const sql = 'SELECT * FROM users WHERE email = $1 AND name = $2';
    const arrOfVal = (await pool.query(sql, [email, name])).rows[0];
    return arrOfVal;
  } catch (err) {
    console.log(`Exception in findEmail: ${err}`);
    return null;
  }
};

export const createUser = async (email: string, name: string,  password: string,  role: number = 0, status: number = 0): Promise<iAuth | null> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO users (email, name, password, role, status) VALUES($1, $2, $3, $4, $5) RETURNING users.*';
    const arrOfVal = (await client.query(sql, [email, name, password, role, status])).rows;
    await client.query('COMMIT');
    if (arrOfVal.length > 0) return arrOfVal;
    return null;
  } catch (err) {
    console.log(`Exception in createNewUser: ${err}`);
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

export const delUser = async (email: string,  status: number = 1): Promise<iAuth | null> => {
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



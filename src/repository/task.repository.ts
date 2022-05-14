import { pool } from '../database';

export const getTaskDB = async (id: number): Promise<iTask | null> => {
    try {
        const sql = 'SELECT * FROM course WHERE id = $1';
        const arrOfVal = (await pool.query(sql, [id])).rows;
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in getTaskDB: ${err}`);
        return null;
    }
};

export const createTaskDB = async (user_id: number, lesson_id: number, code: string): Promise<iTask | null> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'INSERT INTO task_code (user_id, lesson_id, code) VALUES($1, $2, $3) RETURNING task_code.*';
        const arrOfVal = (await client.query(sql, [user_id, lesson_id, code])).rows;
        await client.query('COMMIT');
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in createTaskDB: ${err}`);
        await client.query('ROLLBACK');
        return null;
    } finally {
        client.release();
    }
};

export const updateTaskDB = async (id: number, title: string): Promise<iTask | null> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE course SET title = $1 WHERE id = $2 RETURNING course.*';
        const arrOfVal = (await client.query(sql, [title, id])).rows;
        await client.query('COMMIT');
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in updateTaskDB: ${err}`);
        await client.query('ROLLBACK');
        return null;
    } finally {
        client.release();
    }
};

export const deleteTaskDB = async (id: number): Promise<iTask | null> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'DELETE FROM course WHERE id = $1 RETURNING course.*';
        const arrOfVal = (await client.query(sql, [id])).rows;
        await client.query('COMMIT');
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in deleteTaskDB: ${err}`);
        await client.query('ROLLBACK');
        return null;
    } finally {
        client.release();
    }
};

import { pool } from '../database';

export const getTasksDB = async (user_id: number): Promise<iTask | null> => {
    try {
        const sql = 'SELECT lesson.id as lesson_id, lesson.title, task_code.code,  users.name,  users.id as user_id FROM task_code JOIN lesson ON lesson.id = task_code.lesson_id JOIN users ON users.id = task_code.user_id WHERE user_id = $1';
        const arrOfVal = (await pool.query(sql, [user_id])).rows;
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in getTaskDB: ${err}`);
        return null;
    }
};

export const getTaskDB = async (user_id: number, lesson_id: number): Promise<iTask | null> => {
    try {
        const sql = 'SELECT * FROM task_code WHERE user_id = $1 AND lesson_id = $2';
        const arrOfVal = (await pool.query(sql, [user_id, lesson_id])).rows;
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

export const updateCodeDB = async (user_id: number, lesson_id: number, code: string): Promise<iTask | null> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE task_code SET code = $1 WHERE user_id = $2 AND lesson_id = $3 RETURNING task_code.*';
        const arrOfVal = (await client.query(sql, [code, user_id, lesson_id])).rows;
        await client.query('COMMIT');
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in updateCodeDB: ${err}`);
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

export const getStatusOfTask = async (user_id: number, lesson_id: number): Promise<iTask | null> => {
    try {
        const sql = 'SELECT * FROM work_status WHERE user_id = $1 AND lesson_id = $2';
        const arrOfVal = (await pool.query(sql, [user_id, lesson_id])).rows;
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in getStatusOfTask: ${err}`);
        return null;
    }
};

export const isDoneTaskCreateStatus = async (user_id: number, lesson_id: number, is_done: boolean): Promise<iTask | null> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'INSERT INTO work_status (user_id, lesson_id, is_done) VALUES($1, $2, $3) RETURNING work_status.*';
        const arrOfVal = (await client.query(sql, [user_id, lesson_id, is_done])).rows;
        await client.query('COMMIT');
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in isDoneTaskCreateStatus: ${err}`);
        await client.query('ROLLBACK');
        return null;
    } finally {
        client.release();
    }
};

export const isDoneTaskUpdateStatus = async (user_id: number, lesson_id: number, is_done: boolean): Promise<iTask | null> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE work_status SET is_done = $1 WHERE user_id = $2 AND lesson_id = $3 RETURNING work_status.*';
        const arrOfVal = (await client.query(sql, [is_done, user_id, lesson_id,])).rows;
        await client.query('COMMIT');
        if (arrOfVal.length > 0) return arrOfVal;
        return null;
    } catch (err) {
        console.log(`Exception in isDoneTaskUpdateStatus: ${err}`);
        await client.query('ROLLBACK');
        return null;
    } finally {
        client.release();
    }
};

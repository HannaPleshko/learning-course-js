import { config } from 'dotenv';
import { Pool } from 'pg';

config({ path: __dirname + '/../.env' });

const { DB_USER, DB_HOST, DB_PORT, DB_NAME, DB_PWD } = process.env;
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PWD,
  port: DB_PORT,
});

export { pool };

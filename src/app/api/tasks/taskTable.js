import { Pool } from "pg";

// PostgreSQL接続（適宜環境変数に変更）
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'taskDB',
  password: 'your_password',
  port: 5432,
});

export const saveTaskToDB = async (task) => {
  const { id, title, description, tags } = task;
  const query = `
    INSERT INTO tasks (id, title, description, tags)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (id) DO UPDATE
    SET title = EXCLUDED.title,
        description = EXCLUDED.description,
        tags = EXCLUDED.tags
    RETURNING *;
  `;
  const values = [id, title, description, tags];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error saving task to database", err);
    throw err;
  }
};
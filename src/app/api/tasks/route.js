import { Pool } from "pg";
import { NextResponse } from "next/server";
import { saveTaskToDB } from "./taskTable";

// PostgreSQL接続（適宜環境変数に変更）
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'taskDB',
  password: 'your_password',
  port: 5432,
});

export async function GET() {
  try {
    console.log("GETリクエストを受信しました");
    const result = await pool.query("SELECT * FROM tasks");
    console.log("タスクを取得しました:", result.rows);
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("タスクの取得に失敗しました:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
  
export async function POST(req) {
  const { title, description, tags } = await req.json();
  const id = Date.now(); // 一意のIDを付与
  try {
    console.log("POSTリクエストを受信しました:", { title, description, tags });
    const task = { id, title, description, tags };
    const savedTask = await saveTaskToDB(task);
    console.log("タスクを保存しました:", savedTask);
    return NextResponse.json(savedTask);
  } catch (err) {
    console.error("タスクの保存に失敗しました:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
  
export async function DELETE(req) {
  const { id } = req.query;
  try {
    console.log("DELETEリクエストを受信しました:", id);
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    console.log("タスクを削除しました:", id);
    return NextResponse.json({ message: "タスク削除成功" });
  } catch (err) {
    console.error("タスクの削除に失敗しました:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
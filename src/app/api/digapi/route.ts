import { NextResponse } from 'next/server';

type Goal = {
  id: number;
  title: string;
  description: string;
  taskCompletionRate: number;
};

// 仮のデータストア（本来はデータベースを使う）
const goals: Goal[] = [
  { id: 1, title: "React習得", description: "Reactの基礎をマスターする", taskCompletionRate: 75 },
  { id: 2, title: "ポートフォリオ作成", description: "個人ウェブサイトを作る", taskCompletionRate: 30 },
];

// GET: 目標一覧を取得
export async function GET() {
  return NextResponse.json(goals);
}

// POST: 新しい目標を追加
export async function POST(req: Request) {
  const { title, description } = await req.json();
  const newGoal: Goal = {
    id: goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1,
    title,
    description,
    taskCompletionRate: 0,
  };
  goals.push(newGoal);
  return NextResponse.json(newGoal, { status: 201 });
}

// PUT: 目標を更新
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));  // クエリパラメータからidを取得
  const { title, description } = await req.json();

  if (typeof id !== "number") {
    return NextResponse.json({ error: "IDが無効です" }, { status: 400 });
  }

  const goalIndex = goals.findIndex((g) => g.id === id);

  if (goalIndex === -1) {
    return NextResponse.json({ error: "目標が見つかりません" }, { status: 404 });
  }

  goals[goalIndex] = { ...goals[goalIndex], title, description };
  return NextResponse.json(goals[goalIndex]);
}

// DELETE: 目標を削除
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const goalIndex = goals.findIndex((g) => g.id === id);

  if (goalIndex === -1) {
    return NextResponse.json({ error: "目標が見つかりません" }, { status: 404 });
  }

  goals.splice(goalIndex, 1);
  return NextResponse.json({ message: "削除成功" }, { status: 200 });
}
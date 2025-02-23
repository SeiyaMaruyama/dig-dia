import { NextResponse } from "next/server";

export async function POST() {
  const today = new Date().toISOString().split("T")[0];
  return NextResponse.json({
    message: "日記を作成しました!",
    date: today,
  });
}

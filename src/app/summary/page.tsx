"use client";

import Summary from "@/components/Summary";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">日記の要約アプリ</h1>

      <textarea
        className="w-full p-2 border rounded"
        rows={5}
        placeholder="要約したい日記を入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Summary text={text} />
    </main>
  );
}

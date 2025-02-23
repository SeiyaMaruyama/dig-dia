"use client";

import { useState } from "react";
import { DiaryForm } from "../../components/DiaryForm";
import { DiaryList } from "../../components/DiaryList";

const initialEntries = [
  {
    id: 1,
    date: "2025-02-22",
    content:
      "今日は友達と久しぶりに会って、カフェでゆっくり過ごしました。昔話に花が咲いて、あっという間に時間が過ぎてしまいました。やはり人と直接会って話すのは大切だなと実感しました。",
  },
  {
    id: 2,
    date: "2025-02-21",
    content:
      "新しい趣味として水彩画を始めてみました。最初は難しかったですが、YouTubeの tutorial を見ながら練習していると少しずつ上達している気がします。自分の成長を感じられるのが楽しいです。",
  },
  {
    id: 3,
    date: "2025-02-20",
    content:
      "今日は早起きして、近所の公園でジョギングをしました。朝の空気が気持ち良くて、すがすがしい気分になりました。これからも続けていきたいと思います。健康的な生活習慣を作るのが目標です。",
  },
];

export default function Home() {
  const [entries, setEntries] = useState(initialEntries);
  const [editingEntry, setEditingEntry] = useState<{
    id: number;
    date: string;
    content: string;
  } | null>(null);

  const addEntry = async (date: string, content: string) => {
    const response = await fetch("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, content }),
    });

    if (response.ok) {
      const newEntry = await response.json();
      setEntries([newEntry, ...entries]);
    } else {
      console.error("Failed to add entry");
    }
  };

  const editEntry = (id: number) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditingEntry(entryToEdit);
    }
  };

  const updateEntry = (id: number, date: string, content: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, date, content } : entry
      )
    );
    setEditingEntry(null);
  };

  const deleteEntry = (id: number) => {
    if (confirm("本当にこの日記を削除しますか？")) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">日記</h1>
      <DiaryForm
        onAddEntry={addEntry}
        editingEntry={editingEntry}
        onUpdateEntry={updateEntry}
      />
      <DiaryList entries={entries} onEdit={editEntry} onDelete={deleteEntry} />
    </main>
  );
}

import React from "react";

export default function DiaryPage() {
  return (
    <div>
      <h1>日記ページ</h1>
      <p>ここに日記の内容が表示されます。</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { DiaryForm } from "../../components/DiaryForm";
import { DiaryList } from "../../components/DiaryList";
import { EditModal } from "../../components/EditModal";
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal";

const initialEntries = [
  {
    id: 1,
    title: "友達との再会",
    date: "2025-02-22",
    content:
      "今日は友達と久しぶりに会って、カフェでゆっくり過ごしました。昔話に花が咲いて、あっという間に時間が過ぎてしまいました。やはり人と直接会って話すのは大切だなと実感しました。",
  },
  {
    id: 2,
    title: "新しい趣味",
    date: "2025-02-21",
    content:
      "新しい趣味として水彩画を始めてみました。最初は難しかったですが、YouTubeの tutorial を見ながら練習していると少しずつ上達している気がします。自分の成長を感じられるのが楽しいです。",
  },
  {
    id: 3,
    title: "朝のジョギング",
    date: "2025-02-20",
    content:
      "今日は早起きして、近所の公園でジョギングをしました。朝の空気が気持ち良くて、すがすがしい気分になりました。これからも続けていきたいと思います。健康的な生活習慣を作るのが目標です。",
  },
];

export default function Home() {
  const [entries, setEntries] = useState(initialEntries);
  const [editingEntry, setEditingEntry] = useState<{
    id: number;
    title: string;
    date: string;
    content: string;
  } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingEntryId, setDeletingEntryId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      setIsEditModalOpen(true);
    }
  };

  const updateEntry = (
    id: number,
    title: string,
    date: string,
    content: string
  ) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, title, date, content } : entry
      )
    );
    setEditingEntry(null);
    setIsEditModalOpen(false);
  };

  const deleteEntry = (id: number) => {
    setDeletingEntryId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingEntryId !== null) {
      setEntries(entries.filter((entry) => entry.id !== deletingEntryId));
      setDeletingEntryId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">日記</h1>
      <DiaryForm onAddEntry={addEntry} />
      <DiaryList entries={entries} onEdit={editEntry} onDelete={deleteEntry} />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        entry={editingEntry}
        onUpdate={updateEntry}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}

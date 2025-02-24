"use client";

import Link from "next/link"; // 追加
import { useState } from "react";
import { DiaryForm } from "../../components/DiaryForm";
import { DiaryList } from "../../components/DiaryList";
import { EditModal } from "../../components/EditModal";
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal";

const initialEntries = [
  {
    id: 1,
    title: "発表資料作り",
    date: "2025-02-23",
    content:
      "ハッカソン用の発表資料を作成した。スライドの内容と流れについて注意を払った。",
  },
  {
    id: 2,
    title: "GitHubでプルリクを作ってみた",
    date: "2025-02-22",
    content:
      "GitHubでプルリクを作成してみた。作成の過程や他のメンバーとのコミュニケーションについても学んだ。",
  },
  {
    id: 3,
    title: "apiを叩いてみた",
    date: "2025-02-21",
    content:
      "初めてapiを叩いてみた。データを取得することができ、とても面白かった。",
  },
  {
    id: 4,
    title: "企画をした",
    date: "2025-02-20",
    content:
      "ハッカソンの企画をした。メンバーとアイデアを出し合い、どのように進めていくかを話し合って最後には作業分担した。",
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

  const addEntry = (title: string, date: string, content: string) => {
    const newEntry = {
      id: entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1,
      title,
      date,
      content,
    };
    setEntries([newEntry, ...entries]);
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
    <>
      <header className="bg-gray-100 border-b border-gray-300">
        <nav className="container mx-auto p-4 max-w-3xl flex space-x-4">
          <Link
            href="/diary"
            className="text-black-800 font-bold hover:underline"
          >
            発掘日記
          </Link>
          <Link
            href="/dig"
            className="text-black-800 font-bold hover:underline"
          >
            目標一覧
          </Link>
          <Link
            href="/task"
            className="text-black-800 font-bold hover:underline"
          >
            タスク一覧
          </Link>
          <Link
            href="/dig"
            className="text-black-800 font-bold hover:underline"
          >
            ギャラリー
          </Link>
        </nav>
      </header>
      <div className="bg-[#f5e7d6]">
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">発掘日記</h1>
          <DiaryForm onAddEntry={addEntry} />
          <DiaryList
            entries={entries}
            onEdit={editEntry}
            onDelete={deleteEntry}
          />
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
      </div>
    </>
  );
}

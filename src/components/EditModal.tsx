"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: { id: number; title: string; date: string; content: string } | null;
  onUpdate: (id: number, title: string, date: string, content: string) => void;
}

export function EditModal({
  isOpen,
  onClose,
  entry,
  onUpdate,
}: EditModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDate(entry.date);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry && title && date && content) {
      onUpdate(entry.id, title, date, content);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="日記を編集">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full"
          required
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
          required
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今日の出来事を書いてください..."
          className="w-full"
          required
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="submit">更新</Button>
        </div>
      </form>
    </Modal>
  );
}

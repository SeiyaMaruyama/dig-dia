"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DiaryFormProps {
  onAddEntry: (date: string, content: string) => void;
  editingEntry: { id: number; date: string; content: string } | null;
  onUpdateEntry: (id: number, date: string, content: string) => void;
}

export function DiaryForm({
  onAddEntry,
  editingEntry,
  onUpdateEntry,
}: DiaryFormProps) {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date);
      setContent(editingEntry.content);
    }
  }, [editingEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && content) {
      if (editingEntry) {
        onUpdateEntry(editingEntry.id, date, content);
      } else {
        onAddEntry(date, content);
      }
      setDate("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
          required
        />
      </div>
      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今日の出来事を書いてください..."
          className="w-full"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {editingEntry ? "日記を更新" : "日記を追加"}
      </Button>
    </form>
  );
}

"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DiaryFormProps {
  onAddEntry: (title: string, date: string, content: string) => void;
}

export function DiaryForm({ onAddEntry }: DiaryFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date && content) {
      onAddEntry(title, date, content);
      setTitle("");
      setContent("");
      // Reset date to today after submission
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-lg mx-auto">
      <div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full bg-white"
          required
        />
      </div>
      <div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>
      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今日の「できた！」 「やってみた！」を日記にしよう ^^b"
          className="w-full bg-white h-40"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        日記を追加
      </Button>
    </form>
  );
}

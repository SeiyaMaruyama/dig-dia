import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface DiaryEntryProps {
  id: number;
  title: string;
  date: string;
  content: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function DiaryEntry({
  id,
  title,
  date,
  content,
  //onEdit,
  onDelete,
}: DiaryEntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title || "");

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      ) : (
        <div>
          <div className="font-semibold mb-2 flex justify-between items-center">
            <span>{title}</span>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditTitle(title || "");
                  setIsEditing(true);
                }}
                className="mr-2"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">編集</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">削除</span>
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            {new Date(date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  );
}

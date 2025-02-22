import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface DiaryEntryProps {
  id: number;
  date: string;
  content: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function DiaryEntry({
  id,
  date,
  content,
  onEdit,
  onDelete,
}: DiaryEntryProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="font-semibold mb-2 flex justify-between items-center">
        <span>
          {new Date(date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </span>
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(id)}
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
      <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );
}

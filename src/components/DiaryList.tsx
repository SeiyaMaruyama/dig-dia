import { DiaryEntry } from "./DiaryEntry";

interface DiaryListProps {
  entries: { id: number; title: string; date: string; content: string }[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function DiaryList({ entries, onEdit, onDelete }: DiaryListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">日記一覧</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">
          まだ日記がありません。新しい日記を書いてみましょう。
        </p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <DiaryEntry
              key={entry.id} // ここでkeyプロパティを設定
              id={entry.id}
              title={entry.title}
              date={entry.date}
              content={entry.content}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

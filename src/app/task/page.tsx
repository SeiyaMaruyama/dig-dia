"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

type NewTask = Omit<Task, "id"> & { id?: number };

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}) => (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>{task.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {task.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex justify-end space-x-2">
      <Button variant="outline" size="icon" onClick={() => onEdit(task)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(task.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

type TagInputProps = {
  tags: string[];
  input: string;
  setInput: (value: string) => void;
  setTags: (tags: string[]) => void;
};

const TagInput = ({ tags, input, setInput, setTags }: TagInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      e.preventDefault();
      setTags([...tags, input]);
      setInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Label htmlFor="tags">タグ</Label>
      <Input
        id="tags"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タグを入力し、Enterを押してください"
      />
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => removeTag(index)}
          >
            {tag} ×
          </Badge>
        ))}
      </div>
    </div>
  );
};

const TaskForm = ({
  task,
  onSave,
  onCancel,
}: {
  task?: Task;
  onSave: (task: NewTask) => void;
  onCancel: () => void;
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [tags, setTags] = useState(task?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 入力中のタグがあれば追加
    const finalTags = tagInput ? [...tags, tagInput] : tags;
    onSave({ id: task?.id, title, description, tags: finalTags });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">説明</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <TagInput
        tags={tags}
        input={tagInput}
        setInput={setTagInput}
        setTags={setTags}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
};

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "プロジェクト計画の作成",
      description: "来月のプロジェクトの詳細計画を立てる",
      tags: ["仕事", "計画"],
    },
    {
      id: 2,
      title: "週次レポートの提出",
      description: "先週の進捗状況をまとめてレポートを作成する",
      tags: ["仕事", "レポート"],
    },
    {
      id: 3,
      title: "新しい技術の学習",
      description: "React Hooksについて1時間学習する",
      tags: ["自己啓発", "プログラミング"],
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // 削除確認用の状態を追加
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task: NewTask) => {
    if (task.id !== undefined) {
      setTasks(tasks.map((t) => (t.id === task.id ? (task as Task) : t)));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setIsDialogOpen(false);
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  // TaskCard の onDelete 用に削除確認モーダルを表示
  const confirmDeleteTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setDeleteDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">タスク管理</h1>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingTask(undefined);
        }}
      >
        <div className="flex justify-end mb-4">
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> 新規タスク
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "タスクの編集" : "新規タスク"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingTask(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* 削除確認用のモーダル */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setTaskToDelete(undefined);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タスクの削除</DialogTitle>
          </DialogHeader>
          <p className="mb-4">タスクを削除してもよろしいですか？</p>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setTaskToDelete(undefined);
              }}
            >
              キャンセル
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (taskToDelete) {
                  setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
                  setDeleteDialogOpen(false);
                  setTaskToDelete(undefined);
                }
              }}
            >
              削除
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={confirmDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

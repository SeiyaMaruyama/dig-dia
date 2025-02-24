"use client";

import type React from "react";
import Link from "next/link"; // 追加

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type Goal = {
  id: number;
  title: string;
  description: string;
  taskCompletionRate: number;
};

export default function Dig() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "技育Campハッカソンで作品発表",
      description: "Webアプリと発表資料を作る",
      taskCompletionRate: 100,
    },
    {
      id: 2,
      title: "Reactの基礎を学ぶ",
      description: "Reactを使ってタスク管理アプリを作る",
      taskCompletionRate: 30,
    },
    {
      id: 3,
      title: "GitHubの基礎を学ぶ",
      description: "コミット、プッシュ、マージができるようにする",
      taskCompletionRate: 75,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

  // 以下、削除確認用のstateを追加
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (currentGoal) {
      updateGoal(currentGoal.id, { title, description });
    } else {
      addGoal({ title, description });
    }
    setIsOpen(false);
    setCurrentGoal(null);
  };

  const addGoal = (newGoal: Omit<Goal, "id" | "taskCompletionRate">) => {
    const id = Math.max(0, ...goals.map((g) => g.id)) + 1;
    setGoals([...goals, { ...newGoal, id, taskCompletionRate: 0 }]);
  };

  const updateGoal = (id: number, updatedGoal: Partial<Goal>) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, ...updatedGoal } : goal))
    );
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const openDeleteDialog = (goal: Goal) => {
    setGoalToDelete(goal);
    setDeleteDialogIsOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setCurrentGoal(goal);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5e7d6]">
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
        <div className="container mx-auto p-4">
          <div className="relative mb-4">
            <h1 className="text-2xl font-bold text-center">“できる”を発掘</h1>
            <div className="absolute right-0 top-0">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <Plus className="mr-2 h-4 w-4" /> 新しい目標を立てる
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {currentGoal ? "目標と手段の変更" : "新しい目標を立てる"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">達成したい目標</Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={currentGoal?.title}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">
                        目標達成のために何をするか
                      </Label>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={currentGoal?.description}
                      />
                    </div>
                    <Button type="submit">
                      {currentGoal ? "更新" : "発掘開始"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>達成したい目標</TableHead>
                  <TableHead>目標達成のために何をするか</TableHead>
                  <TableHead>発掘進捗</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.map((goal) => (
                  <TableRow key={goal.id}>
                    <TableCell>{goal.title}</TableCell>
                    <TableCell>{goal.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={goal.taskCompletionRate}
                          className="w-[60%]"
                        />
                        <span>{goal.taskCompletionRate}% 発掘済み</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditModal(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {goal.taskCompletionRate === 100 && (
                          <Link href="/summary">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-16"
                            >
                              振り返り
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openDeleteDialog(goal)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* 削除確認ダイアログ */}
          <Dialog
            open={deleteDialogIsOpen}
            onOpenChange={setDeleteDialogIsOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>目標の削除確認</DialogTitle>
              </DialogHeader>
              <p>本当に「{goalToDelete?.title}」を削除しますか？</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDeleteDialogIsOpen(false);
                    setGoalToDelete(null);
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (goalToDelete) {
                      deleteGoal(goalToDelete.id);
                    }
                    setDeleteDialogIsOpen(false);
                    setGoalToDelete(null);
                  }}
                >
                  削除
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </>
    </div>
  );
}

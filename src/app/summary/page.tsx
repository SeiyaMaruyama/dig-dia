"use client";

import Summary from "@/components/Summary";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState(
    "ハッカソンの企画をした。メンバーとアイデアを出し合い、どのように進めていくかを話し合って最後には作業分担した。\n初めてapiを叩いてみた。データを取得することができ、とても面白かった。\nGitHubでプルリクを作成してみた。作成の過程や他のメンバーとのコミュニケーションについても学んだ。\nハッカソン用の発表資料を作成した。スライドの内容と流れについて注意を払った。"
  );

  return (
    <div className="bg-[#f5e7d6] min-h-screen">
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
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          発掘完了までの振り返り
        </h1>

        <textarea
          className="w-full p-2 border rounded bg-white"
          rows={5}
          placeholder="振り返りたい内容を入力..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Summary text={text} />
      </main>
    </div>
  );
}

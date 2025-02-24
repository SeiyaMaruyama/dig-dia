import { useState } from "react";

const Summary = ({ text }: { text: string }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const responseText = await res.text();
      const data = responseText ? JSON.parse(responseText) : {};
      setSummary(data.summary || "要約に失敗しました。");
    } catch (error) {
      console.error("要約エラー:", error);
      setSummary("要約に失敗しました。");
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 text-right">
      <button
        onClick={handleSummarize}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "振り返りをまとめ中..." : "振り返る！"}
      </button>

      {summary && (
        <div className="mt-4 p-3 border bg-white rounded">
          <h2 className="text-lg font-semibold">まとめ:</h2>
          <p className="mt-2">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;

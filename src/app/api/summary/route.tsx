import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: `次の文章を要約してください: ${text}` },
      ],
    });

    const summary =
      response.choices[0]?.message?.content || "要約できませんでした。";
    res.status(200).json({ summary });
  } catch {
    res.status(500).json({ error: "AI要約エラー" });
  }
}

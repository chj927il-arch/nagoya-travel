import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "텍스트가 없습니다." }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: "당신은 한국어를 일본어로 번역하는 번역가입니다. 여행자가 일본에서 사용할 수 있도록 자연스럽고 정중한 일본어로 번역하세요. 번역 결과만 출력하고 설명은 하지 마세요.",
            },
          ],
        },
        contents: [
          {
            parts: [{ text: `다음을 일본어로 번역해주세요: ${text}` }],
          },
        ],
        generationConfig: { maxOutputTokens: 300 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini API 오류:", err);
    return NextResponse.json({ error: "번역 API 오류" }, { status: 500 });
  }

  const data = await response.json();
  const translated = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return NextResponse.json({ translated });
}

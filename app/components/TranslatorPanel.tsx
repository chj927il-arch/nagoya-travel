"use client";

import { useState } from "react";

const phrases = [
  { kr: "얼마예요?", jp: "いくらですか？", read: "이쿠라데스카?" },
  { kr: "이거 주세요", jp: "これをください", read: "코레오 쿠다사이" },
  { kr: "역은 어디예요?", jp: "駅はどこですか？", read: "에키와 도코데스카?" },
  { kr: "화장실은 어디예요?", jp: "トイレはどこですか？", read: "토이레와 도코데스카?" },
  { kr: "메뉴 주세요", jp: "メニューをください", read: "메뉴-오 쿠다사이" },
  { kr: "계산해 주세요", jp: "お会計をお願いします", read: "오카이케이오 오네가이시마스" },
  { kr: "영어 하세요?", jp: "英語は話せますか？", read: "에이고와 하나세마스카?" },
  { kr: "도와주세요!", jp: "助けてください！", read: "타스케테 쿠다사이!" },
  { kr: "맵지 않게 해주세요", jp: "辛くしないでください", read: "카라쿠 시나이데 쿠다사이" },
  { kr: "알레르기 있어요", jp: "アレルギーがあります", read: "아레루기-가 아리마스" },
];

export default function TranslatorPanel() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function translate() {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setResult(data.translated ?? "번역 실패");
    } catch {
      setResult("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  function copyPhrase(jp: string, idx: number) {
    navigator.clipboard.writeText(jp).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div>
      {/* 번역기 */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>🌐 한국어 → 일본어 번역</div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="번역할 한국어를 입력하세요..."
          rows={3}
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 14,
            fontFamily: "inherit",
            resize: "none",
            outline: "none",
            background: "#F7F6F3",
            color: "var(--color-text)",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              translate();
            }
          }}
        />
        <button
          onClick={translate}
          disabled={loading || !input.trim()}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "10px",
            borderRadius: 10,
            background: loading || !input.trim() ? "#E8E6E1" : "var(--color-primary)",
            color: loading || !input.trim() ? "var(--color-text-muted)" : "white",
            border: "none",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading || !input.trim() ? "default" : "pointer",
            transition: "background 0.15s",
          }}
        >
          {loading ? "번역 중..." : "번역하기"}
        </button>

        {result && (
          <div
            style={{
              marginTop: 12,
              background: "#F7F6F3",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.6,
              borderLeft: "3px solid var(--color-primary)",
            }}
          >
            {result}
          </div>
        )}
      </div>

      {/* 필수 회화 카드 */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>📝 여행 필수 회화 (탭해서 복사)</div>
        {phrases.map((p, i) => (
          <div
            key={i}
            onClick={() => copyPhrase(p.jp, i)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < phrases.length - 1 ? "1px solid var(--color-border)" : "none",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 13, color: "var(--color-text-muted)", width: 100 }}>{p.kr}</span>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{p.jp}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--color-text-hint)", marginTop: 2, paddingLeft: 110 }}>
                {p.read}
              </div>
            </div>
            <div style={{ fontSize: 12, color: copied === i ? "#1A7A4A" : "var(--color-text-hint)", flexShrink: 0 }}>
              {copied === i ? "✓ 복사됨" : "복사"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

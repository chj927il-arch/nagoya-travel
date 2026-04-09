"use client";
import { useState, useEffect } from "react";

const QUICK_AMOUNTS = [100, 500, 1000, 3000, 5000, 10000, 30000, 50000];

const PRESETS = [
  { label: "편의점 음료", yen: 150, emoji: "🥤" },
  { label: "라멘 한 그릇", yen: 1000, emoji: "🍜" },
  { label: "지하철 1회", yen: 250, emoji: "🚇" },
  { label: "미소카츠", yen: 1500, emoji: "🥩" },
  { label: "히츠마부시", yen: 4000, emoji: "🍱" },
  { label: "편의점 도시락", yen: 600, emoji: "🍱" },
  { label: "자판기 음료", yen: 130, emoji: "🥤" },
  { label: "택시 기본요금", yen: 500, emoji: "🚕" },
  { label: "나고야 성 입장", yen: 500, emoji: "🏯" },
  { label: "수족관 입장", yen: 2030, emoji: "🐋" },
  { label: "나바나노사토", yen: 2500, emoji: "🌷" },
  { label: "뮤스카이 (공항→역)", yen: 870, emoji: "✈️" },
];

export default function CurrencyPanel() {
  const [rate, setRate] = useState<number>(9.5); // 기본 환율
  const [customRate, setCustomRate] = useState<string>("9.5");
  const [yen, setYen] = useState<string>("1000");
  const [won, setWon] = useState<string>("");
  const [mode, setMode] = useState<"yenToWon" | "wonToYen">("yenToWon");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [rateSource, setRateSource] = useState<"live" | "manual">("manual");

  // 실시간 환율 가져오기
  async function fetchRate() {
    setLoading(true);
    try {
      const res = await fetch("https://api.frankfurter.app/latest?from=JPY&to=KRW");
      const data = await res.json();
      const newRate = data.rates.KRW;
      setRate(newRate);
      setCustomRate(newRate.toFixed(2));
      setRateSource("live");
      setLastUpdated(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
    } catch {
      setRateSource("manual");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRate();
  }, []);

  useEffect(() => {
    const r = parseFloat(customRate);
    if (!isNaN(r) && r > 0) setRate(r);
  }, [customRate]);

  function calcWon(yenVal: number) {
    return Math.round(yenVal * rate).toLocaleString();
  }
  function calcYen(wonVal: number) {
    return Math.round(wonVal / rate).toLocaleString();
  }

  function handleYenInput(v: string) {
    setYen(v);
    const n = parseFloat(v.replace(/,/g, ""));
    if (!isNaN(n)) setWon(Math.round(n * rate).toLocaleString());
    else setWon("");
  }

  function handleWonInput(v: string) {
    setWon(v);
    const n = parseFloat(v.replace(/,/g, ""));
    if (!isNaN(n)) setYen(Math.round(n / rate).toLocaleString());
    else setYen("");
  }

  function setQuickYen(amount: number) {
    setYen(amount.toLocaleString());
    setWon(Math.round(amount * rate).toLocaleString());
    setMode("yenToWon");
  }

  return (
    <div>
      {/* 헤더 */}
      <div style={{ background: "var(--color-primary)", borderRadius: 16, padding: "16px 20px", marginBottom: 12, color: "white" }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>엔화 ↔ 원화 환율 계산기</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 700 }}>¥1</span>
          <span style={{ fontSize: 16, opacity: 0.8 }}>=</span>
          <span style={{ fontSize: 28, fontWeight: 700 }}>₩{rate.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.7 }}>
            {rateSource === "live" ? `실시간 환율 · ${lastUpdated} 기준` : "기본 환율 (수동 조정 가능)"}
          </span>
          <button
            onClick={fetchRate}
            disabled={loading}
            style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "rgba(255,255,255,0.2)", border: "none", color: "white", cursor: "pointer" }}
          >
            {loading ? "업데이트 중..." : "🔄 환율 갱신"}
          </button>
        </div>
      </div>

      {/* 환율 수동 조정 */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>환율 수동 조정 (인터넷 없을 때)</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>¥1 =</span>
          <input
            type="number"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
            step="0.01"
            style={{ flex: 1, padding: "8px 12px", borderRadius: 10, border: "1px solid var(--color-border)", fontSize: 16, fontWeight: 600, background: "#F7F6F3", color: "var(--color-text)" }}
          />
          <span style={{ fontSize: 14 }}>원</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 6 }}>
          💡 인터넷 없을 때 출발 전 환율을 여기에 입력해두세요
        </div>
      </div>

      {/* 계산기 */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {(["yenToWon", "wonToYen"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1px solid var(--color-border)", background: mode === m ? "var(--color-primary)" : "transparent", color: mode === m ? "white" : "var(--color-text-muted)", fontSize: 13, cursor: "pointer", fontWeight: mode === m ? 500 : 400 }}
            >
              {m === "yenToWon" ? "¥ 엔 → ₩ 원" : "₩ 원 → ¥ 엔"}
            </button>
          ))}
        </div>

        {mode === "yenToWon" ? (
          <div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 6 }}>엔화 입력 (¥)</div>
              <input
                type="number"
                value={yen}
                onChange={(e) => handleYenInput(e.target.value)}
                placeholder="엔화 금액 입력"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--color-border)", fontSize: 20, fontWeight: 600, background: "#F7F6F3", color: "var(--color-text)" }}
              />
            </div>
            <div style={{ textAlign: "center", fontSize: 20, color: "var(--color-text-muted)", marginBottom: 10 }}>↓</div>
            <div style={{ background: "var(--color-primary)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>한국 원화 (₩)</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "white" }}>
                {won ? `₩${won}` : "—"}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 6 }}>원화 입력 (₩)</div>
              <input
                type="number"
                value={won}
                onChange={(e) => handleWonInput(e.target.value)}
                placeholder="원화 금액 입력"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--color-border)", fontSize: 20, fontWeight: 600, background: "#F7F6F3", color: "var(--color-text)" }}
              />
            </div>
            <div style={{ textAlign: "center", fontSize: 20, color: "var(--color-text-muted)", marginBottom: 10 }}>↓</div>
            <div style={{ background: "var(--color-primary)", borderRadius: 12, padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>일본 엔화 (¥)</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "white" }}>
                {yen ? `¥${yen}` : "—"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 빠른 계산 버튼 */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>빠른 계산 (엔화)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setQuickYen(a)}
              style={{ padding: "8px 4px", borderRadius: 10, border: "1px solid var(--color-border)", background: "#F7F6F3", color: "var(--color-text)", fontSize: 13, cursor: "pointer", fontWeight: 500 }}
            >
              ¥{a >= 1000 ? `${a / 1000}천` : a}
            </button>
          ))}
        </div>
      </div>

      {/* 나고야 물가 가이드 */}
      <div className="card">
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>나고야 물가 참고표</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          {PRESETS.map((p, i) => (
            <div
              key={i}
              onClick={() => setQuickYen(p.yen)}
              style={{ background: "#F7F6F3", borderRadius: 10, padding: "10px 12px", cursor: "pointer", border: "1px solid var(--color-border)" }}
            >
              <div style={{ fontSize: 16, marginBottom: 4 }}>{p.emoji}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 2 }}>{p.label}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>¥{p.yen.toLocaleString()}</span>
                <span style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 500 }}>₩{calcWon(p.yen)}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--color-text-hint)", marginTop: 10, textAlign: "center" }}>
          항목 탭하면 계산기에 자동 입력돼요
        </div>
      </div>
    </div>
  );
}

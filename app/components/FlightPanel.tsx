"use client";

const flights = [
  {
    airline: "아시아나항공",
    code: "OZ",
    departure: "09:00",
    arrival: "11:25",
    duration: "2h 25m",
    price: "₩159,000~",
    badge: "직항",
    badgeColor: "badge-green",
  },
  {
    airline: "대한항공",
    code: "KE",
    departure: "12:40",
    arrival: "15:10",
    duration: "2h 30m",
    price: "₩172,000~",
    badge: "직항",
    badgeColor: "badge-green",
  },
  {
    airline: "에어서울",
    code: "RS",
    departure: "07:30",
    arrival: "09:50",
    duration: "2h 20m",
    price: "₩89,000~",
    badge: "최저가",
    badgeColor: "badge-red",
  },
];

const tips = [
  "출발 2~3개월 전 예매 시 최저가 확보 가능",
  "네이버 항공권 / 스카이스캐너로 가격 비교 추천",
  "NGO 도착 후 나고야역까지 뮤스카이 28분 (870엔)",
  "왕복 기준 성수기 25만원~, 비수기 15만원~",
];

export default function FlightPanel() {
  return (
    <div>
      {/* 통계 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
        {[
          { label: "비행시간", value: "2h 30m" },
          { label: "최저가", value: "₩89K~" },
          { label: "도착공항", value: "NGO" },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: "#F7F6F3",
              borderRadius: 12,
              padding: "14px 16px",
              border: "1px solid var(--color-border)",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)" }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* 항공편 목록 */}
      <div className="card">
        <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 14 }}>
          인천(ICN) → 나고야 중부국제공항(NGO)
        </div>
        {flights.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom: i < flights.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#F7F6F3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-muted)",
                flexShrink: 0,
              }}
            >
              {f.code}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{f.airline}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>
                {f.departure} → {f.arrival} · {f.duration}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)" }}>{f.price}</div>
              <span className={`badge ${f.badgeColor}`} style={{ marginTop: 4 }}>
                {f.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 예매 팁 */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>예매 꿀팁</div>
        {tips.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              fontSize: 13,
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: 6,
            }}
          >
            <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>•</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

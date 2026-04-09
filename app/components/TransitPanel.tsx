"use client";

const airportRoutes = [
  {
    name: "뮤스카이 (μ-SKY)",
    duration: "28분",
    price: "870엔",
    badge: "badge-red",
    badgeText: "최추천",
    desc: "짐 보관 좌석 있어 편리. 전용 특급열차",
  },
  {
    name: "메이테츠 일반 특급",
    duration: "35~40분",
    price: "580엔",
    badge: "badge-green",
    badgeText: "저렴",
    desc: "좌석 지정 불필요. 조금 느리지만 충분히 편리",
  },
  {
    name: "고속버스",
    duration: "60~90분",
    price: "1,200엔",
    badge: "badge-amber",
    badgeText: "참고",
    desc: "짐 많을 때 고려. 교통 체증 시 지연 가능",
  },
];

const cityTransit = [
  {
    emoji: "🚇",
    name: "나고야 지하철",
    badge: "badge-blue",
    badgeText: "메인",
    desc: "6개 노선으로 관광지 대부분 연결. 1회 210~330엔 / 1일 승차권 760엔",
  },
  {
    emoji: "🚃",
    name: "메이테츠 사철",
    badge: "badge-amber",
    badgeText: "광역",
    desc: "나가시마·이누야마 등 근교 이동 시 편리",
  },
  {
    emoji: "🚌",
    name: "나고야 시버스",
    badge: "badge-green",
    badgeText: "보조",
    desc: "지하철 미연결 구역 커버. 210~280엔. 1일권 지하철 공용",
  },
  {
    emoji: "🚲",
    name: "구루린 자전거",
    badge: "badge-green",
    badgeText: "관광",
    desc: "사카에~나고야역 구간 공유 자전거. 1시간 165엔. 앱 등록 필요",
  },
];

export default function TransitPanel() {
  return (
    <div>
      {/* 공항 → 시내 */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>✈️ 공항 → 나고야역</div>
        {airportRoutes.map((r, i) => (
          <div
            key={i}
            style={{
              padding: "12px 0",
              borderBottom: i < airportRoutes.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</span>
                <span className={`badge ${r.badge}`}>{r.badgeText}</span>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
                <span style={{ color: "var(--color-text-muted)" }}>⏱ {r.duration}</span>
                <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>{r.price}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{r.desc}</div>
          </div>
        ))}
      </div>

      {/* 시내 교통 */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>🗺️ 시내 교통 수단</div>
        {cityTransit.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 0",
              borderBottom: i < cityTransit.length - 1 ? "1px solid var(--color-border)" : "none",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontSize: 22, flexShrink: 0 }}>{t.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</span>
                <span className={`badge ${t.badge}`}>{t.badgeText}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* IC카드 */}
      <div
        style={{
          background: "#1A1A1A",
          borderRadius: 16,
          padding: "16px 20px",
          color: "white",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, opacity: 0.7 }}>💳 IC카드 팁</div>
        {["Suica / ICOCA / manaca 카드 모두 사용 가능", "공항 도착 직후 편의점에서 구입 후 충전", "현금보다 5~10엔 저렴 + 개찰구 빠르게 통과"].map(
          (t, i) => (
            <div key={i} style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.7, display: "flex", gap: 8 }}>
              <span style={{ opacity: 0.5 }}>•</span>
              {t}
            </div>
          )
        )}
      </div>
    </div>
  );
}

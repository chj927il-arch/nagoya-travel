"use client";

const hotels = [
  {
    name: "JR 게이트 타워 호텔",
    area: "나고야역 직결",
    type: "고급",
    price: "₩200,000~",
    stars: 5,
    badge: "badge-amber",
    badgeText: "프리미엄",
    tip: "나고야역 개찰구 바로 연결. 비 맞을 일 없음",
  },
  {
    name: "미쓰이 가든 호텔",
    area: "나고야역 도보 5분",
    type: "중급",
    price: "₩120,000~",
    stars: 4,
    badge: "badge-blue",
    badgeText: "추천",
    tip: "가성비 최상. 조식 포함 패키지 추천",
  },
  {
    name: "도요코인 나고야역",
    area: "나고야역 도보 3분",
    type: "비즈니스",
    price: "₩70,000~",
    stars: 3,
    badge: "badge-green",
    badgeText: "가성비",
    tip: "조식 무료. 체인 호텔이라 퀄리티 일정함",
  },
  {
    name: "힐튼 나고야",
    area: "사카에 (번화가 중심)",
    type: "고급",
    price: "₩180,000~",
    stars: 5,
    badge: "badge-amber",
    badgeText: "프리미엄",
    tip: "쇼핑·식당 도보 접근. 관광 거점으로 편리",
  },
  {
    name: "나가시마 온천 호텔",
    area: "나가시마 리조트 내",
    type: "온천",
    price: "₩150,000~",
    stars: 4,
    badge: "badge-red",
    badgeText: "온천형",
    tip: "스파랜드·아울렛 인접. 1박 2일 패키지 추천",
  },
];

const bookingTips = [
  "자란넷(じゃらん) / 야후트래블 일본 현지 사이트가 더 저렴할 수 있음",
  "체크인 시 여권 지참 필수",
  "나고야역 도보 10분 내 숙소가 접근성 최상",
  "성수기(벚꽃·단풍 시즌)는 2개월 전 예약 필수",
];

export default function HotelPanel() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {[
          { label: "예산형", value: "₩6~9만/박" },
          { label: "중급형", value: "₩12~20만/박" },
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
            <div style={{ fontSize: 18, fontWeight: 700 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>지역별 추천 숙소</div>
        {hotels.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "12px 0",
              borderBottom: i < hotels.length - 1 ? "1px solid var(--color-border)" : "none",
              gap: 12,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{h.name}</span>
                <span className={`badge ${h.badge}`}>{h.badgeText}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>📍 {h.area}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-hint)", marginTop: 4 }}>💡 {h.tip}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)" }}>{h.price}</div>
              <div style={{ fontSize: 11, color: "var(--color-text-hint)", marginTop: 2 }}>{"★".repeat(h.stars)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>예약 꿀팁</div>
        {bookingTips.map((t, i) => (
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

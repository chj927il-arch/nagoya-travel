"use client";

const spots = [
  {
    emoji: "🏯",
    name: "나고야 성",
    desc: "금빛 샤치호코로 유명한 나고야의 상징. 본마루 어전(本丸御殿) 복원 완료",
    how: "나고야역 → 지하철 메이조선 → 시야쿠쇼역 (10분)",
    badge: "필수",
    badgeColor: "badge-red",
    bg: "#FFF0EF",
  },
  {
    emoji: "⛩️",
    name: "아츠타 신궁",
    desc: "일본 3대 신궁 중 하나. 삼종신기 구사나기노츠루기 봉안",
    how: "나고야역 → 긴테츠 나고야선 → 진구니시역 (9분)",
    badge: "필수",
    badgeColor: "badge-red",
    bg: "#EDFAF4",
  },
  {
    emoji: "🔬",
    name: "노벨상 수상자 박물관",
    desc: "나고야 출신 수상자 전시. 과학 체험 인터랙티브 전시",
    how: "나고야역 → 히가시야마선 → 후시미역 (3분) + 도보 5분",
    badge: "추천",
    badgeColor: "badge-blue",
    bg: "#EFF4FF",
  },
  {
    emoji: "🎡",
    name: "나가시마 스파랜드",
    desc: "일본 유명 대형 놀이공원 + 온천. 롤러코스터 10종 이상",
    how: "나고야역 → 긴테츠선 → 긴죠부토역 → 셔틀버스 (40분)",
    badge: "당일치기",
    badgeColor: "badge-amber",
    bg: "#FFF8EC",
  },
  {
    emoji: "🐋",
    name: "나고야 항구 수족관",
    desc: "범고래·벨루가 공연. 일본 최대급 수족관",
    how: "나고야역 → 지하철 메이코선 → 나고야코역 (20분)",
    badge: "추천",
    badgeColor: "badge-blue",
    bg: "#EFF4FF",
  },
  {
    emoji: "🌸",
    name: "오스 상점가",
    desc: "빈티지 · 서브컬처 · 먹거리 골목. 젊은 여행자에게 인기",
    how: "나고야역 → 지하철 쓰루마이선 → 오스칸논역 (7분)",
    badge: "자유시간",
    badgeColor: "badge-green",
    bg: "#EDFAF4",
  },
];

export default function SpotsPanel() {
  return (
    <div>
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>주요 관광지 & 가는 법</div>
        {spots.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 0",
              borderBottom: i < spots.length - 1 ? "1px solid var(--color-border)" : "none",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {s.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</span>
                <span className={`badge ${s.badgeColor}`}>{s.badge}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.5, marginBottom: 4 }}>
                {s.desc}
              </div>
              <div style={{ fontSize: 12, color: "#2251CC", lineHeight: 1.5 }}>🚇 {s.how}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

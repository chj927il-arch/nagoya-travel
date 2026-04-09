"use client";

import { useState } from "react";

const categories = ["전체", "나고야 명물", "회전초밥", "디저트", "아침식사"];

const foods = [
  {
    name: "미소 카츠",
    nameJp: "味噌カツ",
    category: "나고야 명물",
    restaurant: "야바톤 본점 (矢場とん)",
    desc: "1947년 창업. 달콤한 핫초 된장 소스를 얹은 나고야식 돈카츠. 오스상점가 근처 위치.",
    price: "₩12,000~",
    rating: 4.2,
    reviewCount: "8,400+",
    hours: "11:00~21:00 (월요일 휴무)",
    access: "지하철 쓰루마이선 → 카미마에즈역 도보 5분",
    mapUrl: "https://maps.google.com/?q=矢場とん矢場町本店+名古屋",
    emoji: "🥩",
    bg: "#FFF0EF",
    badge: "필수",
    badgeColor: "#B83028",
    badgeBg: "#FFF0EF",
  },
  {
    name: "히츠마부시",
    nameJp: "ひつまぶし",
    category: "나고야 명물",
    restaurant: "아츠타 호라이켄 본점",
    desc: "장어 덮밥을 4등분해 3가지 방식으로 즐기는 나고야 대표 명물. 예약 권장.",
    price: "₩30,000~",
    rating: 4.4,
    reviewCount: "12,000+",
    hours: "11:30~14:00 / 17:00~21:00 (수요일 휴무)",
    access: "지하철 메이조선 → 진구니시역 도보 7분",
    mapUrl: "https://maps.google.com/?q=あつた蓬莱軒+神宮店+名古屋",
    emoji: "🍱",
    bg: "#FFF8EC",
    badge: "필수",
    badgeColor: "#B83028",
    badgeBg: "#FFF0EF",
  },
  {
    name: "미소 니코미 우동",
    nameJp: "味噌煮込みうどん",
    category: "나고야 명물",
    restaurant: "야마모토야 소혼케 (山本屋総本家)",
    desc: "1925년 창업 100년 전통. 아이치산 핫초 미소 국물에 끓인 나고야식 뚝배기 우동.",
    price: "₩10,000~",
    rating: 4.1,
    reviewCount: "5,200+",
    hours: "11:00~21:00",
    access: "지하철 히가시야마선 → 사카에역 도보 3분",
    mapUrl: "https://maps.google.com/?q=山本屋総本家+栄店+名古屋",
    emoji: "🍜",
    bg: "#EFF4FF",
    badge: "추천",
    badgeColor: "#2251CC",
    badgeBg: "#EFF4FF",
  },
  {
    name: "테바사키",
    nameJp: "手羽先",
    category: "나고야 명물",
    restaurant: "세카이노 야마짱 본점 (世界の山ちゃん)",
    desc: "테바사키 원조집. 특제 후추 양념의 중독성 있는 닭날개 튀김. 맥주와 환상 궁합.",
    price: "₩7,000~",
    rating: 4.0,
    reviewCount: "6,800+",
    hours: "17:00~24:00",
    access: "지하철 히가시야마선 → 사카에역 도보 5분",
    mapUrl: "https://maps.google.com/?q=世界の山ちゃん+本店+名古屋",
    emoji: "🍗",
    bg: "#EDFAF4",
    badge: "추천",
    badgeColor: "#1A7A4A",
    badgeBg: "#EDFAF4",
  },
  {
    name: "마제소바",
    nameJp: "まぜそば",
    category: "나고야 명물",
    restaurant: "HANAMICHI 신사카에점",
    desc: "나고야 5대 명물 중 하나. 국물 없는 비빔면에 호르몬 토핑. 현지인들 사이 인기 폭발.",
    price: "₩8,000~",
    rating: 4.3,
    reviewCount: "3,100+",
    hours: "11:00~22:00",
    access: "지하철 히가시야마선 → 신사카에역 도보 3분",
    mapUrl: "https://maps.google.com/?q=HANAMICHI+新栄店+名古屋",
    emoji: "🍝",
    bg: "#FFF0EF",
    badge: "로컬 핫플",
    badgeColor: "#9A5B0A",
    badgeBg: "#FFF8EC",
  },
  {
    name: "회전초밥",
    nameJp: "回転寿司",
    category: "회전초밥",
    restaurant: "니기리노토쿠베 (にぎりの徳兵衛) 오아시스21점",
    desc: "오아시스21 지하 위치. 현지인·관광객 모두 인정하는 가성비 맛집. 한국어 태블릿 지원.",
    price: "₩10,000~",
    rating: 4.2,
    reviewCount: "4,500+",
    hours: "11:00~22:00",
    access: "지하철 메이조선 → 사카에역 도보 3분 (오아시스21 지하)",
    mapUrl: "https://maps.google.com/?q=にぎりの徳兵衛+オアシス21店+名古屋",
    emoji: "🍣",
    bg: "#EFF4FF",
    badge: "가성비",
    badgeColor: "#2251CC",
    badgeBg: "#EFF4FF",
  },
  {
    name: "코메다 커피 모닝",
    nameJp: "コメダ珈琲 モーニング",
    category: "아침식사",
    restaurant: "코메다 커피 (コメダ珈琲店)",
    desc: "나고야 발상 카페 체인. 오전 11시까지 커피 한 잔 주문하면 토스트+달걀 무료!",
    price: "₩4,000~",
    rating: 4.1,
    reviewCount: "전국 체인",
    hours: "07:00~23:00",
    access: "나고야 시내 어디서든 도보 10분 내 위치",
    mapUrl: "https://maps.google.com/?q=コメダ珈琲+名古屋",
    emoji: "☕",
    bg: "#FFF8EC",
    badge: "아침 필수",
    badgeColor: "#9A5B0A",
    badgeBg: "#FFF8EC",
  },
  {
    name: "하브스 케이크",
    nameJp: "ハーブス",
    category: "디저트",
    restaurant: "하브스 사카에 본점 (HARBS)",
    desc: "나고야 발상 케이크 카페. 크레이프 케이크와 생과일 케이크가 명물. 항상 웨이팅 있음.",
    price: "₩8,000~",
    rating: 4.5,
    reviewCount: "9,200+",
    hours: "11:00~20:00",
    access: "지하철 히가시야마선 → 사카에역 도보 2분",
    mapUrl: "https://maps.google.com/?q=HARBS+栄店+名古屋",
    emoji: "🍰",
    bg: "#FBEAF0",
    badge: "디저트 1위",
    badgeColor: "#993556",
    badgeBg: "#FBEAF0",
  },
  {
    name: "안카케 스파게티",
    nameJp: "あんかけスパ",
    category: "나고야 명물",
    restaurant: "요코이 본점 (ヨコイ)",
    desc: "걸쭉하고 스파이시한 나고야식 이탈리안. 다른 지역에서는 맛볼 수 없는 독특한 로컬 음식.",
    price: "₩9,000~",
    rating: 4.0,
    reviewCount: "2,800+",
    hours: "11:00~14:30 / 17:00~20:30 (일요일 휴무)",
    access: "지하철 히가시야마선 → 후시미역 도보 5분",
    mapUrl: "https://maps.google.com/?q=ヨコイ+名古屋+あんかけスパ",
    emoji: "🍝",
    bg: "#FFF0EF",
    badge: "나고야 한정",
    badgeColor: "#B83028",
    badgeBg: "#FFF0EF",
  },
  {
    name: "텐무스",
    nameJp: "天むす",
    category: "아침식사",
    restaurant: "센쥬 본점 (千寿)",
    desc: "새우튀김이 들어간 나고야식 주먹밥. 고시히카리 쌀 사용. 도시락으로도 인기.",
    price: "₩6,000~",
    rating: 4.3,
    reviewCount: "3,400+",
    hours: "09:00~18:00 (재고 소진 시 조기 마감)",
    access: "지하철 히가시야마선 → 후시미역 도보 7분",
    mapUrl: "https://maps.google.com/?q=天むす千寿+名古屋",
    emoji: "🍙",
    bg: "#EDFAF4",
    badge: "현지 명물",
    badgeColor: "#1A7A4A",
    badgeBg: "#EDFAF4",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#BA7517", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "☆" : ""}
      <span style={{ color: "var(--color-text-muted)", marginLeft: 4, fontSize: 12 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export default function FoodPanel() {
  const [selected, setSelected] = useState("전체");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = selected === "전체" ? foods : foods.filter((f) => f.category === selected);

  return (
    <div>
      {/* 헤더 */}
      <div
        style={{
          background: "var(--color-primary)",
          borderRadius: 16,
          padding: "16px 20px",
          marginBottom: 12,
          color: "white",
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>나고야 메시 (名古屋めし)</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>현지인 추천 맛집 {foods.length}선</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>구글 리뷰 · 위치 · 가는 법 포함</div>
      </div>

      {/* 카테고리 필터 */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid var(--color-border)",
              background: selected === c ? "var(--color-primary)" : "transparent",
              color: selected === c ? "white" : "var(--color-text-muted)",
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: selected === c ? 500 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 맛집 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((f, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* 기본 정보 */}
            <div
              style={{ padding: "14px 16px", cursor: "pointer" }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: f.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {f.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</span>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: f.badgeBg,
                        color: f.badgeColor,
                        fontWeight: 500,
                      }}
                    >
                      {f.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>
                    {f.nameJp} · {f.restaurant}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StarRating rating={f.rating} />
                    <span style={{ fontSize: 11, color: "var(--color-text-hint)" }}>({f.reviewCount})</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-primary)", marginLeft: "auto" }}>
                      {f.price}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: 16, color: "var(--color-text-hint)" }}>
                  {expanded === i ? "▲" : "▼"}
                </div>
              </div>
            </div>

            {/* 상세 정보 (펼치기) */}
            {expanded === i && (
              <div
                style={{
                  borderTop: "1px solid var(--color-border)",
                  padding: "14px 16px",
                  background: "#F7F6F3",
                }}
              >
                <div style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.6, marginBottom: 12 }}>
                  {f.desc}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                    <span style={{ color: "var(--color-text-muted)", width: 24, flexShrink: 0 }}>🕐</span>
                    <span>{f.hours}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
                    <span style={{ color: "var(--color-text-muted)", width: 24, flexShrink: 0 }}>🚇</span>
                    <span>{f.access}</span>
                  </div>
                </div>

                <a
                  href={f.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    marginTop: 14,
                    padding: "10px",
                    borderRadius: 10,
                    background: "var(--color-primary)",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  📍 구글 지도에서 보기
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

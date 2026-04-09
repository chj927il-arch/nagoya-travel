"use client";

const foods = [
  {
    name: "미소 카츠",
    nameJp: "味噌カツ",
    desc: "달콤한 핫초 된장 소스를 얹은 나고야식 돈카츠",
    restaurant: "야바톤 본점",
    price: "₩12,000~",
    emoji: "🥩",
    bg: "#FFF0EF",
  },
  {
    name: "히츠마부시",
    nameJp: "ひつまぶし",
    desc: "장어 덮밥을 3가지 방식으로 즐기는 나고야 명물",
    restaurant: "아츠타 호라이켄",
    price: "₩30,000~",
    emoji: "🍱",
    bg: "#FFF8EC",
  },
  {
    name: "미소 니코미 우동",
    nameJp: "味噌煮込みうどん",
    desc: "진한 된장 국물로 끓인 나고야식 우동. 뚝배기에 서빙",
    restaurant: "야마모토야 본점",
    price: "₩10,000~",
    emoji: "🍜",
    bg: "#EFF4FF",
  },
  {
    name: "테바사키",
    nameJp: "手羽先",
    desc: "달콤 짭짤한 양념의 나고야식 닭날개 튀김",
    restaurant: "후라이보 / 세카이노야마짱",
    price: "₩7,000~",
    emoji: "🍗",
    bg: "#EDFAF4",
  },
  {
    name: "모닝 세트",
    nameJp: "モーニング",
    desc: "커피 한 잔에 토스트+달걀 무료! 나고야 특유의 카페 아침 문화",
    restaurant: "코메다 커피",
    price: "₩3,000~",
    emoji: "☕",
    bg: "#FFF8EC",
  },
  {
    name: "안카케 스파게티",
    nameJp: "あんかけスパ",
    desc: "걸쭉하고 스파이시한 나고야식 이탈리안. 독특한 로컬 음식",
    restaurant: "요코이 본점",
    price: "₩10,000~",
    emoji: "🍝",
    bg: "#FFF0EF",
  },
];

export default function FoodPanel() {
  return (
    <div>
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
        <div style={{ fontSize: 16, fontWeight: 700 }}>나고야에서만 먹을 수 있는 필수 음식 6가지</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {foods.map((f, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: f.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              {f.emoji}
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{f.name}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-hint)", marginBottom: 4 }}>{f.nameJp}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.5, marginBottom: 8 }}>
              {f.desc}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "var(--color-text-hint)" }}>{f.restaurant}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-primary)" }}>{f.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

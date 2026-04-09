"use client";
import { useState } from "react";

const categories = ["전체", "나고야역 근처", "사카에 지구", "가성비", "고급", "온천/리조트"];

const hotels = [
  { name: "JR 게이트 타워 호텔", nameEn: "JR Gate Tower Hotel", category: "나고야역 근처", grade: "고급", rating: 4.6, reviews: "8,200+", price: "₩200,000~", access: "나고야역 개찰구 직결 (비 맞을 일 없음)", area: "나고야역", desc: "JR 나고야역 타워 내 위치. 고층에서 나고야 시내 전경 감상. 레스토랑·스파 시설 완비.", mapUrl: "https://maps.google.com/?q=JRゲートタワーホテル+名古屋", emoji: "🏨", bg: "#FFF8EC", badge: "역 직결", tip: "체크인 시 나고야역 전망 룸 요청 추천. 조식 뷔페 퀄리티 최상" },
  { name: "나고야 메리어트 어소시아 호텔", nameEn: "Nagoya Marriott Associa", category: "나고야역 근처", grade: "고급", rating: 4.5, reviews: "7,600+", price: "₩250,000~", access: "나고야역 직결 (JR 타카시마야 내)", area: "나고야역", desc: "JR 나고야역 타카시마야 위 52층 고층 호텔. 나고야 최고의 뷰 자랑. 인피니티 바 인기.", mapUrl: "https://maps.google.com/?q=名古屋マリオットアソシアホテル", emoji: "🌟", bg: "#FFF8EC", badge: "최고급", tip: "39층 인피니티 풀 바에서 야경 감상 강추. 비회원도 입장 가능" },
  { name: "힐튼 나고야", nameEn: "Hilton Nagoya", category: "사카에 지구", grade: "고급", rating: 4.4, reviews: "6,800+", price: "₩180,000~", access: "지하철 사카에역 도보 5분", area: "사카에", desc: "사카에 번화가 중심. 쇼핑·식당 도보 접근. 비즈니스 여행객에게 특히 인기. 수영장 보유.", mapUrl: "https://maps.google.com/?q=ヒルトン名古屋", emoji: "🏨", bg: "#E6F1FB", badge: "번화가 최고", tip: "사카에 쇼핑 후 귀가 편리. 스파 시설 이용 추천" },
  { name: "미쓰이 가든 호텔 나고야 프리미어", nameEn: "Mitsui Garden Hotel Nagoya Premier", category: "나고야역 근처", grade: "중급", rating: 4.3, reviews: "5,400+", price: "₩130,000~", access: "나고야역 도보 5분", area: "나고야역", desc: "나고야역 가까운 중급 호텔. 가성비 우수. 객실 청결도 높음. 조식 포함 패키지 인기.", mapUrl: "https://maps.google.com/?q=三井ガーデンホテル名古屋プレミア", emoji: "🏩", bg: "#EDFAF4", badge: "가성비 추천", tip: "조식 포함 패키지가 가격 대비 최상. 2개월 전 예약 시 할인율 높음" },
  { name: "도요코인 나고야역 신칸센 출구", nameEn: "Toyoko Inn Nagoya", category: "가성비", grade: "비즈니스", rating: 4.0, reviews: "9,200+", price: "₩65,000~", access: "나고야역 도보 3분", area: "나고야역", desc: "일본 전국 체인 비즈니스 호텔. 조식 무료. 일정한 품질 보장. 나고야 주변에 여러 지점 운영.", mapUrl: "https://maps.google.com/?q=東横INN名古屋駅新幹線口", emoji: "🏢", bg: "#F7F6F3", badge: "가성비", tip: "조식 무료가 최대 장점. 체크인 후 주변 음식점 다녀오기도 편리" },
  { name: "APA 호텔 나고야역 타워", nameEn: "APA Hotel Nagoya", category: "가성비", grade: "비즈니스", rating: 3.9, reviews: "7,400+", price: "₩55,000~", access: "나고야역 도보 5분", area: "나고야역", desc: "일본 대형 체인 비즈니스 호텔. 나고야역 인근 여러 지점. 조식 별도 700엔. 무료 Wi-Fi.", mapUrl: "https://maps.google.com/?q=アパホテル名古屋駅タワー", emoji: "🏢", bg: "#F7F6F3", badge: "저렴", tip: "나고야역 근처 중 가장 저렴한 편. 객실 다소 좁음" },
  { name: "나가시마 리조트 호텔 하나 유라쿠", nameEn: "Nagashima Resort", category: "온천/리조트", grade: "리조트", rating: 4.3, reviews: "4,800+", price: "₩160,000~", access: "긴테츠 나고야선 → 긴조부토역 → 셔틀버스 10분", area: "나가시마", desc: "나가시마 스파랜드·아울렛 내 위치. 천연온천 보유. 놀이공원 패키지 상품 인기.", mapUrl: "https://maps.google.com/?q=ナガシマリゾート+ホテル", emoji: "♨️", bg: "#FFF0EF", badge: "온천+놀이공원", tip: "스파랜드+온천 1박 패키지 구매 시 할인. 가족 여행객에게 최적" },
  { name: "후지타 캔코 호텔", nameEn: "Fujita Kanko Hotel", category: "사카에 지구", grade: "중급", rating: 4.1, reviews: "3,600+", price: "₩110,000~", access: "지하철 사카에역 도보 3분", area: "사카에", desc: "사카에 지구 중심. 오아시스21·TV타워 도보권. 비즈니스·관광 모두 편리.", mapUrl: "https://maps.google.com/?q=フジタカンコーホテル名古屋", emoji: "🏨", bg: "#E6F1FB", badge: "위치 최상", tip: "사카에 지구 쇼핑·관광에 최적 위치. 체크인 시 상층부 객실 요청 추천" },
  { name: "컴포트 호텔 나고야 나야바시", nameEn: "Comfort Hotel Nagoya", category: "가성비", grade: "비즈니스", rating: 4.0, reviews: "5,100+", price: "₩60,000~", access: "지하철 메이조선 → 야바마치역 도보 3분", area: "나야바시", desc: "나야바시 지구 비즈니스 호텔. 조식 무료. 나고야역·사카에역 중간 위치. 접근성 좋음.", mapUrl: "https://maps.google.com/?q=コンフォートホテル名古屋伏見", emoji: "🏢", bg: "#F7F6F3", badge: "조식 무료", tip: "두 지역 접근성 모두 좋아 관광에 편리. 조기 예약 시 저렴" },
  { name: "호텔 그레이서리 나고야", nameEn: "Hotel Gracery Nagoya", category: "나고야역 근처", grade: "중급", rating: 4.2, reviews: "4,300+", price: "₩100,000~", access: "나고야역 도보 8분", area: "나고야역", desc: "고질라 호텔로 유명한 그레이서리 체인. 나고야역 근처. 도쿄 신주쿠 그레이서리 계열.", mapUrl: "https://maps.google.com/?q=ホテルグレイスリー名古屋", emoji: "🦖", bg: "#EDFAF4", badge: "개성 있는", tip: "고질라 굿즈 판매. 개성 있는 호텔 인테리어" },
  { name: "칸데오 호텔 나고야 사카에", nameEn: "Candeo Hotels Nagoya Sakae", category: "사카에 지구", grade: "중급", rating: 4.4, reviews: "5,800+", price: "₩120,000~", access: "지하철 사카에역 도보 5분", area: "사카에", desc: "루프탑 오픈 에어 온천 보유. 사카에 중심 위치. 노천탕에서 나고야 야경 감상 가능.", mapUrl: "https://maps.google.com/?q=カンデオホテルズ名古屋栄", emoji: "♨️", bg: "#E6F1FB", badge: "루프탑 온천", tip: "옥상 노천탕에서 나고야 야경 감상이 최고 매력. 저녁 늦게 입욕 권장" },
  { name: "더 비사이드 나고야", nameEn: "The B Side Nagoya", category: "사카에 지구", grade: "중급", rating: 4.1, reviews: "2,900+", price: "₩95,000~", access: "지하철 히가시야마선 → 후시미역 도보 5분", area: "후시미", desc: "현대적 디자인 부티크 호텔. 후시미 지구 위치. 바·카페 운영. 젊은 여행자에게 인기.", mapUrl: "https://maps.google.com/?q=ザ・ビー名古屋", emoji: "🏨", bg: "#FBEAF0", badge: "디자인 호텔", tip: "1층 바에서 칵테일 한 잔 추천. 사카에역까지 도보 10분" },
  { name: "호텔 인디고 나고야", nameEn: "Hotel Indigo Nagoya", category: "나고야역 근처", grade: "고급", rating: 4.3, reviews: "3,200+", price: "₩170,000~", access: "나고야역 도보 10분", area: "나고야역", desc: "IHG 계열 부티크 럭셔리 호텔. 나고야 문화를 테마로 한 디자인. 레스토랑 퀄리티 높음.", mapUrl: "https://maps.google.com/?q=ホテルインディゴ名古屋", emoji: "✨", bg: "#FFF8EC", badge: "럭셔리 부티크", tip: "나고야 전통 공예를 테마로 한 인테리어가 독특" },
  { name: "나고야 맨션 호텔", nameEn: "Nagoya Mansion Hotel", category: "가성비", grade: "비즈니스", rating: 3.8, reviews: "2,100+", price: "₩45,000~", access: "나고야역 도보 12분", area: "나고야역", desc: "나고야에서 가장 저렴한 옵션 중 하나. 기본적인 시설. 배낭여행자에게 적합.", mapUrl: "https://maps.google.com/?q=名古屋マンションホテル", emoji: "🏢", bg: "#F7F6F3", badge: "최저가", tip: "숙소보다 여행에 투자하고 싶은 분들에게 추천" },
  { name: "스마일 호텔 나고야 사카에", nameEn: "Smile Hotel Nagoya Sakae", category: "가성비", grade: "비즈니스", rating: 3.9, reviews: "3,800+", price: "₩58,000~", access: "지하철 사카에역 도보 5분", area: "사카에", desc: "사카에 지구 가성비 호텔. 조식 포함 상품 인기. 관광 접근성 우수.", mapUrl: "https://maps.google.com/?q=スマイルホテル名古屋栄", emoji: "😊", bg: "#F7F6F3", badge: "사카에 가성비", tip: "사카에 지구에서 가성비 최고 옵션. 관광과 쇼핑 모두 편리" },
  { name: "나고야 캐슬 호텔", nameEn: "Nagoya Castle Hotel", category: "나고야역 근처", grade: "중급", rating: 4.0, reviews: "2,400+", price: "₩88,000~", access: "지하철 메이조선 → 시야쿠쇼역 도보 5분 (나고야 성 인근)", area: "나고야 성 근처", desc: "나고야 성과 가장 가까운 호텔. 성 전망 객실 인기. 일식 레스토랑 운영.", mapUrl: "https://maps.google.com/?q=名古屋キャッスルホテル", emoji: "🏯", bg: "#FFF8EC", badge: "성 전망", tip: "나고야 성 전망 객실은 미리 요청 필수. 성 야간 라이트업 뷰 최고" },
  { name: "오아시스21 인근 호텔 비스타 프리모", nameEn: "Hotel Vista Premio Nagoya", category: "사카에 지구", grade: "중급", rating: 4.1, reviews: "3,100+", price: "₩92,000~", access: "지하철 히가시야마선 → 사카에역 도보 3분", area: "사카에", desc: "사카에 역 근처 중급 호텔. 오아시스21·TV타워 도보 5분. 조용하고 청결한 객실.", mapUrl: "https://maps.google.com/?q=ホテルビスタプレミオ名古屋", emoji: "🏨", bg: "#E6F1FB", badge: "조용한 위치", tip: "주변 소음 없이 조용하게 쉬기 좋음" },
  { name: "몽테르 쿠시몽 나고야", nameEn: "Montele Cusimon Nagoya", category: "가성비", grade: "비즈니스", rating: 3.9, reviews: "1,800+", price: "₩52,000~", access: "나고야역 도보 15분 / 지하철 히가시야마선 → 카메지마역 도보 5분", area: "카메지마", desc: "나고야역 서쪽 비즈니스 호텔. 조식 포함. 노리타케 숲 도보권.", mapUrl: "https://maps.google.com/?q=モンテレクシモン名古屋", emoji: "🏢", bg: "#F7F6F3", badge: "조식 포함", tip: "노리타케 숲 방문 시 편리한 위치" },
  { name: "다이와 로이넷 호텔 나고야 사카에", nameEn: "Daiwa Roynet Nagoya Sakae", category: "사카에 지구", grade: "중급", rating: 4.0, reviews: "3,500+", price: "₩78,000~", access: "지하철 히가시야마선 → 사카에역 도보 5분", area: "사카에", desc: "사카에 지구 표준 비즈니스 호텔. 로이넷 체인으로 일정한 품질 보장. 무료 Wi-Fi.", mapUrl: "https://maps.google.com/?q=ダイワロイネットホテル名古屋栄", emoji: "🏨", bg: "#E6F1FB", badge: "안정적 품질", tip: "2개월 전 예약 시 40% 할인 가능" },
  { name: "R&B 호텔 나고야 에키마에", nameEn: "R&B Hotel Nagoya Ekimae", category: "나고야역 근처", grade: "비즈니스", rating: 4.0, reviews: "4,100+", price: "₩70,000~", access: "나고야역 도보 5분", area: "나고야역", desc: "나고야역 근처 비즈니스 호텔. 조식 무료. 룸이 다소 좁지만 위치 대비 가격 합리적.", mapUrl: "https://maps.google.com/?q=R&Bホテル名古屋駅前", emoji: "🏢", bg: "#F7F6F3", badge: "조식 무료", tip: "나고야역 접근성 최고이면서 가격 합리적. 출장자에게 인기" },
  { name: "호텔 루트인 나고야 이와쿠라", nameEn: "Hotel Route Inn Nagoya", category: "가성비", grade: "비즈니스", rating: 3.8, reviews: "2,700+", price: "₩55,000~", access: "메이테츠 이와쿠라선 → 이와쿠라역 도보 5분 (나고야역에서 약 20분)", area: "이와쿠라", desc: "나고야 근교 비즈니스 호텔. 천연온천 대욕장 보유. 조식 포함. 나고야역보다 저렴.", mapUrl: "https://maps.google.com/?q=ホテルルートイン名古屋岩倉", emoji: "♨️", bg: "#F7F6F3", badge: "온천 포함", tip: "나고야 시내보다 저렴하게 온천 즐길 수 있는 옵션" },
  { name: "코트야드 바이 메리어트 나고야", nameEn: "Courtyard by Marriott Nagoya", category: "나고야역 근처", grade: "중급", rating: 4.2, reviews: "3,900+", price: "₩140,000~", access: "나고야역 도보 7분", area: "나고야역", desc: "메리어트 중급 브랜드. 나고야역 근처. 레스토랑·피트니스·비즈니스 시설 완비.", mapUrl: "https://maps.google.com/?q=コートヤードバイマリオット名古屋", emoji: "🏨", bg: "#FFF8EC", badge: "비즈니스 최적", tip: "메리어트 포인트 적립 가능. 출장자에게 특히 인기" },
  { name: "호텔 나고야 가든 팰리스", nameEn: "Hotel Nagoya Garden Palace", category: "나고야역 근처", grade: "중급", rating: 4.1, reviews: "2,600+", price: "₩98,000~", access: "나고야역 도보 10분", area: "나고야역", desc: "나고야 성·노리타케 숲 중간 위치. 일식·양식 레스토랑 운영. 가족 여행에 적합한 넉넉한 객실.", mapUrl: "https://maps.google.com/?q=ホテル名古屋ガーデンパレス", emoji: "🌸", bg: "#FFF0EF", badge: "가족 여행", tip: "가족 여행 시 넉넉한 방 크기가 장점. 온천 시설도 운영" },
  { name: "하얏트 리젠시 나고야", nameEn: "Hyatt Regency Nagoya", category: "나고야역 근처", grade: "고급", rating: 4.4, reviews: "4,700+", price: "₩220,000~", access: "나고야역 도보 5분 (메이에키 지구)", area: "나고야역", desc: "메이에키 지구 럭셔리 호텔. 고층 전망 레스토랑·수영장·스파 보유. 비즈니스 여행객 선호.", mapUrl: "https://maps.google.com/?q=ハイアットリージェンシー名古屋", emoji: "👑", bg: "#FFF8EC", badge: "5성급", tip: "수영장·스파 이용 목적으로도 방문하는 현지인 많음" },
  { name: "솔라리아 니시테쓰 호텔 나고야", nameEn: "Solaria Nishitetsu Hotel Nagoya", category: "사카에 지구", grade: "중급", rating: 4.0, reviews: "2,200+", price: "₩85,000~", access: "지하철 사카에역 도보 3분", area: "사카에", desc: "사카에 역 근처 깔끔한 중급 호텔. 규슈 체인 호텔로 친절한 서비스 정평.", mapUrl: "https://maps.google.com/?q=ソラリア西鉄ホテル名古屋", emoji: "🏨", bg: "#E6F1FB", badge: "친절한 서비스", tip: "사카에역 도보 3분이라 관광·쇼핑에 최적" },
  { name: "나고야 후지타 호텔 (구 힐튼)", nameEn: "Nagoya Fujita Hotel", category: "나고야역 근처", grade: "고급", rating: 4.1, reviews: "3,100+", price: "₩150,000~", access: "나고야역 도보 8분", area: "나고야역", desc: "나고야 老鋪 고급 호텔. 일본식·서양식 레스토랑 다수. 전통 있는 서비스.", mapUrl: "https://maps.google.com/?q=名古屋フジタホテル", emoji: "🏨", bg: "#FFF8EC", badge: "전통 고급", tip: "수십 년 전통의 나고야 대표 고급 호텔. 연회·결혼식장으로도 유명" },
  { name: "호텔 몬테 에르모사 나고야", nameEn: "Hotel Monte Hermoso Nagoya", category: "사카에 지구", grade: "중급", rating: 4.0, reviews: "1,900+", price: "₩82,000~", access: "지하철 히가시야마선 → 후시미역 도보 5분", area: "후시미", desc: "스페인풍 인테리어 부티크 호텔. 사카에역·후시미역 중간. 레스토랑 수준 높음.", mapUrl: "https://maps.google.com/?q=ホテルモンテエルモサ名古屋", emoji: "🏨", bg: "#FBEAF0", badge: "유럽풍", tip: "스페인 요리 레스토랑이 맛집으로 소문남" },
  { name: "도미인 프리미엄 나고야 사카에", nameEn: "Dormy Inn Premium Nagoya Sakae", category: "사카에 지구", grade: "중급", rating: 4.3, reviews: "6,200+", price: "₩105,000~", access: "지하철 히가시야마선 → 사카에역 도보 5분", area: "사카에", desc: "도미인 체인. 천연온천 대욕장 보유. 조식 뷔페 맛으로 유명. 야식 라멘 서비스 인기.", mapUrl: "https://maps.google.com/?q=ドーミーインPREMIUM名古屋栄", emoji: "♨️", bg: "#E6F1FB", badge: "야식 라멘 서비스", tip: "밤 21:30~23:00 무료 라멘 서비스가 최대 인기. 천연온천도 보유" },
  { name: "오릭스 호텔 & 리조트 나고야", nameEn: "ORIX Hotel Nagoya", category: "나고야역 근처", grade: "중급", rating: 4.1, reviews: "2,400+", price: "₩95,000~", access: "나고야역 도보 8분", area: "나고야역", desc: "오릭스 그룹 운영 중급 호텔. 나고야역 서쪽 위치. 조용한 분위기.", mapUrl: "https://maps.google.com/?q=オリックスホテル名古屋", emoji: "🏨", bg: "#F7F6F3", badge: "조용한 환경", tip: "비즈니스 출장자에게 안정적인 선택지" },
  { name: "호텔 JAL 시티 나고야 나야바시", nameEn: "Hotel JAL City Nagoya", category: "사카에 지구", grade: "중급", rating: 4.2, reviews: "3,600+", price: "₩108,000~", access: "지하철 메이조선 → 야바마치역 도보 3분", area: "나야바시", desc: "JAL 호텔 체인. 나야바시 지구 위치. 사카에·나고야역 중간으로 접근성 우수. 조식 뷔페 호평.", mapUrl: "https://maps.google.com/?q=ホテルJALシティ名古屋矢場町", emoji: "✈️", bg: "#E6F1FB", badge: "교통 편리", tip: "나고야 전역 접근성이 가장 좋은 위치 중 하나" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#BA7517", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      <span style={{ color: "var(--color-text-muted)", marginLeft: 4, fontSize: 12 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default function HotelPanel() {
  const [selected, setSelected] = useState("전체");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = selected === "전체" ? hotels : hotels.filter((h) => h.category === selected);

  return (
    <div>
      <div style={{ background: "var(--color-primary)", borderRadius: 16, padding: "16px 20px", marginBottom: 12, color: "white" }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>나고야 숙소 가이드</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>추천 숙소 {hotels.length}선</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>구글 리뷰 · 위치 · 가는 법 · 예약 팁 포함</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
        {[{ label: "가성비형", value: "₩5~8만/박" }, { label: "중급형", value: "₩9~15만/박" }, { label: "고급형", value: "₩16~25만/박" }, { label: "최고급", value: "₩25만+/박" }].map((m) => (
          <div key={m.label} style={{ background: "#F7F6F3", borderRadius: 12, padding: "12px 14px", border: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setSelected(c)} style={{ padding: "6px 14px", borderRadius: 999, border: "1px solid var(--color-border)", background: selected === c ? "var(--color-primary)" : "transparent", color: selected === c ? "white" : "var(--color-text-muted)", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontWeight: selected === c ? 500 : 400 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((h, i) => (
          <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: h.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{h.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{h.name}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#EFF4FF", color: "#2251CC", fontWeight: 500 }}>{h.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>📍 {h.area} · {h.grade}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StarRating rating={h.rating} />
                    <span style={{ fontSize: 11, color: "var(--color-text-hint)" }}>({h.reviews})</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-primary)", marginLeft: "auto" }}>{h.price}</span>
                  </div>
                </div>
                <div style={{ fontSize: 16, color: "var(--color-text-hint)" }}>{expanded === i ? "▲" : "▼"}</div>
              </div>
            </div>
            {expanded === i && (
              <div style={{ borderTop: "1px solid var(--color-border)", padding: "14px 16px", background: "#F7F6F3" }}>
                <div style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.6, marginBottom: 12 }}>{h.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>🚇</span><span>{h.access}</span></div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>💡</span><span style={{ color: "#2251CC" }}>{h.tip}</span></div>
                </div>
                <a href={h.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", borderRadius: 10, background: "var(--color-primary)", color: "white", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
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

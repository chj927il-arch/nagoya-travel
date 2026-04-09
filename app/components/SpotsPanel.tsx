"use client";
import { useState } from "react";

const categories = ["전체", "역사/문화", "자연/공원", "쇼핑/번화가", "테마파크", "박물관", "근교"];

const spots = [
  { name: "나고야 성", nameJp: "名古屋城", category: "역사/문화", rating: 4.3, reviews: "28,000+", fee: "500엔", hours: "09:00~16:30 (월요일 휴무)", access: "지하철 메이조선 → 시야쿠쇼역 7번 출구 도보 5분", desc: "1610년 도쿠가와 이에야스가 축성. 금빛 샤치호코가 유명. 혼마루 어전 복원 완료.", mapUrl: "https://maps.google.com/?q=名古屋城", emoji: "🏯", bg: "#FFF0EF", badge: "필수", tip: "벚꽃 시즌(3월 말~4월 초) 방문 강추! 야간 라이트업도 운영" },
  { name: "아츠타 신궁", nameJp: "熱田神宮", category: "역사/문화", rating: 4.4, reviews: "32,000+", fee: "무료", hours: "24시간 개방 (본전 참배 05:00~19:00)", access: "긴테츠 나고야선 → 진구니시역 도보 3분 / 지하철 메이조선 → 진구니시역", desc: "일본 3대 신궁 중 하나. 약 1,900년 역사. 삼종신기 중 구사나기노츠루기 봉안. 울창한 숲이 장관.", mapUrl: "https://maps.google.com/?q=熱田神宮+名古屋", emoji: "⛩️", bg: "#EDFAF4", badge: "필수", tip: "이른 아침 방문 시 조용한 분위기 만끽 가능. 명물 '미소 돈카츠 도시락' 경내 식당에서 판매" },
  { name: "오아시스 21", nameJp: "オアシス21", category: "쇼핑/번화가", rating: 4.3, reviews: "18,000+", fee: "무료 (일부 유료)", hours: "10:00~21:00", access: "지하철 히가시야마선·메이조선 → 사카에역 바로 연결", desc: "유리 지붕에 물이 채워진 '물의 우주선' 구조물이 인상적. 지하에 버스 터미널, 상점가 약 30개 입점.", mapUrl: "https://maps.google.com/?q=オアシス21+名古屋", emoji: "🛸", bg: "#EFF4FF", badge: "포토스팟", tip: "야경이 특히 아름다움. 저녁 방문 추천. 바로 옆 TV타워와 함께 구경" },
  { name: "나고야 항구 수족관", nameJp: "名古屋港水族館", category: "테마파크", rating: 4.3, reviews: "14,000+", fee: "2,030엔 (어른)", hours: "09:30~17:30 (월요일 휴무)", access: "지하철 메이코선 → 나고야코역 3번 출구 도보 5분", desc: "일본 최대급 수조 보유. 범고래·벨루가·이루카 쇼 유명. 약 500종 5만여 마리 해양생물 전시.", mapUrl: "https://maps.google.com/?q=名古屋港水族館", emoji: "🐋", bg: "#E6F1FB", badge: "가족 추천", tip: "돌고래 쇼는 사전 예약 불필요. 도착 즉시 공연 시간 확인 후 이동 권장" },
  { name: "히가시야마 동식물원", nameJp: "東山動植物園", category: "자연/공원", rating: 4.2, reviews: "12,000+", fee: "500엔 (어른)", hours: "09:00~16:50 (월요일 휴무)", access: "지하철 히가시야마선 → 히가시야마코엔역 3번 출구 도보 3분", desc: "1937년 개원. 아시아 최대급 동물원 중 하나. 코알라·코끼리·기린 등 보유. 식물원도 함께 운영.", mapUrl: "https://maps.google.com/?q=東山動植物園+名古屋", emoji: "🐨", bg: "#EDFAF4", badge: "가족 추천", tip: "코알라 관람은 오전이 활동적. 스카이타워 전망대와 세트 관람 추천" },
  { name: "오스 상점가", nameJp: "大須商店街", category: "쇼핑/번화가", rating: 4.2, reviews: "9,500+", fee: "무료", hours: "매장마다 상이 (대부분 10:00~20:00)", access: "지하철 쓰루마이선 → 오스칸논역 2번 출구 도보 2분", desc: "1,200개 이상 상점 밀집. 빈티지·서브컬처·먹거리 천국. 젊은 여행자에게 인기. 오스칸논 절과 인접.", mapUrl: "https://maps.google.com/?q=大須商店街+名古屋", emoji: "🛍️", bg: "#FFF8EC", badge: "쇼핑", tip: "일요일 오후 이벤트 광장에서 각종 퍼포먼스 공연. 타코야키·크레페 등 길거리 음식 풍성" },
  { name: "나고야 시 과학관", nameJp: "名古屋市科学館", category: "박물관", rating: 4.3, reviews: "7,200+", fee: "800엔 (어른)", hours: "09:30~17:00 (월요일 휴무)", access: "지하철 히가시야마선·쓰루마이선 → 후시미역 5번 출구 도보 5분", desc: "세계 최대급 플라네타리움 보유. 영하 30도 오로라 체험실, 높이 9m 인공 회오리 등 체험형 전시.", mapUrl: "https://maps.google.com/?q=名古屋市科学館", emoji: "🔭", bg: "#EDFAF4", badge: "추천", tip: "플라네타리움은 사전 예약 필수. 한국어 안내 있음" },
  { name: "도쿠가와엔", nameJp: "徳川園", category: "자연/공원", rating: 4.2, reviews: "5,800+", fee: "300엔 (어른)", hours: "09:30~17:30 (월요일 휴무)", access: "시버스 → 도쿠가와엔 신카와하시 하차 / 지하철 메이조선 → 오조네역 도보 20분", desc: "에도 시대 다이묘 정원 양식. 중앙 연못 중심으로 폭포·다리·다실 배치. 단풍 명소로도 유명.", mapUrl: "https://maps.google.com/?q=徳川園+名古屋", emoji: "🌿", bg: "#EDFAF4", badge: "힐링", tip: "가을 단풍(11월)이 특히 아름다움. 바로 옆 도쿠가와 미술관과 함께 방문 추천" },
  { name: "MIRAI TOWER (TV타워)", nameJp: "中部電力 MIRAIタワー", category: "박물관", rating: 4.1, reviews: "6,300+", fee: "700엔 (전망대)", hours: "10:00~21:00", access: "지하철 히가시야마선·메이조선 → 사카에역 도보 5분", desc: "1954년 건설 일본 최초 집약 전파탑. 국가 등록 유형문화재. 전망대에서 나고야 전경 감상 가능.", mapUrl: "https://maps.google.com/?q=中部電力MIRAIタワー+名古屋", emoji: "🗼", bg: "#E6F1FB", badge: "야경 명소", tip: "야간 라이트업이 아름다움. 오아시스21과 함께 사진 촬영 포인트" },
  { name: "나고야 성 킨샤치 요코초", nameJp: "金シャチ横丁", category: "역사/문화", rating: 4.0, reviews: "4,100+", fee: "무료 (음식·입장료 별도)", hours: "10:00~21:00", access: "지하철 메이조선 → 시야쿠쇼역 도보 5분 (나고야 성 정문 바로 앞)", desc: "2018년 오픈 나고야 명물 먹거리 거리. 미소 카츠·히츠마부시·테바사키 등 나고야 메시 총집합.", mapUrl: "https://maps.google.com/?q=金シャチ横丁+名古屋", emoji: "🍢", bg: "#FFF8EC", badge: "먹거리", tip: "나고야 성 입장 전후 들리기 좋음. 점심 시간대 혼잡" },
  { name: "리니어 철도관", nameJp: "リニア・鉄道館", category: "박물관", rating: 4.4, reviews: "8,900+", fee: "1,000엔 (어른)", hours: "10:00~17:30 (화요일 휴무)", access: "아오나미선 → 킨조후토역 도보 2분 (나고야역에서 아오나미선 약 24분)", desc: "JR 센트럴 운영. 신칸센·증기기관차 등 40여 대 전시. 운전 시뮬레이터 체험 인기.", mapUrl: "https://maps.google.com/?q=リニア鉄道館+名古屋", emoji: "🚄", bg: "#E6F1FB", badge: "철도 마니아", tip: "시뮬레이터는 당일 추첨제. 개관 직후 바로 신청 필요" },
  { name: "도쿠가와 미술관", nameJp: "徳川美術館", category: "박물관", rating: 4.2, reviews: "3,700+", fee: "1,400엔 (어른)", hours: "10:00~17:00 (월요일 휴무)", access: "시버스 → 도쿠가와엔 신카와하시 하차", desc: "오와리 도쿠가와 가문 소장품 전시. 국보 겐지모노가타리 두루마리 그림 보유. 도쿠가와엔과 인접.", mapUrl: "https://maps.google.com/?q=徳川美術館+名古屋", emoji: "🎨", bg: "#FBEAF0", badge: "문화", tip: "겐지모노가타리 두루마리 그림은 특별전 때만 공개" },
  { name: "노리타케 숲", nameJp: "ノリタケの森", category: "박물관", rating: 4.1, reviews: "4,500+", fee: "무료 (박물관 500엔)", hours: "10:00~17:00 (월요일 휴무)", access: "JR·지하철 나고야역 도보 15분 / 시버스 노리타케 혼야마초 하차", desc: "세계적 도자기 브랜드 노리타케 발상지. 제조 공정 견학 가능. 레스토랑·쇼룸·공원 등 복합 시설.", mapUrl: "https://maps.google.com/?q=ノリタケの森+名古屋", emoji: "🏺", bg: "#FFF8EC", badge: "쇼핑+문화", tip: "도자기 페인팅 체험 프로그램 운영 (사전 예약 권장)" },
  { name: "레고랜드 재팬", nameJp: "レゴランドジャパン", category: "테마파크", rating: 3.9, reviews: "11,000+", fee: "4,800엔~ (어른)", hours: "10:00~17:00 (계절마다 상이)", access: "아오나미선 → 킨조후토역 도보 5분", desc: "아시아 두 번째 레고랜드. 40개 이상 놀이기구·쇼. 일본 명소를 레고로 재현한 미니랜드 인기.", mapUrl: "https://maps.google.com/?q=レゴランドジャパン+名古屋", emoji: "🧱", bg: "#FFF0EF", badge: "가족 추천", tip: "7세 이하 어린이 동반 가족에게 특히 추천. 사전 온라인 예매 시 할인" },
  { name: "나고야 항구 이탈리아 마을", nameJp: "イタリア村", category: "쇼핑/번화가", rating: 3.8, reviews: "2,100+", fee: "무료", hours: "11:00~21:00", access: "지하철 메이코선 → 나고야코역 1번 출구 도보 5분", desc: "이탈리아 거리를 재현한 복합 상업시설. 레스토랑·카페·잡화점. 나고야항 앞 위치로 전망 좋음.", mapUrl: "https://maps.google.com/?q=名古屋港イタリア村", emoji: "🇮🇹", bg: "#E6F1FB", badge: "데이트", tip: "수족관 방문 후 함께 들리기 좋음" },
  { name: "히사야오도리 공원", nameJp: "久屋大通公園", category: "자연/공원", rating: 4.1, reviews: "5,200+", fee: "무료", hours: "24시간", access: "지하철 메이조선 → 히사야오도리역 직결", desc: "2020년 리뉴얼. 공원과 각종 상점 40개 입점. TV타워·오아시스21과 연결. 도심 속 휴식 공간.", mapUrl: "https://maps.google.com/?q=久屋大通公園+名古屋", emoji: "🌳", bg: "#EDFAF4", badge: "산책", tip: "주말 오후 각종 이벤트·마켓 개최" },
  { name: "나고야 보스턴 미술관", nameJp: "名古屋ボストン美術館", category: "박물관", rating: 4.0, reviews: "2,800+", fee: "전시마다 상이", hours: "10:00~17:00 (월요일 휴무)", access: "지하철 메이조선 → 카나야마역 도보 1분", desc: "미국 보스턴 미술관과 제휴. 서양화·인상파·일본 미술 등 다양한 기획전 개최.", mapUrl: "https://maps.google.com/?q=名古屋ボストン美術館", emoji: "🖼️", bg: "#FBEAF0", badge: "예술", tip: "기획전시 위주라 방문 전 현재 전시 내용 확인 필수" },
  { name: "쓰루마 공원", nameJp: "鶴舞公園", category: "자연/공원", rating: 4.1, reviews: "4,600+", fee: "무료", hours: "24시간", access: "JR 쓰루마이선·지하철 쓰루마이선 → 쓰루마이역 도보 3분", desc: "'벚꽃 명소 100선' 선정. 봄 750그루 벚꽃 장관. 장미원·일본 정원·분수 광장 등 볼거리 풍부.", mapUrl: "https://maps.google.com/?q=鶴舞公園+名古屋", emoji: "🌸", bg: "#FBEAF0", badge: "벚꽃 명소", tip: "4월 초 벚꽃 시즌에 수만 명 방문. 돗자리 피크닉 추천" },
  { name: "오스칸논", nameJp: "大須観音", category: "역사/문화", rating: 4.1, reviews: "6,100+", fee: "무료", hours: "06:00~19:00", access: "지하철 쓰루마이선 → 오스칸논역 2번 출구 도보 5분", desc: "일본 3대 관음 중 하나. 1612년 창건. 거대 붉은 종이등 포토스팟. 근처 오스 상점가와 연계.", mapUrl: "https://maps.google.com/?q=大須観音+名古屋", emoji: "🏛️", bg: "#FFF8EC", badge: "역사", tip: "매달 18·28일 골동품 시장 개최. 비둘기 먹이주기 체험 가능" },
  { name: "나고야 시청", nameJp: "名古屋市政資料館", category: "박물관", rating: 4.2, reviews: "2,300+", fee: "무료", hours: "09:00~17:00 (월요일 휴무)", access: "지하철 메이조선 → 시야쿠쇼역 7번 출구 도보 8분", desc: "1922년 건축 네오바로크 양식 건물. 나고야시 유형문화재. 내부 견학 가능. 드라마 촬영지로도 유명.", mapUrl: "https://maps.google.com/?q=名古屋市市政資料館", emoji: "🏛️", bg: "#E6F1FB", badge: "건축 명소", tip: "웨딩 포토 촬영지로도 인기. 무료 입장이라 부담 없이 방문 가능" },
  { name: "도요타 산업기술 기념관", nameJp: "トヨタ産業技術記念館", category: "박물관", rating: 4.3, reviews: "5,600+", fee: "500엔 (어른)", hours: "09:30~17:00 (월요일 휴무)", access: "나고야역 도보 15분 / 지하철 히가시야마선 → 카메지마역 도보 10분", desc: "도요타 자동차 발상지. 섬유기계에서 자동차로의 변천사 전시. 자동차 조립 라인 실연 인기.", mapUrl: "https://maps.google.com/?q=トヨタ産業技術記念館+名古屋", emoji: "🚗", bg: "#E6F1FB", badge: "산업 역사", tip: "자동차 조립 실연은 하루 수회 개최. 시간 미리 확인 필요" },
  { name: "나바나노 사토", nameJp: "なばなの里", category: "자연/공원", rating: 4.5, reviews: "16,000+", fee: "2,500엔 (입장+금화 500엔 포함)", hours: "10:00~21:00 (계절마다 상이)", access: "긴테츠 나고야역 → 나가시마역 하차 도보 10분 (나고야역에서 약 30분)", badge: "일루미네이션 명소", desc: "일본 최대 규모 일루미네이션. 10월~5월 운영. 봄 튤립·수선화 등 꽃 축제도 유명.", mapUrl: "https://maps.google.com/?q=なばなの里+長島", emoji: "🌷", bg: "#FBEAF0", tip: "겨울 일루미네이션(12~2월)이 특히 유명. 저녁 방문 권장" },
  { name: "이누야마 성", nameJp: "犬山城", category: "역사/문화", rating: 4.5, reviews: "14,000+", fee: "550엔 (어른)", hours: "09:00~17:00", access: "메이테츠 이누야마선 → 이누야마유엔역 도보 15분 (나고야역에서 약 30분)", desc: "국보 지정 일본 현존 최고(最古) 목조 천수각 중 하나. 기소강 절경 배경. 성하마을 산책 인기.", mapUrl: "https://maps.google.com/?q=犬山城", emoji: "🏯", bg: "#FFF8EC", badge: "국보", tip: "나고야 근교 당일치기 코스로 인기. 이누야마 성하마을에서 미소 소프트아이스크림 필수" },
  { name: "시라카와고", nameJp: "白川郷", category: "근교", rating: 4.7, reviews: "22,000+", fee: "무료 (주차비 별도)", hours: "24시간 (관광안내소 08:30~17:00)", access: "나고야역 → 고속버스 약 2시간 (편도 3,500엔~)", desc: "유네스코 세계유산. 갓쇼즈쿠리 합장 조형 민가 마을. 겨울 설경이 절경. 일본 전통 농촌 문화 체험.", mapUrl: "https://maps.google.com/?q=白川郷", emoji: "🏔️", bg: "#E6F1FB", badge: "세계유산", tip: "겨울 야간 라이트업(1~2월)은 셔틀버스 사전 예약 필수. 1박 숙박 강력 추천" },
  { name: "나가시마 스파랜드", nameJp: "ナガシマスパーランド", category: "테마파크", rating: 4.2, reviews: "18,000+", fee: "5,600엔 (어른 1일)", hours: "10:00~17:00 (계절마다 상이)", access: "긴테츠 나고야선 → 긴조부토역 → 셔틀버스 10분 (나고야역에서 약 40분)", desc: "일본 유명 대형 놀이공원. 롤러코스터 10종 이상. 바로 옆 나가시마 아울렛·온천도 함께 즐길 수 있음.", mapUrl: "https://maps.google.com/?q=ナガシマスパーランド", emoji: "🎢", bg: "#FFF0EF", badge: "놀이공원", tip: "패키지 티켓(스파랜드+온천) 구매 시 할인. 평일 방문 시 대기 줄 짧음" },
  { name: "메이지무라", nameJp: "明治村", category: "근교", rating: 4.4, reviews: "7,800+", fee: "2,000엔 (어른)", hours: "09:30~17:00 (계절마다 상이)", access: "메이테츠 이누야마선 → 이누야마역 → 버스 20분", desc: "메이지 시대 건축물 67채 이축 보존. 제국호텔·교도소·학교 등 역사 건물 체험. 드라마 촬영지.", mapUrl: "https://maps.google.com/?q=博物館明治村+犬山", emoji: "🏛️", bg: "#FFF8EC", badge: "근교 추천", tip: "면적이 넓어 반나절~하루 소요. 레트로 의상 대여 서비스 인기" },
  { name: "히다 고쿠분지", nameJp: "飛騨古川", category: "근교", rating: 4.3, reviews: "5,100+", fee: "무료", hours: "상시 개방", access: "나고야역 → 히다 특급열차 약 2시간 (4,340엔~)", desc: "흰 벽 창고·고이 연못으로 유명한 고성 마을. 히다 다카야마보다 덜 알려져 한적하게 관광 가능.", mapUrl: "https://maps.google.com/?q=飛騨古川", emoji: "🐟", bg: "#EDFAF4", badge: "숨은 명소", tip: "새벽 물안개 피는 시간대 방문이 가장 아름다움" },
  { name: "나고야 항구 다이아몬드릴리 크루즈", nameJp: "名古屋港クルーズ", category: "자연/공원", rating: 4.0, reviews: "1,800+", fee: "1,700엔 (어른)", hours: "11:00~16:00 (화요일 휴무)", access: "지하철 메이코선 → 나고야코역 도보 5분", desc: "나고야항 유람선 크루즈. 수족관·항구 이탈리아 마을 근처. 약 40분 코스.", mapUrl: "https://maps.google.com/?q=名古屋港クルーズ", emoji: "🚢", bg: "#E6F1FB", badge: "이색 체험", tip: "날씨 좋은 날 야경 크루즈도 운영" },
  { name: "사카에 지구", nameJp: "栄地区", category: "쇼핑/번화가", rating: 4.2, reviews: "9,800+", fee: "무료", hours: "매장마다 상이", access: "지하철 히가시야마선·메이조선 → 사카에역", desc: "나고야 최대 번화가. 고급 백화점·패션 브랜드·레스토랑·클럽 밀집. 오아시스21·TV타워와 인접.", mapUrl: "https://maps.google.com/?q=栄+名古屋", emoji: "🌆", bg: "#E6F1FB", badge: "쇼핑", tip: "저녁 야경이 특히 아름다움. 마쓰자카야·미쓰코시 백화점 지하 식품관 강추" },
  { name: "나고야 항구 水族館 야외 공연장", nameJp: "名古屋港 野外ステージ", category: "자연/공원", rating: 4.0, reviews: "1,200+", fee: "무료", hours: "계절마다 상이", access: "지하철 메이코선 → 나고야코역 도보 3분", desc: "나고야항 앞 야외 공간. 여름 불꽃놀이 축제 개최. 가족 소풍 명소.", mapUrl: "https://maps.google.com/?q=名古屋港+公園", emoji: "🎆", bg: "#FFF0EF", badge: "이벤트", tip: "7~8월 여름 축제 기간에 대규모 불꽃놀이 개최" },
  { name: "도요타 박물관", nameJp: "トヨタ博物館", category: "박물관", rating: 4.3, reviews: "4,200+", fee: "1,200엔 (어른)", hours: "09:30~17:00 (월요일 휴무)", access: "리니모 → 게이다이도리역 도보 3분 (나고야역에서 약 40분)", desc: "도요타 자동차 역사와 세계 자동차 문화 전시. 약 140대 클래식카 전시. 자동차 마니아 성지.", mapUrl: "https://maps.google.com/?q=トヨタ博物館+長久手", emoji: "🏎️", bg: "#E6F1FB", badge: "자동차 마니아", tip: "지브리 파크 근처에 위치해 함께 방문 코스로 인기" },
  { name: "지브리 파크", nameJp: "ジブリパーク", category: "테마파크", rating: 4.6, reviews: "19,000+", fee: "2,500엔~ (구역별 별도)", hours: "10:00~17:00 (화요일 휴무)", access: "리니모 → 아이치큐하쿠키넨코엔역 도보 5분 (나고야역에서 약 40분)", desc: "스튜디오 지브리 세계관 재현 테마파크. 토토로·하울의 움직이는 성 등. 2022년 개원. 사전 예약 필수.", mapUrl: "https://maps.google.com/?q=ジブリパーク+長久手", emoji: "🌳", bg: "#EDFAF4", badge: "지브리 팬 필수", tip: "입장권 온라인 사전 예약 필수! 당일 구매 불가. 인기 구역은 몇 달 전부터 매진" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#BA7517", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      <span style={{ color: "var(--color-text-muted)", marginLeft: 4, fontSize: 12 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default function SpotsPanel() {
  const [selected, setSelected] = useState("전체");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = selected === "전체" ? spots : spots.filter((s) => s.category === selected);

  return (
    <div>
      <div style={{ background: "var(--color-primary)", borderRadius: 16, padding: "16px 20px", marginBottom: 12, color: "white" }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>나고야 관광지 가이드</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>추천 관광지 {spots.length}선</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>구글 리뷰 · 위치 · 가는 법 · 입장료 포함</div>
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setSelected(c)} style={{ padding: "6px 14px", borderRadius: 999, border: "1px solid var(--color-border)", background: selected === c ? "var(--color-primary)" : "transparent", color: selected === c ? "white" : "var(--color-text-muted)", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontWeight: selected === c ? 500 : 400 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((s, i) => (
          <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#FFF0EF", color: "#B83028", fontWeight: 500 }}>{s.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>{s.nameJp} · {s.category}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StarRating rating={s.rating} />
                    <span style={{ fontSize: 11, color: "var(--color-text-hint)" }}>({s.reviews})</span>
                    <span style={{ fontSize: 12, color: "var(--color-text-muted)", marginLeft: "auto" }}>입장료 {s.fee}</span>
                  </div>
                </div>
                <div style={{ fontSize: 16, color: "var(--color-text-hint)" }}>{expanded === i ? "▲" : "▼"}</div>
              </div>
            </div>
            {expanded === i && (
              <div style={{ borderTop: "1px solid var(--color-border)", padding: "14px 16px", background: "#F7F6F3" }}>
                <div style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>🕐</span><span>{s.hours}</span></div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>🚇</span><span>{s.access}</span></div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>💡</span><span style={{ color: "#2251CC" }}>{s.tip}</span></div>
                </div>
                <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", borderRadius: 10, background: "var(--color-primary)", color: "white", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
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

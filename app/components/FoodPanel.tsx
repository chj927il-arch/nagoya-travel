"use client";
import { useState } from "react";

const categories = ["전체", "나고야 명물", "장어", "이자카야/술집", "라멘/우동", "회전초밥", "디저트/카페", "아침식사"];

const foods = [
  { name: "미소 카츠", nameJp: "味噌カツ", category: "나고야 명물", restaurant: "야바톤 본점 (矢場とん)", rating: 4.2, reviews: "8,400+", price: "₩12,000~", hours: "11:00~21:00 (월요일 휴무)", access: "지하철 쓰루마이선 → 카미마에즈역 도보 5분", desc: "1947년 창업. 달콤한 핫초 된장 소스를 직원이 직접 뿌려주는 퍼포먼스도 유명. 오스상점가 근처.", mapUrl: "https://maps.google.com/?q=矢場とん矢場町本店+名古屋", emoji: "🥩", bg: "#FFF0EF", badge: "필수", tip: "점심시간 줄 필김. 오픈 직후나 14시 이후 방문 추천" },
  { name: "히츠마부시", nameJp: "ひつまぶし", category: "장어", restaurant: "아츠타 호라이켄 본점", rating: 4.4, reviews: "12,000+", price: "₩30,000~", hours: "11:30~14:00 / 17:00~21:00 (수요일 휴무)", access: "긴테츠 나고야선 → 진구니시역 도보 7분", desc: "나고야 3대 히츠마부시 맛집. 장어덮밥을 4등분해 그대로·양념·오차즈케 3가지 방식으로 즐김.", mapUrl: "https://maps.google.com/?q=あつた蓬莱軒+神宮店+名古屋", emoji: "🍱", bg: "#FFF8EC", badge: "필수", tip: "웨이팅 1~2시간 기본. 예약 가능하니 사전 예약 강력 추천" },
  { name: "히츠마부시 (마루야 혼텐)", nameJp: "ひつまぶし丸屋本店", category: "장어", restaurant: "마루야 혼텐 (丸屋本店)", rating: 4.3, reviews: "7,200+", price: "₩28,000~", hours: "11:00~14:00 / 17:00~20:30", access: "지하철 메이조선 → 진구니시역 도보 5분", desc: "나고야 3대 히츠마부시 중 하나. 나고야 공항 지점도 있어 귀국 전 방문 가능.", mapUrl: "https://maps.google.com/?q=丸屋本店+名古屋", emoji: "🐟", bg: "#FFF8EC", badge: "3대 히츠마부시", tip: "공항 지점은 여행 마지막 날 들르기 편리" },
  { name: "히츠마부시 하나오카", nameJp: "ひつまぶし花岡", category: "장어", restaurant: "하나오카 (花岡)", rating: 4.5, reviews: "5,600+", price: "₩32,000~", hours: "11:30~14:00 / 17:00~21:00 (화요일 휴무)", access: "지하철 히가시야마선 → 사카에역 도보 5분", desc: "연예인 사인이 가득한 나고야 인기 장어집. 웨이팅 2시간도 기본. 그만큼 맛 보장.", mapUrl: "https://maps.google.com/?q=ひつまぶし花岡+名古屋", emoji: "🎌", bg: "#FFF8EC", badge: "인기 폭발", tip: "오픈 전 줄 서기 필수. 평일 오전 방문 추천" },
  { name: "미소 니코미 우동", nameJp: "味噌煮込みうどん", category: "라멘/우동", restaurant: "야마모토야 소혼케 (山本屋総本家)", rating: 4.1, reviews: "5,200+", price: "₩10,000~", hours: "11:00~21:00", access: "지하철 히가시야마선 → 사카에역 도보 3분", desc: "1925년 창업 100년 전통. 핫초 미소 국물에 끓인 뚝배기 우동. 쫄깃한 면이 국물을 흡수.", mapUrl: "https://maps.google.com/?q=山本屋総本家+栄店+名古屋", emoji: "🍜", bg: "#EFF4FF", badge: "100년 전통", tip: "뚝배기 뚜껑을 접시로 사용하는 게 정식 방법" },
  { name: "테바사키 (야마짱)", nameJp: "手羽先 山ちゃん", category: "이자카야/술집", restaurant: "세카이노 야마짱 본점 (世界の山ちゃん)", rating: 4.0, reviews: "6,800+", price: "₩7,000~", hours: "17:00~24:00", access: "지하철 히가시야마선 → 사카에역 도보 5분", desc: "테바사키 원조집. 특제 후추·비밀 양념의 중독성 있는 닭날개 튀김. 맥주와 환상의 궁합.", mapUrl: "https://maps.google.com/?q=世界の山ちゃん+本店+名古屋", emoji: "🍗", bg: "#EDFAF4", badge: "테바사키 원조", tip: "1인 1음료 주문 필수. 구글맵 예약 가능" },
  { name: "테바사키 (후라이보)", nameJp: "手羽先 風来坊", category: "이자카야/술집", restaurant: "후라이보 본점 (風来坊)", rating: 4.0, reviews: "4,300+", price: "₩7,000~", hours: "17:00~23:00", access: "지하철 히가시야마선 → 사카에역 도보 7분", desc: "야마짱과 쌍벽을 이루는 테바사키 맛집. 간장 베이스 소스가 특징. 나고야 시내 여러 지점.", mapUrl: "https://maps.google.com/?q=風来坊+名古屋", emoji: "🍗", bg: "#EDFAF4", badge: "테바사키 양대산맥", tip: "야마짱과 비교해서 먹어보는 것도 재미있음" },
  { name: "마제소바", nameJp: "まぜそば", category: "라멘/우동", restaurant: "HANAMICHI 신사카에점", rating: 4.3, reviews: "3,100+", price: "₩8,000~", hours: "11:00~22:00", access: "지하철 히가시야마선 → 신사카에역 도보 3분", desc: "나고야 5대 명물 중 하나. 국물 없는 비빔면에 호르몬 토핑. 로컬 인기 1위.", mapUrl: "https://maps.google.com/?q=HANAMICHI+新栄店+名古屋", emoji: "🍝", bg: "#FFF0EF", badge: "로컬 핫플", tip: "면 추가(카에다마) 무료인 경우 많음. 꼭 확인" },
  { name: "나고야 카라멘", nameJp: "名古屋からめん", category: "라멘/우동", restaurant: "샤치린 (鯱りん)", rating: 4.0, reviews: "2,400+", price: "₩8,000~", hours: "11:00~21:00", access: "지하철 히가시야마선 → 사카에역 도보 5분", desc: "마늘·후추 풍미 강한 나고야식 매운 라멘. 티켓 자판기 구매 후 입장하는 일본식 시스템.", mapUrl: "https://maps.google.com/?q=鯱りん+名古屋", emoji: "🌶️", bg: "#FFF0EF", badge: "매운 라멘", tip: "매운 단계 선택 가능. 처음엔 보통 맛 추천" },
  { name: "회전초밥 (니기리노토쿠베)", nameJp: "にぎりの徳兵衛", category: "회전초밥", restaurant: "니기리노토쿠베 오아시스21점", rating: 4.2, reviews: "4,500+", price: "₩10,000~", hours: "11:00~22:00", access: "지하철 메이조선 → 사카에역 도보 3분 (오아시스21 지하)", desc: "현지인·관광객 모두 인정하는 가성비 회전초밥. 한국어 태블릿 지원. 오아시스21 지하 위치.", mapUrl: "https://maps.google.com/?q=にぎりの徳兵衛+オアシス21店+名古屋", emoji: "🍣", bg: "#EFF4FF", badge: "가성비", tip: "점심 시간대 웨이팅 있음. 키오스크에서 대기표 발급 후 쇼핑" },
  { name: "코메다 커피 모닝", nameJp: "コメダ珈琲モーニング", category: "아침식사", restaurant: "코메다 커피 (コメダ珈琲店)", rating: 4.1, reviews: "전국 체인", price: "₩4,000~", hours: "07:00~23:00", access: "나고야 시내 어디서든 도보 10분 내 위치", desc: "나고야 발상 카페 체인. 오전 11시까지 커피 주문하면 토스트+달걀 무료! 나고야 모닝 문화 대표.", mapUrl: "https://maps.google.com/?q=コメダ珈琲+名古屋", emoji: "☕", bg: "#FFF8EC", badge: "아침 필수", tip: "오구라(팥) 토스트가 나고야 명물. 꼭 주문해볼 것" },
  { name: "오구라 토스트 (카토 커피)", nameJp: "小倉トースト", category: "아침식사", restaurant: "카토 커피 (加藤珈琲店)", rating: 4.3, reviews: "3,800+", price: "₩4,000~", hours: "07:30~18:00", access: "지하철 히가시야마선 → 사카에역 도보 5분", desc: "두툼한 식빵에 팥(오구라)을 올린 나고야 명물 토스트. 현지인도 40분 웨이팅하는 인기 카페.", mapUrl: "https://maps.google.com/?q=加藤珈琲店+名古屋", emoji: "🍞", bg: "#FFF8EC", badge: "현지인 웨이팅", tip: "모닝 시간대(07:30~11:00)에 가장 붐빔. 평일 오전 방문 추천" },
  { name: "안카케 스파게티", nameJp: "あんかけスパ", category: "나고야 명물", restaurant: "요코이 본점 (ヨコイ)", rating: 4.0, reviews: "2,800+", price: "₩9,000~", hours: "11:00~14:30 / 17:00~20:30 (일요일 휴무)", access: "지하철 히가시야마선 → 후시미역 도보 5분", desc: "걸쭉하고 스파이시한 나고야식 이탈리안. 나고야 한정 음식. 미라네제·칸트리 등 다양한 종류.", mapUrl: "https://maps.google.com/?q=ヨコイ+名古屋+あんかけスパ", emoji: "🍝", bg: "#FFF0EF", badge: "나고야 한정", tip: "나고야에서만 맛볼 수 있는 독특한 스파게티. 꼭 경험해볼 것" },
  { name: "텐무스 주먹밥", nameJp: "天むす", category: "나고야 명물", restaurant: "센쥬 본점 (千寿)", rating: 4.3, reviews: "3,400+", price: "₩6,000~", hours: "09:00~18:00 (재고 소진 시 마감)", access: "지하철 히가시야마선 → 후시미역 도보 7분", desc: "새우튀김 주먹밥. 고시히카리 쌀 사용. 도시락으로도 인기. 나고야 토산품으로도 유명.", mapUrl: "https://maps.google.com/?q=天むす千寿+名古屋", emoji: "🍙", bg: "#EDFAF4", badge: "현지 명물", tip: "오전에 가지 않으면 품절될 수 있음. 기념품으로도 좋음" },
  { name: "하브스 케이크", nameJp: "HARBS", category: "디저트/카페", restaurant: "하브스 사카에 본점 (HARBS)", rating: 4.5, reviews: "9,200+", price: "₩8,000~", hours: "11:00~20:00", access: "지하철 히가시야마선 → 사카에역 도보 2분", desc: "나고야 발상 케이크 카페. 크레이프 케이크와 생과일 케이크가 명물. 항상 웨이팅 있음.", mapUrl: "https://maps.google.com/?q=HARBS+栄店+名古屋", emoji: "🍰", bg: "#FBEAF0", badge: "디저트 1위", tip: "밀 크레이프가 시그니처. 매장 오픈 직후 방문 추천" },
  { name: "나고야 코친 오야코동", nameJp: "名古屋コーチン親子丼", category: "나고야 명물", restaurant: "산와 나고야역점 (三和)", rating: 4.2, reviews: "3,100+", price: "₩12,000~", hours: "11:00~21:00", access: "나고야역 도보 5분", desc: "나고야 특산 닭 '나고야 코친' 사용한 고급 오야코동. 달걀이 반숙으로 올라가 진한 맛.", mapUrl: "https://maps.google.com/?q=名古屋コーチン親子丼+名古屋駅", emoji: "🥚", bg: "#FFF8EC", badge: "나고야 코친", tip: "나고야 코친은 일반 닭보다 가격 높지만 맛의 차이 확실함" },
  { name: "키시멘", nameJp: "きしめん", category: "라멘/우동", restaurant: "요시다 키시멘 나고야역점", rating: 4.0, reviews: "2,600+", price: "₩7,000~", hours: "07:00~22:00", access: "나고야역 신칸센 개찰구 내 위치", desc: "나고야 명물 납작 우동. 나고야역 신칸센 플랫폼 내에도 가게 있어 이동 중 간편하게 먹기 좋음.", mapUrl: "https://maps.google.com/?q=吉田のきしめん+名古屋駅", emoji: "🍝", bg: "#EFF4FF", badge: "나고야역 명물", tip: "신칸센 탑승 전 플랫폼 내 가게에서 서서 먹는 것도 경험" },
  { name: "도테니코미", nameJp: "どて煮", category: "이자카야/술집", restaurant: "카와마치야 본점 (川まちや)", rating: 4.1, reviews: "1,900+", price: "₩8,000~", hours: "17:00~23:00 (일요일 휴무)", access: "지하철 메이조선 → 야바마치역 도보 3분", desc: "소 내장·힘줄을 된장으로 졸인 나고야식 찜요리. 술안주로 최고. 나고야 현지 이자카야 문화 체험.", mapUrl: "https://maps.google.com/?q=どて煮+名古屋+川まちや", emoji: "🍢", bg: "#FFF0EF", badge: "현지 이자카야", tip: "맥주·사케와 최고의 궁합. 현지인들이 자주 찾는 맛" },
  { name: "에비후라이", nameJp: "えびふらい", category: "나고야 명물", restaurant: "긴지로 (きんじろう)", rating: 4.1, reviews: "2,100+", price: "₩14,000~", hours: "11:30~14:00 / 17:30~21:00", access: "지하철 히가시야마선 → 사카에역 도보 5분", desc: "나고야는 새우튀김(에비후라이)의 고향. 엄청난 크기의 새우튀김으로 유명. 정식 세트 추천.", mapUrl: "https://maps.google.com/?q=きんじろう+名古屋+えびふらい", emoji: "🦐", bg: "#FFF8EC", badge: "에비후라이 성지", tip: "나고야 사람들이 에비후라이에 자부심이 있음. 꼭 한번 먹어볼 것" },
  { name: "미소 오뎅", nameJp: "味噌おでん", category: "이자카야/술집", restaurant: "야마토야 혼텐 (大和屋本店)", rating: 4.0, reviews: "1,700+", price: "₩6,000~", hours: "11:00~21:00", access: "지하철 히가시야마선 → 사카에역 도보 8분", desc: "나고야식 된장 국물 오뎅. 진한 핫초 미소 소스에 찍어 먹는 방식. 겨울에 특히 인기.", mapUrl: "https://maps.google.com/?q=大和屋本店+名古屋", emoji: "🍢", bg: "#EFF4FF", badge: "겨울 별미", tip: "된장 소스가 진하니 처음엔 조금씩 찍어서 먹기 추천" },
  { name: "텐동 (텐동 이마이케)", nameJp: "天丼", category: "나고야 명물", restaurant: "에비노야 사카에치카점 (えびのや)", rating: 4.2, reviews: "2,300+", price: "₩10,000~", hours: "11:00~21:00", access: "지하철 히가시야마선 → 이마이케역 도보 1분 (지하 상가)", desc: "명란젓(멘타이코) 무제한 서비스로 유명한 텐동 맛집. 지하 상가 위치.", mapUrl: "https://maps.google.com/?q=えびのや+サカエチカ+名古屋", emoji: "🍤", bg: "#FFF8EC", badge: "명란 무제한", tip: "명란젓 무제한 서비스가 최대 매력. 밥에 올려 먹으면 맛있음" },
  { name: "나고야 라멘 (본가)", nameJp: "ラーメン", category: "라멘/우동", restaurant: "마루타카 라멘 (丸鷹ラーメン)", rating: 4.1, reviews: "2,700+", price: "₩8,000~", hours: "11:00~22:00", access: "지하철 메이조선 → 오조네역 도보 5분", desc: "나고야 현지인이 즐겨 찾는 진한 닭뼈 국물 라멘. 관광객보다 로컬에게 더 유명한 숨은 맛집.", mapUrl: "https://maps.google.com/?q=丸鷹ラーメン+名古屋", emoji: "🍜", bg: "#EFF4FF", badge: "로컬 숨은 맛집", tip: "후추를 넉넉히 뿌려 먹는 게 현지 스타일" },
  { name: "야키토리 이자카야", nameJp: "焼き鳥", category: "이자카야/술집", restaurant: "도리이치 나고야역 앞점 (鳥一)", rating: 4.2, reviews: "3,200+", price: "₩15,000~", hours: "17:00~24:00", access: "나고야역 도보 3분", desc: "나고야 코친 사용한 야키토리 전문 이자카야. 숯불 향이 살아있는 꼬치구이. 사케·맥주와 최고.", mapUrl: "https://maps.google.com/?q=鳥一+名古屋駅前", emoji: "🍢", bg: "#EDFAF4", badge: "야키토리 맛집", tip: "나고야 코친 야키토리는 일반 닭과 차원이 다름" },
  { name: "스시 오마카세", nameJp: "寿司おまかせ", category: "회전초밥", restaurant: "스시 킨조 (寿司金城)", rating: 4.4, reviews: "1,800+", price: "₩40,000~", hours: "12:00~14:00 / 18:00~22:00 (월요일 휴무)", access: "지하철 메이조선 → 야바마치역 도보 5분", desc: "나고야 나카 중앙 도매시장 직송 신선한 생선. 오마카세 코스 인기. 가성비 좋은 고급 스시.", mapUrl: "https://maps.google.com/?q=寿司金城+名古屋", emoji: "🍣", bg: "#EFF4FF", badge: "고급 스시", tip: "예약 필수. 점심 오마카세가 저녁보다 저렴" },
  { name: "카페 드 시엘 (전망 카페)", nameJp: "カフェ・ド・シエル", category: "디저트/카페", restaurant: "카페 드 시엘 (JR타카시마야 51F)", rating: 4.2, reviews: "3,400+", price: "₩8,000~", hours: "11:00~22:00", access: "나고야역 JR타카시마야 백화점 51층", desc: "나고야역 타카시마야 51층 전망 카페. 나고야 시내 전경 보며 커피·브런치 즐기기 최고.", mapUrl: "https://maps.google.com/?q=カフェドシエル+名古屋タカシマヤ", emoji: "☁️", bg: "#E6F1FB", badge: "전망 카페", tip: "창가 자리 예약 추천. 저녁 야경도 아름다움" },
  { name: "노리타케 레스토랑 킬른", nameJp: "キルン名古屋", category: "디저트/카페", restaurant: "킬른 나고야 (KILN NAGOYA)", rating: 4.3, reviews: "2,100+", price: "₩25,000~", hours: "11:00~21:00 (화요일 휴무)", access: "나고야역 도보 15분 / 노리타케 숲 내", desc: "노리타케 그릇에 코스 요리를 제공하는 고급 레스토랑. 노리타케 숲 내 위치. 연인 데이트 추천.", mapUrl: "https://maps.google.com/?q=KILN名古屋+ノリタケの森", emoji: "🍽️", bg: "#FBEAF0", badge: "데이트 추천", tip: "노리타케 그릇에 담겨 나오는 요리 프레젠테이션이 인상적" },
  { name: "BON BON 디저트", nameJp: "BONBONカフェ", category: "디저트/카페", restaurant: "봉봉 카페 (BON BON)", rating: 4.4, reviews: "2,800+", price: "₩6,000~", hours: "11:00~20:00", access: "지하철 히가시야마선 → 사카에역 도보 5분", desc: "아이브 레이가 추천한 나고야 현지 디저트 카페. SNS 포토스팟으로도 유명. 다양한 계절 디저트.", mapUrl: "https://maps.google.com/?q=BONBONカフェ+名古屋", emoji: "🍮", bg: "#FBEAF0", badge: "SNS 인기", tip: "계절 한정 메뉴가 특히 인기. 인스타 포토존 있음" },
  { name: "오구라 아이스크림", nameJp: "小倉アイス", category: "디저트/카페", restaurant: "이나바야 (稲葉屋)", rating: 4.1, reviews: "1,500+", price: "₩4,000~", hours: "10:00~19:00", access: "지하철 히가시야마선 → 사카에역 도보 3분", desc: "나고야 명물 오구라(팥) 아이스크림. 팥빙수처럼 팥 올린 나고야식 디저트.", mapUrl: "https://maps.google.com/?q=稲葉屋+名古屋+小倉アイス", emoji: "🍨", bg: "#FBEAF0", badge: "나고야 한정 디저트", tip: "여름에 특히 인기. 줄 서서 먹을 가치 있음" },
  { name: "나고야 된장 전골", nameJp: "味噌鍋", category: "이자카야/술집", restaurant: "핫포 (八方)", rating: 4.0, reviews: "1,800+", price: "₩18,000~", hours: "17:00~23:00 (일요일 휴무)", access: "지하철 메이조선 → 야바마치역 도보 5분", desc: "핫초 미소로 끓인 나고야식 전골. 돼지고기·채소·두부 등 다양한 재료. 겨울 나고야 여행의 필수 메뉴.", mapUrl: "https://maps.google.com/?q=八方+名古屋+味噌鍋", emoji: "🫕", bg: "#EFF4FF", badge: "겨울 필수", tip: "2인 이상 방문 추천. 남은 국물에 죽 끓여 먹기 가능" },
  { name: "카레우동", nameJp: "カレーうどん", category: "라멘/우동", restaurant: "야마모토야 본점 카레우동", rating: 4.2, reviews: "2,400+", price: "₩9,000~", hours: "11:00~21:00", access: "지하철 히가시야마선 → 사카에역 도보 3분", desc: "아이브 레이도 추천한 나고야 카레우동. 미소 니코미보다 한국인 입맛에 더 맞다는 평가도 있음.", mapUrl: "https://maps.google.com/?q=山本屋本店+カレーうどん+名古屋", emoji: "🍛", bg: "#EFF4FF", badge: "한국인 입맛 저격", tip: "흰 티셔츠 입고 가면 안됨! 카레가 튐. 앞치마 제공" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#BA7517", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      <span style={{ color: "var(--color-text-muted)", marginLeft: 4, fontSize: 12 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default function FoodPanel() {
  const [selected, setSelected] = useState("전체");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = selected === "전체" ? foods : foods.filter((f) => f.category === selected);

  return (
    <div>
      <div style={{ background: "var(--color-primary)", borderRadius: 16, padding: "16px 20px", marginBottom: 12, color: "white" }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>나고야 메시 (名古屋めし)</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>현지인 추천 맛집 {foods.length}선</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>구글 리뷰 · 위치 · 가는 법 · 꿀팁 포함</div>
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setSelected(c)} style={{ padding: "6px 14px", borderRadius: 999, border: "1px solid var(--color-border)", background: selected === c ? "var(--color-primary)" : "transparent", color: selected === c ? "white" : "var(--color-text-muted)", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontWeight: selected === c ? 500 : 400 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((f, i) => (
          <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#FFF0EF", color: "#B83028", fontWeight: 500 }}>{f.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>{f.restaurant}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StarRating rating={f.rating} />
                    <span style={{ fontSize: 11, color: "var(--color-text-hint)" }}>({f.reviews})</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-primary)", marginLeft: "auto" }}>{f.price}</span>
                  </div>
                </div>
                <div style={{ fontSize: 16, color: "var(--color-text-hint)" }}>{expanded === i ? "▲" : "▼"}</div>
              </div>
            </div>
            {expanded === i && (
              <div style={{ borderTop: "1px solid var(--color-border)", padding: "14px 16px", background: "#F7F6F3" }}>
                <div style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.6, marginBottom: 12 }}>{f.desc}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>🕐</span><span>{f.hours}</span></div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>🚇</span><span>{f.access}</span></div>
                  <div style={{ display: "flex", gap: 8, fontSize: 13 }}><span style={{ width: 24, flexShrink: 0 }}>💡</span><span style={{ color: "#2251CC" }}>{f.tip}</span></div>
                </div>
                <a href={f.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", borderRadius: 10, background: "var(--color-primary)", color: "white", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
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

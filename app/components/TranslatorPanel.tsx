"use client";
import { useState } from "react";

const categories = ["전체", "기본인사", "식당/카페", "교통", "쇼핑", "호텔", "관광", "응급/긴급", "문화예절"];

const phrases = [
  // 기본 인사
  { category: "기본인사", kr: "안녕하세요", jp: "こんにちは", read: "콘니치와" },
  { category: "기본인사", kr: "안녕히 계세요", jp: "さようなら", read: "사요나라" },
  { category: "기본인사", kr: "감사합니다", jp: "ありがとうございます", read: "아리가토 고자이마스" },
  { category: "기본인사", kr: "죄송합니다", jp: "すみません", read: "스미마센" },
  { category: "기본인사", kr: "괜찮아요", jp: "大丈夫です", read: "다이죠부데스" },
  { category: "기본인사", kr: "네", jp: "はい", read: "하이" },
  { category: "기본인사", kr: "아니요", jp: "いいえ", read: "이이에" },
  { category: "기본인사", kr: "잠깐만요", jp: "少々お待ちください", read: "쇼쇼 오마치 쿠다사이" },
  { category: "기본인사", kr: "모르겠어요", jp: "わかりません", read: "와카리마센" },
  { category: "기본인사", kr: "영어 하세요?", jp: "英語は話せますか？", read: "에이고와 하나세마스카?" },
  { category: "기본인사", kr: "한국어 되나요?", jp: "韓国語はできますか？", read: "칸코쿠고와 데키마스카?" },
  { category: "기본인사", kr: "천천히 말해주세요", jp: "ゆっくり話してください", read: "유쿠리 하나시테 쿠다사이" },
  { category: "기본인사", kr: "다시 말해주세요", jp: "もう一度言ってください", read: "모이치도 잇테 쿠다사이" },
  { category: "기본인사", kr: "써주세요", jp: "書いてください", read: "카이테 쿠다사이" },
  { category: "기본인사", kr: "좋아요!", jp: "いいですね！", read: "이이데스네!" },
  { category: "기본인사", kr: "이름이 뭐예요?", jp: "お名前は何ですか？", read: "오나마에와 난데스카?" },
  { category: "기본인사", kr: "저는 한국에서 왔어요", jp: "韓国から来ました", read: "칸코쿠카라 키마시타" },
  { category: "기본인사", kr: "만나서 반갑습니다", jp: "はじめまして", read: "하지메마시테" },
  { category: "기본인사", kr: "잘 부탁드립니다", jp: "よろしくお願いします", read: "요로시쿠 오네가이시마스" },
  { category: "기본인사", kr: "실례합니다", jp: "失礼します", read: "시츠레이시마스" },

  // 식당/카페
  { category: "식당/카페", kr: "메뉴 주세요", jp: "メニューをください", read: "메뉴-오 쿠다사이" },
  { category: "식당/카페", kr: "이거 주세요", jp: "これをください", read: "코레오 쿠다사이" },
  { category: "식당/카페", kr: "물 주세요", jp: "お水をください", read: "오미즈오 쿠다사이" },
  { category: "식당/카페", kr: "계산해주세요", jp: "お会計をお願いします", read: "오카이케이오 오네가이시마스" },
  { category: "식당/카페", kr: "얼마예요?", jp: "いくらですか？", read: "이쿠라데스카?" },
  { category: "식당/카페", kr: "맵지 않게 해주세요", jp: "辛くしないでください", read: "카라쿠 시나이데 쿠다사이" },
  { category: "식당/카페", kr: "알레르기 있어요", jp: "アレルギーがあります", read: "아레루기-가 아리마스" },
  { category: "식당/카페", kr: "새우 알레르기예요", jp: "エビアレルギーがあります", read: "에비 아레루기-가 아리마스" },
  { category: "식당/카페", kr: "포장해주세요", jp: "持ち帰りにしてください", read: "모치카에리니 시테 쿠다사이" },
  { category: "식당/카페", kr: "추천 메뉴가 뭐예요?", jp: "おすすめは何ですか？", read: "오스스메와 난데스카?" },
  { category: "식당/카페", kr: "맛있어요!", jp: "おいしいです！", read: "오이시이데스!" },
  { category: "식당/카페", kr: "이 자리 비어있나요?", jp: "この席は空いていますか？", read: "코노 세키와 아이테이마스카?" },
  { category: "식당/카페", kr: "2명이요", jp: "2人です", read: "후타리데스" },
  { category: "식당/카페", kr: "예약했어요", jp: "予約しました", read: "요야쿠 시마시타" },
  { category: "식당/카페", kr: "금연석으로 주세요", jp: "禁煙席をお願いします", read: "킨엔세키오 오네가이시마스" },
  { category: "식당/카페", kr: "셀프 서비스인가요?", jp: "セルフサービスですか？", read: "세루후 사-비스데스카?" },
  { category: "식당/카페", kr: "리필 되나요?", jp: "おかわりできますか？", read: "오카와리 데키마스카?" },
  { category: "식당/카페", kr: "포크 주세요", jp: "フォークをください", read: "포-쿠오 쿠다사이" },
  { category: "식당/카페", kr: "카드 되나요?", jp: "カードで払えますか？", read: "카-도데 하라에마스카?" },
  { category: "식당/카페", kr: "영수증 주세요", jp: "領収書をください", read: "료슈쇼오 쿠다사이" },

  // 교통
  { category: "교통", kr: "역은 어디예요?", jp: "駅はどこですか？", read: "에키와 도코데스카?" },
  { category: "교통", kr: "~까지 어떻게 가요?", jp: "〜までどうやって行きますか？", read: "~마데 도야잇테 이키마스카?" },
  { category: "교통", kr: "나고야역 가주세요", jp: "名古屋駅までお願いします", read: "나고야에키마데 오네가이시마스" },
  { category: "교통", kr: "얼마나 걸려요?", jp: "どのくらい時間がかかりますか？", read: "도노쿠라이 지칸가 카카리마스카?" },
  { category: "교통", kr: "다음 역이 어디예요?", jp: "次の駅はどこですか？", read: "츠기노 에키와 도코데스카?" },
  { category: "교통", kr: "이 열차 나고야 가나요?", jp: "この電車は名古屋に行きますか？", read: "코노 덴샤와 나고야니 이키마스카?" },
  { category: "교통", kr: "승차권 한 장 주세요", jp: "切符を一枚ください", read: "킵푸오 이치마이 쿠다사이" },
  { category: "교통", kr: "어느 출구로 나가요?", jp: "何番出口ですか？", read: "난반 데구치데스카?" },
  { category: "교통", kr: "택시 불러주세요", jp: "タクシーを呼んでください", read: "탁시-오 욘데 쿠다사이" },
  { category: "교통", kr: "여기서 세워주세요", jp: "ここで止めてください", read: "코코데 토메테 쿠다사이" },
  { category: "교통", kr: "공항까지요", jp: "空港までお願いします", read: "쿠코-마데 오네가이시마스" },
  { category: "교통", kr: "버스 정류장 어디예요?", jp: "バス停はどこですか？", read: "바스테이와 도코데스카?" },
  { category: "교통", kr: "이 버스 맞나요?", jp: "このバスで合っていますか？", read: "코노 바스데 앗테이마스카?" },
  { category: "교통", kr: "갈아타야 하나요?", jp: "乗り換えが必要ですか？", read: "노리카에가 히츠요-데스카?" },
  { category: "교통", kr: "IC카드 충전하고 싶어요", jp: "ICカードをチャージしたいです", read: "아이씨 카-도오 차-지 시타이데스" },
  { category: "교통", kr: "짐 맡길 수 있나요?", jp: "荷物を預けられますか？", read: "니모츠오 아즈케라레마스카?" },
  { category: "교통", kr: "길을 잃었어요", jp: "道に迷いました", read: "미치니 마요이마시타" },
  { category: "교통", kr: "지도 봐주실 수 있나요?", jp: "地図を見ていただけますか？", read: "치즈오 미테 이타다케마스카?" },
  { category: "교통", kr: "걸어서 갈 수 있나요?", jp: "歩いて行けますか？", read: "아루이테 이케마스카?" },
  { category: "교통", kr: "몇 분 걸려요?", jp: "何分かかりますか？", read: "난훈 카카리마스카?" },

  // 쇼핑
  { category: "쇼핑", kr: "얼마예요?", jp: "いくらですか？", read: "이쿠라데스카?" },
  { category: "쇼핑", kr: "이거 있나요?", jp: "これはありますか？", read: "코레와 아리마스카?" },
  { category: "쇼핑", kr: "다른 색상 있나요?", jp: "他の色はありますか？", read: "호카노 이로와 아리마스카?" },
  { category: "쇼핑", kr: "사이즈 큰 거 있나요?", jp: "大きいサイズはありますか？", read: "오-키이 사이즈와 아리마스카?" },
  { category: "쇼핑", kr: "입어봐도 되나요?", jp: "試着できますか？", read: "시챠쿠 데키마스카?" },
  { category: "쇼핑", kr: "교환 되나요?", jp: "交換できますか？", read: "코-칸 데키마스카?" },
  { category: "쇼핑", kr: "환불 되나요?", jp: "返金できますか？", read: "헨킨 데키마스카?" },
  { category: "쇼핑", kr: "봉투 주세요", jp: "袋をください", read: "후쿠로오 쿠다사이" },
  { category: "쇼핑", kr: "세금 환급 되나요?", jp: "免税できますか？", read: "멘제이 데키마스카?" },
  { category: "쇼핑", kr: "선물 포장해주세요", jp: "ギフト包装をお願いします", read: "기후토 호소-오 오네가이시마스" },
  { category: "쇼핑", kr: "이게 제일 싼 거예요?", jp: "これが一番安いですか？", read: "코레가 이치반 야스이데스카?" },
  { category: "쇼핑", kr: "카드로 낼게요", jp: "カードで払います", read: "카-도데 하라이마스" },
  { category: "쇼핑", kr: "현금으로 낼게요", jp: "現金で払います", read: "겐킨데 하라이마스" },
  { category: "쇼핑", kr: "한국에 배송 되나요?", jp: "韓国に配送できますか？", read: "칸코쿠니 하이소- 데키마스카?" },
  { category: "쇼핑", kr: "이거 살게요", jp: "これを買います", read: "코레오 카이마스" },
  { category: "쇼핑", kr: "좀 더 저렴한 거 있나요?", jp: "もっと安いものはありますか？", read: "못토 야스이 모노와 아리마스카?" },
  { category: "쇼핑", kr: "영업시간이 언제예요?", jp: "営業時間はいつですか？", read: "에이교지칸와 이츠데스카?" },
  { category: "쇼핑", kr: "화장실 어디예요?", jp: "トイレはどこですか？", read: "토이레와 도코데스카?" },
  { category: "쇼핑", kr: "1층이 어디예요?", jp: "1階はどこですか？", read: "이찌카이와 도코데스카?" },
  { category: "쇼핑", kr: "세일 중인가요?", jp: "セール中ですか？", read: "세-루 추-데스카?" },

  // 호텔
  { category: "호텔", kr: "체크인 하고 싶어요", jp: "チェックインをお願いします", read: "체크인오 오네가이시마스" },
  { category: "호텔", kr: "체크아웃 할게요", jp: "チェックアウトをお願いします", read: "체크아웃오 오네가이시마스" },
  { category: "호텔", kr: "예약했어요", jp: "予約しております", read: "요야쿠 시테 오리마스" },
  { category: "호텔", kr: "짐 맡아주세요", jp: "荷物を預かってください", read: "니모츠오 아즈캇테 쿠다사이" },
  { category: "호텔", kr: "와이파이 비밀번호가 뭐예요?", jp: "Wi-Fiのパスワードは何ですか？", read: "와이파이노 파스와-도와 난데스카?" },
  { category: "호텔", kr: "수건 더 주세요", jp: "タオルをもっとください", read: "타오루오 못토 쿠다사이" },
  { category: "호텔", kr: "방이 너무 추워요", jp: "部屋が寒すぎます", read: "헤야가 사무스기마스" },
  { category: "호텔", kr: "방이 너무 더워요", jp: "部屋が暑すぎます", read: "헤야가 아츠스기마스" },
  { category: "호텔", kr: "TV가 안 켜져요", jp: "テレビがつきません", read: "테레비가 츠키마센" },
  { category: "호텔", kr: "열쇠를 잃어버렸어요", jp: "鍵をなくしました", read: "카기오 나쿠시마시타" },
  { category: "호텔", kr: "아침식사는 몇 시예요?", jp: "朝食は何時ですか？", read: "쵸쇼쿠와 난지데스카?" },
  { category: "호텔", kr: "택시 불러주세요", jp: "タクシーを呼んでください", read: "탁시-오 욘데 쿠다사이" },
  { category: "호텔", kr: "늦은 체크아웃 가능한가요?", jp: "レイトチェックアウトできますか？", read: "레이토 체크아웃 데키마스카?" },
  { category: "호텔", kr: "금고 사용법 알려주세요", jp: "金庫の使い方を教えてください", read: "킨코노 츠카이카타오 오시에테 쿠다사이" },
  { category: "호텔", kr: "방 청소 해주세요", jp: "部屋を掃除してください", read: "헤야오 소-지 시테 쿠다사이" },
  { category: "호텔", kr: "모닝콜 부탁해요", jp: "モーニングコールをお願いします", read: "모-닝구 코-루오 오네가이시마스" },
  { category: "호텔", kr: "욕조에 물이 안 나와요", jp: "お風呂のお湯が出ません", read: "오후로노 오유가 데마센" },
  { category: "호텔", kr: "근처 편의점 어디예요?", jp: "近くのコンビニはどこですか？", read: "치카쿠노 콘비니와 도코데스카?" },
  { category: "호텔", kr: "주차장 있나요?", jp: "駐車場はありますか？", read: "추샤조-와 아리마스카?" },
  { category: "호텔", kr: "짐을 방까지 옮겨주세요", jp: "荷物を部屋まで運んでください", read: "니모츠오 헤야마데 하콘데 쿠다사이" },

  // 관광
  { category: "관광", kr: "입장료가 얼마예요?", jp: "入場料はいくらですか？", read: "뉴-조-료-와 이쿠라데스카?" },
  { category: "관광", kr: "사진 찍어도 되나요?", jp: "写真を撮ってもいいですか？", read: "샤신오 톳테모 이이데스카?" },
  { category: "관광", kr: "사진 찍어주세요", jp: "写真を撮ってください", read: "샤신오 톳테 쿠다사이" },
  { category: "관광", kr: "화장실 어디예요?", jp: "トイレはどこですか？", read: "토이레와 도코데스카?" },
  { category: "관광", kr: "팸플릿 있나요?", jp: "パンフレットはありますか？", read: "팜후렛토와 아리마스카?" },
  { category: "관광", kr: "한국어 안내서 있나요?", jp: "韓国語のガイドブックはありますか？", read: "칸코쿠고노 가이도붓쿠와 아리마스카?" },
  { category: "관광", kr: "몇 시에 문 닫아요?", jp: "何時に閉まりますか？", read: "난지니 시마리마스카?" },
  { category: "관광", kr: "지금 몇 시예요?", jp: "今何時ですか？", read: "이마 난지데스카?" },
  { category: "관광", kr: "근처에 뭐가 있나요?", jp: "近くに何がありますか？", read: "치카쿠니 나니가 아리마스카?" },
  { category: "관광", kr: "저도 들어갈 수 있나요?", jp: "私も入れますか？", read: "와타시모 하이레마스카?" },
  { category: "관광", kr: "오디오 가이드 있나요?", jp: "オーディオガイドはありますか？", read: "오-디오 가이도와 아리마스카?" },
  { category: "관광", kr: "여기가 ~이 맞나요?", jp: "ここは〜ですか？", read: "코코와 ~데스카?" },
  { category: "관광", kr: "관광안내소 어디예요?", jp: "観光案内所はどこですか？", read: "칸코- 안나이쇼와 도코데스카?" },
  { category: "관광", kr: "무료 지도 있나요?", jp: "無料の地図はありますか？", read: "무료-노 치즈와 아리마스카?" },
  { category: "관광", kr: "투어 참가하고 싶어요", jp: "ツアーに参加したいです", read: "츠아-니 산카 시타이데스" },
  { category: "관광", kr: "영업 중인가요?", jp: "営業中ですか？", read: "에이교-추-데스카?" },
  { category: "관광", kr: "학생 할인 있나요?", jp: "学生割引はありますか？", read: "가쿠세이 와리비키와 아리마스카?" },
  { category: "관광", kr: "짐 보관함 어디예요?", jp: "コインロッカーはどこですか？", read: "코인 록카-와 도코데스카?" },
  { category: "관광", kr: "여기서 얼마나 걸려요?", jp: "ここからどのくらいかかりますか？", read: "코코카라 도노쿠라이 카카리마스카?" },
  { category: "관광", kr: "폐관 시간이 언제예요?", jp: "閉館時間はいつですか？", read: "헤이칸 지칸와 이츠데스카?" },

  // 응급/긴급
  { category: "응급/긴급", kr: "도와주세요!", jp: "助けてください！", read: "타스케테 쿠다사이!" },
  { category: "응급/긴급", kr: "경찰 불러주세요", jp: "警察を呼んでください", read: "케이사츠오 욘데 쿠다사이" },
  { category: "응급/긴급", kr: "구급차 불러주세요", jp: "救急車を呼んでください", read: "큐-큐-샤오 욘데 쿠다사이" },
  { category: "응급/긴급", kr: "병원이 어디예요?", jp: "病院はどこですか？", read: "뵤-인와 도코데스카?" },
  { category: "응급/긴급", kr: "아파요", jp: "具合が悪いです", read: "구아이가 와루이데스" },
  { category: "응급/긴급", kr: "약국 어디예요?", jp: "薬局はどこですか？", read: "야쿠쿄쿠와 도코데스카?" },
  { category: "응급/긴급", kr: "지갑을 잃어버렸어요", jp: "財布をなくしました", read: "사이후오 나쿠시마시타" },
  { category: "응급/긴급", kr: "휴대폰을 잃어버렸어요", jp: "携帯をなくしました", read: "케이타이오 나쿠시마시타" },
  { category: "응급/긴급", kr: "도난당했어요", jp: "盗まれました", read: "누스마레마시타" },
  { category: "응급/긴급", kr: "여권을 잃어버렸어요", jp: "パスポートをなくしました", read: "파스포-토오 나쿠시마시타" },
  { category: "응급/긴급", kr: "한국 대사관에 연락해주세요", jp: "韓国大使館に連絡してください", read: "칸코쿠 타이시칸니 렌라쿠 시테 쿠다사이" },
  { category: "응급/긴급", kr: "머리가 아파요", jp: "頭が痛いです", read: "아타마가 이타이데스" },
  { category: "응급/긴급", kr: "배가 아파요", jp: "お腹が痛いです", read: "오나카가 이타이데스" },
  { category: "응급/긴급", kr: "열이 있어요", jp: "熱があります", read: "네츠가 아리마스" },
  { category: "응급/긴급", kr: "알레르기 반응이에요", jp: "アレルギー反応です", read: "아레루기- 한노-데스" },
  { category: "응급/긴급", kr: "보험이 있어요", jp: "保険があります", read: "호켄가 아리마스" },
  { category: "응급/긴급", kr: "영어 통역사 있나요?", jp: "英語の通訳はいますか？", read: "에이고노 츠우야쿠와 이마스카?" },
  { category: "응급/긴급", kr: "분실물 센터 어디예요?", jp: "落とし物センターはどこですか？", read: "오토시모노 센타-와 도코데스카?" },
  { category: "응급/긴급", kr: "교통사고가 났어요", jp: "交通事故がありました", read: "코-츠- 지코가 아리마시타" },
  { category: "응급/긴급", kr: "비상구가 어디예요?", jp: "非常口はどこですか？", read: "히죠-구치와 도코데스카?" },

  // 문화예절
  { category: "문화예절", kr: "잘 먹겠습니다", jp: "いただきます", read: "이타다키마스" },
  { category: "문화예절", kr: "잘 먹었습니다", jp: "ごちそうさまでした", read: "고치소-사마데시타" },
  { category: "문화예절", kr: "어서오세요 (가게에서)", jp: "いらっしゃいませ", read: "이랏샤이마세" },
  { category: "문화예절", kr: "폐를 끼쳐서 죄송해요", jp: "ご迷惑をおかけしました", read: "고메이와쿠오 오카케시마시타" },
  { category: "문화예절", kr: "감사히 받겠습니다", jp: "ありがたく頂戴します", read: "아리가타쿠 초-다이시마스" },
  { category: "문화예절", kr: "오래 기다리셨어요", jp: "お待たせしました", read: "오마타세 시마시타" },
  { category: "문화예절", kr: "덕분에 즐거웠어요", jp: "おかげさまで楽しかったです", read: "오카게사마데 타노시캇타데스" },
  { category: "문화예절", kr: "언제든지 오세요", jp: "またいつでも来てください", read: "마타 이츠데모 키테 쿠다사이" },
  { category: "문화예절", kr: "좋은 여행 되세요", jp: "良い旅を", read: "요이 타비오" },
  { category: "문화예절", kr: "조심히 가세요", jp: "お気をつけて", read: "오키오 츠케테" },
  { category: "문화예절", kr: "나중에 또 봐요", jp: "またね", read: "마타네" },
  { category: "문화예절", kr: "힘내세요!", jp: "頑張ってください！", read: "간밧테 쿠다사이!" },
  { category: "문화예절", kr: "천만에요", jp: "どういたしまして", read: "도-이타시마시테" },
  { category: "문화예절", kr: "실례가 되지 않는다면", jp: "よろしければ", read: "요로시케레바" },
  { category: "문화예절", kr: "부탁드립니다", jp: "お願いします", read: "오네가이시마스" },
  { category: "문화예절", kr: "축하합니다", jp: "おめでとうございます", read: "오메데토- 고자이마스" },
  { category: "문화예절", kr: "새해 복 많이 받으세요", jp: "あけましておめでとうございます", read: "아케마시테 오메데토- 고자이마스" },
  { category: "문화예절", kr: "잘 자요", jp: "おやすみなさい", read: "오야스미나사이" },
  { category: "문화예절", kr: "아침 인사", jp: "おはようございます", read: "오하요- 고자이마스" },
  { category: "문화예절", kr: "저녁 인사", jp: "こんばんは", read: "콘방와" },
];

export default function TranslatorPanel() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState("전체");
  const [search, setSearch] = useState("");

  async function translate() {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=ko|ja`
      );
      const data = await res.json();
      const translated = data.responseData?.translatedText;
      if (translated) {
        setResult(translated);
      } else {
        setResult("번역 실패. 다시 시도해주세요.");
      }
    } catch {
      setResult("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  function copyPhrase(jp: string, id: string) {
    navigator.clipboard.writeText(jp).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  const filtered = phrases.filter((p) => {
    const matchCat = selected === "전체" || p.category === selected;
    const matchSearch = search === "" || p.kr.includes(search) || p.jp.includes(search) || p.read.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* AI 번역기 */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>🌐 AI 실시간 번역 (한국어 → 일본어)</div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="번역할 한국어를 입력하세요..."
          rows={3}
          style={{ width: "100%", border: "1px solid var(--color-border)", borderRadius: 10, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", resize: "none", outline: "none", background: "#F7F6F3", color: "var(--color-text)" }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); translate(); } }}
        />
        <button
          onClick={translate}
          disabled={loading || !input.trim()}
          style={{ width: "100%", marginTop: 8, padding: "10px", borderRadius: 10, background: loading || !input.trim() ? "#E8E6E1" : "var(--color-primary)", color: loading || !input.trim() ? "var(--color-text-muted)" : "white", border: "none", fontSize: 14, fontWeight: 500, cursor: loading || !input.trim() ? "default" : "pointer" }}
        >
          {loading ? "번역 중..." : "번역하기"}
        </button>
        {result && (
          <div style={{ marginTop: 12, background: "#F7F6F3", borderRadius: 10, padding: "12px 14px", fontSize: 15, fontWeight: 500, lineHeight: 1.6, borderLeft: "3px solid var(--color-primary)" }}>
            {result}
            <button
              onClick={() => copyPhrase(result, "ai-result")}
              style={{ display: "block", marginTop: 8, fontSize: 12, color: copied === "ai-result" ? "#1A7A4A" : "#2251CC", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {copied === "ai-result" ? "✓ 복사됨" : "복사하기"}
            </button>
          </div>
        )}
      </div>

      {/* 검색 */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 회화 검색..."
          style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--color-border)", fontSize: 14, background: "#F7F6F3", color: "var(--color-text)", outline: "none" }}
        />
      </div>

      {/* 카테고리 필터 */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setSelected(c)} style={{ padding: "6px 14px", borderRadius: 999, border: "1px solid var(--color-border)", background: selected === c ? "var(--color-primary)" : "transparent", color: selected === c ? "white" : "var(--color-text-muted)", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontWeight: selected === c ? 500 : 400 }}>
            {c}
          </button>
        ))}
      </div>

      {/* 회화 목록 */}
      <div className="card">
        <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 12 }}>
          {filtered.length}개 · 탭하면 일본어 복사
        </div>
        {filtered.map((p, i) => {
          const id = `${p.category}-${i}`;
          return (
            <div
              key={id}
              onClick={() => copyPhrase(p.jp, id)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < filtered.length - 1 ? "1px solid var(--color-border)" : "none", cursor: "pointer", userSelect: "none" }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: "var(--color-text-muted)", minWidth: 110 }}>{p.kr}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{p.jp}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--color-text-hint)", marginTop: 2, paddingLeft: 120 }}>{p.read}</div>
              </div>
              <div style={{ fontSize: 12, color: copied === id ? "#1A7A4A" : "var(--color-text-hint)", flexShrink: 0, marginLeft: 8 }}>
                {copied === id ? "✓" : "복사"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

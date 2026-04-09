# 🗼 나고야 여행 대시보드

나고야 여행에 필요한 모든 정보를 한 곳에서 — 항공편, 관광지, 맛집, 숙소, 교통, 일본어 번역까지.

---

## 📁 프로젝트 구조

```
nagoya-travel/
├── app/
│   ├── page.tsx                  # 메인 대시보드 (탭 구성)
│   ├── layout.tsx                # 전체 레이아웃 + 폰트
│   ├── globals.css               # 전역 스타일
│   ├── components/
│   │   ├── FlightPanel.tsx       # ✈️  항공편 탭
│   │   ├── SpotsPanel.tsx        # 🏯  관광지 탭
│   │   ├── FoodPanel.tsx         # 🍜  맛집 탭
│   │   ├── HotelPanel.tsx        # 🏨  숙소 탭
│   │   ├── TransitPanel.tsx      # 🚇  교통 탭
│   │   └── TranslatorPanel.tsx   # 🗣️  일본어 번역 탭
│   └── api/
│       └── translate/
│           └── route.ts          # 번역 API (Claude Haiku 연동)
├── .env.local                    # API 키 설정 파일 (본인이 입력)
└── README.md
```

---

## 🚀 실행 방법

### 1단계 — Node.js 설치 확인

터미널(macOS: Terminal, Windows: PowerShell)을 열고 입력:

```bash
node -v
```

v18 이상이 나오면 OK. 없으면 https://nodejs.org 에서 LTS 버전 설치.

---

### 2단계 — 프로젝트 폴더 진입

```bash
cd nagoya-travel
```

---

### 3단계 — 패키지 설치 (처음 한 번만)

```bash
npm install
```

---

### 4단계 — API 키 설정 (번역 기능 사용 시)

.env.local 파일을 열고 수정:

```
GOOGLE_AI_API_KEY=여기에-발급받은-키를-넣으세요
```

API 키 발급: https://aistudio.google.com/apikey → Create API Key

---

### 5단계 — 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속 🎉

---

## 🛠️ 이후 확장 계획

| 단계 | 기능 | API |
|------|------|-----|
| Phase 2 | 실시간 항공편 검색 | Amadeus for Developers |
| Phase 3 | 호텔 예약 연동 | Booking.com Affiliate API |
| Phase 4 | 지도 경로 안내 | Google Maps Platform |
| Phase 5 | 여행 일정 저장 | PostgreSQL + Prisma |

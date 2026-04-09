import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나고야 여행 대시보드",
  description: "나고야 여행 정보 — 항공, 관광지, 맛집, 숙소, 교통, 일본어",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "문화사 립스 | 영유아 교육기관 솔루션",
  description:
    "AI 관찰과 교육 콘텐츠, 교사와 부모 코칭으로 영유아 교육기관의 운영과 아이의 성장을 지원합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <head>
        {/* 히어로 섹션 scale CSS 변수 — 브라우저가 HTML을 표시하기 전에 동기 실행 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.setProperty('--hw-scale',window.innerWidth/1920);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "문화사",
  description:
    "AI 관찰과 교육 콘텐츠, 교사와 부모 코칭으로 영유아 교육기관의 운영과 아이의 성장을 지원합니다.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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

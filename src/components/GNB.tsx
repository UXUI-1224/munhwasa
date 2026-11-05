"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const NAV_ITEMS = [
  "문화사",
  "솔루션",
  "교육/코칭",
  "체험/행사",
  "스토어",
  "소식/자료",
  "상담문의",
];

// sub-menu items per top-level nav
const MENU: Record<string, string[]> = {
  "문화사":   ["About 문화사", "사업 영역", "연혁"],
  "솔루션":   ["킨더로그", "냠냠키즈"],
  "교육/코칭": ["교사 코칭", "원장 세미나", "부모 코칭"],
  "체험/행사": ["하이포레스트", "공연/행사"],
  "스토어":   ["놀이/교구", "식품", "교육 콘텐츠"],
  "소식/자료": ["공지사항", "활동 소식"],
  "상담문의": ["기관 도입 상담", "일반 문의"],
};

// href per sub-menu item
const MENU_LINKS: Record<string, Record<string, string>> = {
  "문화사": {
    "About 문화사": "/about",
    "사업 영역":    "/business",
    "연혁":        "/history",
  },
  "솔루션": {
    "킨더로그": "/sol/kinderlog",
    "냠냠키즈": "/sol/nyamnyam",
  },
  "교육/코칭": {
    "교사 코칭":   "/education/teacher",
    "원장 세미나": "/education/seminar",
    "부모 코칭":   "/education/parent",
  },
  "체험/행사": {
    "하이포레스트": "/experience/hiforest",
    "공연/행사":   "/experience/concerts",
  },
  "스토어": {
    "놀이/교구": "/store/toys",
    "식품": "/store/food",
    "교육 콘텐츠": "/store/contents",
  },
  "소식/자료": {
    "공지사항": "/news",
    "활동 소식": "/activity",
  },
  "상담문의": {
    "기관 도입 상담": "/contact?tab=institution",
    "일반 문의":     "/contact?tab=general",
  },
};

// Top-level nav hrefs (for direct click)
const NAV_ITEM_LINKS: Record<string, string> = {
  "문화사":    "/about",
  "솔루션":    "/sol/kinderlog",
  "교육/코칭": "/education/teacher",
  "체험/행사": "/experience/hiforest",
  "소식/자료": "/activity",
  "상담문의":  "/contact",
};

export default function GNB() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY <= 0) {
        // At the very top — always show
        setVisible(true);
      } else if (delta < -4) {
        // Scrolling up — show
        setVisible(true);
        setActiveNav(null);
      } else if (delta > 4 && currentY > 80) {
        // Scrolling down past GNB height — hide
        setVisible(false);
        setActiveNav(null);
      }

      lastY = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 w-full"
      animate={{ y: visible ? 0 : "-110%" }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      onMouseLeave={() => setActiveNav(null)}
    >
      <header className="w-full bg-[var(--bg-white)]">
        <div className="max-w-[1440px] mx-auto w-full relative flex items-center justify-between py-4 px-[64px]">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/logo-horizontal.svg"
              alt="문화사 립스"
              width={190}
              height={24}
              priority
            />
          </Link>

          {/* Center Nav — absolutely centered within container */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={NAV_ITEM_LINKS[item] ?? "#"}
                onMouseEnter={() => setActiveNav(item)}
                className={`flex items-center justify-center px-6 py-6 text-[18px] font-semibold leading-[1.2] tracking-[-0.72px] whitespace-nowrap transition-colors ${
                  activeNav === item
                    ? "text-[var(--txt-primary)]"
                    : "text-[var(--txt-label)] hover:text-[var(--txt-primary)]"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Trailing */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold tracking-[-0.64px] text-[var(--txt-white)] whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              도입 문의
            </Link>
          </div>
        </div>
      </header>

      {/* Sub-menu Drawer */}
      <AnimatePresence>
        {activeNav && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="w-full bg-[var(--bg-secondary-softer)]"
          >
            <div className="max-w-[1440px] mx-auto w-full flex items-center justify-center h-[73px]">
              {(MENU[activeNav] ?? []).map((sub) => {
                const href = MENU_LINKS[activeNav]?.[sub] ?? "#";
                return (
                  <Link
                    key={sub}
                    href={href}
                    onClick={() => setActiveNav(null)}
                    className="flex items-center justify-center px-6 h-full text-[18px] font-semibold leading-[1.2] tracking-[-0.72px] text-[var(--txt-label)] whitespace-nowrap hover:text-[var(--txt-primary)] transition-colors"
                  >
                    {sub}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

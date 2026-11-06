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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDrawerItem, setOpenDrawerItem] = useState<string | null>(null);

  // 모바일 드로어 열릴 때 body 스크롤 잠금 + 닫힐 때 아코디언 초기화
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    if (!mobileMenuOpen) setOpenDrawerItem(null);
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
    <>
    <motion.div
      className="fixed left-0 top-0 z-50 w-full"
      animate={{ y: visible ? 0 : "-110%" }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      onMouseLeave={() => setActiveNav(null)}
    >
      <header className="w-full bg-[var(--bg-white)]">
        {/* ── Mobile header ── */}
        <div className="md:hidden flex items-center justify-between py-4 px-6">
          {/* Logo — left */}
          <Link href="/">
            <Image
              src="/assets/logo-horizontal.svg"
              alt="문화사"
              width={150}
              height={19}
              priority
            />
          </Link>
          {/* Hamburger */}
          <button
            className="flex flex-col justify-center gap-[5px] w-10 h-10 items-center"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            <span className="block w-6 h-[2px] bg-[var(--txt-heading)] rounded-full" />
            <span className="block w-6 h-[2px] bg-[var(--txt-heading)] rounded-full" />
            <span className="block w-6 h-[2px] bg-[var(--txt-heading)] rounded-full" />
          </button>
        </div>

        {/* ── PC header ── */}
        <div className="hidden md:flex max-w-[1440px] mx-auto w-full relative items-center justify-between py-4 px-[64px]">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/logo-horizontal.svg"
              alt="문화사"
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

      {/* PC Sub-menu Drawer */}
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

    {/* Mobile Full-screen Drawer */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          key="mobile-drawer"
          className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/assets/logo-horizontal.svg"
                alt="문화사"
                width={150}
                height={19}
                priority
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
              className="w-10 h-10 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Nav list */}
          <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isOpen = openDrawerItem === item;
              return (
                <div key={item} className="border-b border-[var(--bg-gray)]">
                  {/* Row: label + chevron */}
                  <button
                    className="w-full flex items-center justify-between py-4"
                    onClick={() => setOpenDrawerItem(isOpen ? null : item)}
                  >
                    <span className="text-[18px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-heading)]">
                      {item}
                    </span>
                    <motion.svg
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </button>
                  {/* Sub-items */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="sub"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-4">
                          {(MENU[item] ?? []).map((sub) => {
                            const href = MENU_LINKS[item]?.[sub] ?? "#";
                            return (
                              <Link
                                key={sub}
                                href={href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-2 pl-2 text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-label)] hover:text-[var(--txt-primary)] transition-colors"
                              >
                                {sub}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

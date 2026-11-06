"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─── Scroll-driven Hero ───────────────────────────────────────────────────────

function Hero() {
  const [animDone, setAnimDone] = useState(false);
  const progress    = useMotionValue(0);
  const isMobileRef = useRef(false);

  const imageTop   = useTransform(progress, (p) => `${(isMobileRef.current ? 300 : 365) * (1 - p)}px`);
  const imageSide  = useTransform(progress, (p) => `${(isMobileRef.current ? 16  : 64)  * (1 - p)}px`);
  const imageBR    = useTransform(progress, (p) => `${Math.max(0, 24 * (1 - Math.min(1, p / 0.76)))}px`);
  const preTextOp  = useTransform(progress, (p) => Math.max(0, 1 - p / 0.56));
  const postTextOp = useTransform(progress, (p) => Math.max(0, (p - 0.5) / 0.5));

  useEffect(() => {
    const WHEEL_TOTAL = 500;
    const TOUCH_TOTAL = 400;
    let p = 0;
    let locked = true;
    let cooldown = false;
    let touchStartY = 0;

    function checkMobile() { isMobileRef.current = window.innerWidth < 768; }
    checkMobile();
    window.addEventListener("resize", checkMobile);

    function lock() {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = sw + "px";
      document.body.style.overflow = "hidden";
    }
    function unlock() {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    lock();

    function onWheel(e: WheelEvent) {
      if (locked) {
        e.preventDefault();
        p = Math.max(0, Math.min(1, p + e.deltaY / WHEEL_TOTAL));
        progress.set(p);
        if (p >= 1) {
          locked = false; unlock(); setAnimDone(true);
          cooldown = true; setTimeout(() => { cooldown = false; }, 500);
        }
      } else {
        if (cooldown) { e.preventDefault(); return; }
        if (window.scrollY <= 1 && e.deltaY < 0) {
          e.preventDefault();
          locked = true; lock(); setAnimDone(false);
          p = Math.max(0, Math.min(1, p + e.deltaY / WHEEL_TOTAL));
          progress.set(p);
        }
      }
    }

    function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY; }

    function onTouchMove(e: TouchEvent) {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      if (locked) {
        e.preventDefault();
        p = Math.max(0, Math.min(1, p + delta / TOUCH_TOTAL));
        progress.set(p);
        if (p >= 1) {
          locked = false; unlock(); setAnimDone(true);
          cooldown = true; setTimeout(() => { cooldown = false; }, 500);
        }
      } else {
        if (cooldown) { e.preventDefault(); return; }
        if (window.scrollY <= 1 && delta < -4) {
          e.preventDefault();
          locked = true; lock(); setAnimDone(false);
          p = Math.max(0, Math.min(1, p + delta / TOUCH_TOTAL));
          progress.set(p);
        }
      }
    }

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("resize",     checkMobile);
      unlock();
    };
  }, [progress]);

  return (
    <div className="relative" style={{ height: "100vh" }}>
      <section
        className="overflow-hidden bg-[var(--bg-white)]"
        style={animDone ? { position: "absolute", inset: 0 } : { position: "fixed", inset: 0, zIndex: 40 }}
      >
        <motion.div
          className="absolute overflow-hidden"
          style={{ top: imageTop, left: imageSide, right: imageSide, bottom: "0px", borderRadius: imageBR }}
        >
          <Image src="/assets/history-hero.jpg" alt="문화사가 걸어온 길" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[rgba(32,32,32,0.3)]" />
        </motion.div>

        <motion.div
          className="absolute top-[120px] left-0 right-0 flex flex-col items-center gap-4 pointer-events-none px-6"
          style={{ opacity: preTextOp }}
        >
          <h1 className="text-[36px] md:text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] text-center">
            문화사가 걸어온 길
          </h1>
          <div className="text-[16px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-display)] text-center max-w-[830px]">
            <p>지난 10년 간의 노하우로</p>
            <p>묵묵히 아이들의 미래를 위해 걸어나가고 있습니다.</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-10 px-6"
          style={{ opacity: postTextOp }}
        >
          <h1 className="text-[36px] md:text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-white)] text-center">
            문화사가 걸어온 길
          </h1>
          <div className="text-[16px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-white)] text-center max-w-[830px]">
            <p>지난 10년 간의 노하우로</p>
            <p>묵묵히 아이들의 미래를 위해 걸어나가고 있습니다.</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── History Section ──────────────────────────────────────────────────────────

type Decade = "2020s" | "2000s";

type HistoryEntry = {
  year: string;
  items: string[];
};

const HISTORY: Record<Decade, HistoryEntry[]> = {
  "2020s": [
    {
      year: "2025",
      items: ["영유아 AI 행동관찰 솔루션 스토리라인 전국 2,000개 기관 판매 달성"],
    },
    {
      year: "2023",
      items: [
        "사회정서학습(SEL) 세미나 운영 시작",
        "전통놀이 교구 힘내윷 출시",
        "생활놀이 교구 킨텐도 출시",
        "역할놀이 교구 홈스윗홈 출시",
        "언어놀이 교구 한입에 꿀떡 출시",
      ],
    },
  ],
  "2000s": [
    { year: "2004", items: ["문화사 출범"] },
  ],
};

const DECADE_LABELS: { key: Decade; label: string }[] = [
  { key: "2020s", label: "2020's" },
  { key: "2000s", label: "2000's" },
];

function HistorySection() {
  const [activeDecade, setActiveDecade] = useState<Decade>("2020s");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackHeight, setTrackHeight] = useState(200);
  const decadeRefs = useRef<Record<Decade, HTMLDivElement | null>>({ "2020s": null, "2000s": null });
  const suppressScrollUpdate = useRef(false);

  // Compute absolute page positions once on mount, then derive scroll progress
  useEffect(() => {
    const el2020 = decadeRefs.current["2020s"];
    const el2000 = decadeRefs.current["2000s"];
    if (!el2020 || !el2000) return;

    const absTop2020  = el2020.getBoundingClientRect().top  + window.scrollY;
    const absBot2000  = el2000.getBoundingClientRect().bottom + window.scrollY;
    const D = absBot2000 - absTop2020;
    if (D <= 0) return;
    setTrackHeight(D);

    const update = () => {
      const pos = window.scrollY + window.innerHeight - absTop2020;
      setScrollProgress(Math.max(0, Math.min(1, pos / D)));
    };

    const updateActive = () => {
      // Suppress during smooth-scroll from tab click to avoid flicker
      if (suppressScrollUpdate.current) return;
      // 2000's becomes active when its heading reaches within 160px of viewport top
      const r2000 = el2000.getBoundingClientRect();
      setActiveDecade(r2000.top <= 160 ? "2000s" : "2020s");
    };

    const onScroll = () => { update(); updateActive(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Tab click → immediately update visual state, then smooth-scroll
  const handleTabClick = (key: Decade) => {
    setActiveDecade(key);
    suppressScrollUpdate.current = true;
    setTimeout(() => { suppressScrollUpdate.current = false; }, 900);

    const el = decadeRefs.current[key];
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  };

  const bulletTop = scrollProgress * (trackHeight - 24);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-12 md:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center">
          <motion.p
            className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            HISTORY
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            문화사의 발자취
          </motion.h2>
        </div>

        {/* Content: Tabs + Scroll indicator + Timeline */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Tab column — sticky, z-[60] beats GNB z-50 so sub-menu doesn't swallow clicks */}
          <div className="sticky top-24 flex flex-row md:flex-col gap-3 shrink-0 md:z-[60]">
            {DECADE_LABELS.map(({ key, label }) => (
              <button
                type="button"
                key={key}
                onClick={() => handleTabClick(key)}
                className={`flex items-center px-5 py-3 md:min-w-[220px] md:px-6 md:py-4 rounded-full text-[16px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                  activeDecade === key
                    ? "bg-[var(--bg-primary)] text-white"
                    : "border border-[#D4D4D4] text-[#D4D4D4] hover:border-[var(--bg-primary)] hover:text-[var(--bg-primary)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Scroll indicator — desktop only, sticky, pointer-events-none (visual only) */}
          <div
            className="hidden md:block sticky top-24 relative w-6 shrink-0 pointer-events-none"
            style={{ height: `${trackHeight}px` }}
          >
            {/* Gray track — full height */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#E8E8E8] rounded-full" />
            {/* Orange fill — delayed track */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-[var(--bg-primary)] rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
                transition: "height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
            {/* Bullet — same transition so it stays glued to fill's end */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[var(--bg-primary)] bg-white"
              style={{
                top: `${bulletTop}px`,
                transition: "top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </div>

          {/* Timeline content */}
          <div className="flex-1 w-full flex flex-col gap-12 md:gap-16">
            {DECADE_LABELS.map(({ key, label }) => (
              <div
                key={key}
                ref={(el) => { decadeRefs.current[key] = el; }}
              >
                <div className="flex flex-col gap-5 md:gap-6">
                  <p className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[#560000]">
                    {label}
                  </p>
                  <div className="flex flex-col gap-5 md:gap-6">
                    {HISTORY[key].map((entry) => (
                      <div key={entry.year} className="flex gap-6 md:gap-8 items-start">
                        <p className="text-[16px] md:text-[20px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-heading)] whitespace-nowrap w-14 md:w-16 shrink-0 pt-[1px]">
                          {entry.year}
                        </p>
                        <div className="flex flex-col gap-3">
                          {entry.items.map((item, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                            >
                              <div className="w-[5px] h-[5px] rounded-full bg-[#1A1A1A] shrink-0 mt-[7px]" />
                              <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-heading)]">
                                {item}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {key !== "2000s" && <div className="mt-12 md:mt-16 w-full h-px bg-[#E8E8E8]" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  return (
    <div className="relative flex flex-col items-start overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        <Hero />
        <HistorySection />
      </main>
      <Footer />
    </div>
  );
}

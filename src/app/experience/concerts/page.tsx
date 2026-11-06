"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Program = {
  img: string;
  title: string;
  details: { label: string; value: string }[];
  href: string;
};

const OPEN_PROGRAMS: Program[] = [
  {
    img: "/assets/concerts-program-1.png",
    title: "함께 체험하고 즐기는 키즈콘서트",
    details: [
      { label: "대상", value: "7세 이상 자유" },
      { label: "운영시간", value: "16:00 ~ 18:00" },
      { label: "권장인원", value: "20명" },
    ],
    href: "/experience/concerts/program",
  },
];

const ENDED_PROGRAMS: Program[] = [];

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 240, damping: 20 } },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [animDone, setAnimDone] = useState(false);
  const progress    = useMotionValue(0);
  const isMobileRef = useRef(false);

  const imageTop   = useTransform(progress, (p) => `${(isMobileRef.current ? 300 : 365) * (1 - p)}px`);
  const imageSide  = useTransform(progress, (p) => `${(isMobileRef.current ? 16  : 240) * (1 - p)}px`);
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
          <Image src="/assets/concerts-list-hero.png" alt="공연/행사" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[rgba(32,32,32,0.4)]" />
        </motion.div>

        {/* Mobile pre-text */}
        <motion.div
          className="flex md:hidden absolute top-[120px] left-0 right-0 flex-col items-center gap-4 pointer-events-none px-6"
          style={{ opacity: preTextOp }}
        >
          <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
            Experience
          </p>
          <div className="text-[32px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)] text-center">
            <p>우리 아이를 위한</p>
            <p>다양한 체험 행사</p>
          </div>
        </motion.div>

        {/* Desktop pre-text */}
        <motion.div
          className="hidden md:flex absolute top-[120px] left-[240px] right-[240px] items-end justify-between pointer-events-none"
          style={{ opacity: preTextOp }}
        >
          <div className="flex flex-col gap-6 w-[464px] shrink-0">
            <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
              Experience
            </p>
            <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
              <p>우리 아이를 위한</p>
              <p>다양한 체험 행사</p>
            </div>
          </div>
          <div className="w-[830px] shrink-0">
            <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
              아이들이 직접 보고, 듣고, 느끼는 공연과 행사로 특별한 경험을 선물하세요.
            </p>
          </div>
        </motion.div>

        {/* Mobile post-text */}
        <motion.div
          className="flex md:hidden absolute inset-0 flex-col items-center justify-center gap-4 pointer-events-none z-10 px-6"
          style={{ opacity: postTextOp }}
        >
          <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">
            Experience
          </p>
          <div className="text-[32px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)] text-center">
            <p>우리 아이를 위한</p>
            <p>다양한 체험 행사</p>
          </div>
        </motion.div>

        {/* Desktop post-text */}
        <motion.div
          className="hidden md:flex absolute inset-0 items-center pointer-events-none z-10"
          style={{ opacity: postTextOp }}
        >
          <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between">
            <div className="flex flex-col gap-6 w-[464px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">
                Experience
              </p>
              <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)]">
                <p>우리 아이를 위한</p>
                <p>다양한 체험 행사</p>
              </div>
            </div>
            <div className="w-[830px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-white)]">
                아이들이 직접 보고, 듣고, 느끼는 공연과 행사로 특별한 경험을 선물하세요.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Program Card ─────────────────────────────────────────────────────────────

function ProgramCard({ program, delay }: { program: Program; delay: number }) {
  return (
    <a href={program.href} className="group block">
      <motion.div
        className="flex flex-col gap-6 pb-6"
        variants={cardItem}
        custom={delay}
      >
        <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden">
          <Image src={program.img} alt={program.title} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-[20px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
              {program.title}
            </p>
            <div className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] flex flex-col">
              {program.details.map((d) => (
                <p key={d.label}>{d.label} | {d.value}</p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)]">
            자세히 보기
            <svg
              className="transition-transform duration-200 group-hover:translate-x-1.5"
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      className="col-span-1 md:col-span-3 flex items-center justify-center py-24"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-caption-soft)]">
        {message}
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConcertsPage() {
  const [activeTab, setActiveTab] = useState<"open" | "ended">("open");
  const programs = activeTab === "open" ? OPEN_PROGRAMS : ENDED_PROGRAMS;

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />
      <Hero />

      {/* ── Program Section ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-[160px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-[80px] items-center">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start w-full">
            {/* Tabs */}
            <div className="flex flex-row md:flex-col gap-3 shrink-0">
              <button
                onClick={() => setActiveTab("open")}
                className={`flex items-center md:min-w-[220px] px-4 py-2 md:px-6 md:py-4 rounded-full text-[16px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                  activeTab === "open"
                    ? "bg-[var(--bg-primary)] text-[var(--txt-white)]"
                    : "border border-[var(--border-neutral)] text-[var(--border-neutral)] bg-transparent hover:border-[var(--bg-primary)] hover:text-[var(--bg-primary)]"
                }`}
              >
                오픈 예정 공연·행사
              </button>
              <button
                onClick={() => setActiveTab("ended")}
                className={`flex items-center md:min-w-[220px] px-4 py-2 md:px-6 md:py-4 rounded-full text-[16px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                  activeTab === "ended"
                    ? "bg-[var(--bg-primary)] text-[var(--txt-white)]"
                    : "border border-[var(--border-neutral)] text-[var(--border-neutral)] bg-transparent hover:border-[var(--bg-primary)] hover:text-[var(--bg-primary)]"
                }`}
              >
                종료된 공연·행사
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <motion.div
                key={activeTab}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {programs.length === 0 ? (
                  <EmptyState message="종료된 프로그램이 없습니다." />
                ) : (
                  programs.map((program, i) => (
                    <ProgramCard key={i} program={program} delay={i * 0.1} />
                  ))
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

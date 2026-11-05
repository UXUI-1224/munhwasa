"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
    img: "/assets/seminar-program-1.png",
    title: "연말 원아 맞춤 교육 세미나",
    details: [
      { label: "대상", value: "원장" },
      { label: "목적", value: "원아 맞춤 교육 세미나" },
      { label: "운영시간", value: "13:00 ~ 18:00" },
      { label: "장소", value: "신청 후 안내" },
      { label: "권장인원", value: "40명" },
    ],
    href: "/education/seminar/program",
  },
];

const ENDED_PROGRAMS: Program[] = [];

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 240, damping: 20 } },
};

// ─── Desktop Hero ─────────────────────────────────────────────────────────────

function DesktopHero() {
  const [animDone, setAnimDone] = useState(false);
  const progress = useMotionValue(0);

  const imageTop   = useTransform(progress, [0, 1], ["365px", "0px"]);
  const imageLeft  = useTransform(progress, [0, 1], ["240px", "0px"]);
  const imageRight = useTransform(progress, [0, 1], ["240px", "0px"]);
  const imageBR    = useTransform(progress, [0, 0.76], ["24px", "0px"]);
  const preTextOp  = useTransform(progress, [0, 0.56], [1, 0]);
  const postTextOp = useTransform(progress, [0.5, 1], [0, 1]);

  useEffect(() => {
    const TOTAL = 500;
    let acc = 0;
    let locked = true;
    let cooldown = false;

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
        acc = Math.max(0, Math.min(TOTAL, acc + e.deltaY));
        progress.set(acc / TOTAL);
        if (acc >= TOTAL) {
          locked = false;
          unlock();
          setAnimDone(true);
          cooldown = true;
          setTimeout(() => { cooldown = false; }, 500);
        }
      } else {
        if (cooldown) { e.preventDefault(); return; }
        if (window.scrollY <= 1 && e.deltaY < 0) {
          e.preventDefault();
          locked = true;
          lock();
          setAnimDone(false);
          acc = Math.max(0, Math.min(TOTAL, acc + e.deltaY));
          progress.set(acc / TOTAL);
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => { window.removeEventListener("wheel", onWheel); unlock(); };
  }, [progress]);

  return (
    <div className="relative" style={{ height: "100vh" }}>
      <section
        className="overflow-hidden bg-[var(--bg-white)]"
        style={animDone ? { position: "absolute", inset: 0 } : { position: "fixed", inset: 0, zIndex: 40 }}
      >
        <motion.div
          className="absolute overflow-hidden"
          style={{ top: imageTop, left: imageLeft, right: imageRight, bottom: "0px", borderRadius: imageBR }}
        >
          <Image src="/assets/seminar-hero.png" alt="원장 세미나" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[rgba(32,32,32,0.4)]" />
        </motion.div>

        {/* Pre-text: dark, before image expands */}
        <motion.div
          className="absolute top-[120px] left-[240px] right-[240px] flex items-end justify-between pointer-events-none"
          style={{ opacity: preTextOp }}
        >
          <div className="flex flex-col gap-6 w-[464px] shrink-0">
            <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
              Education
            </p>
            <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
              <p>더 좋은 원을 만드는</p>
              <p>원 운영의 해답</p>
            </div>
          </div>
          <div className="w-[830px] shrink-0">
            <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
              어린이집·유치원 운영 및 보육 현장에 종사하는 원장님을 위한 원장 세미나 프로그램을 소개합니다.
            </p>
          </div>
        </motion.div>

        {/* Post-text: white, after image expands */}
        <motion.div
          className="absolute inset-0 flex items-center pointer-events-none z-10"
          style={{ opacity: postTextOp }}
        >
          <div className="w-full px-[240px] flex items-end justify-between">
            <div className="flex flex-col gap-6 w-[464px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">
                Education
              </p>
              <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)]">
                <p>더 좋은 원을 만드는</p>
                <p>원 운영의 해답</p>
              </div>
            </div>
            <div className="w-[830px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-white)]">
                어린이집·유치원 운영 및 보육 현장에 종사하는 원장님을 위한 원장 세미나 프로그램을 소개합니다.
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
    <Link href={program.href} className="group block">
      <motion.div
        className="flex flex-col gap-6 pb-6"
        variants={cardItem}
        custom={delay}
      >
        <div className="relative h-[278px] rounded-[16px] overflow-hidden">
          <Image src={program.img} alt={program.title} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
              {program.title}
            </p>
            <div className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] flex flex-col">
              {program.details.map((d) => (
                <p key={d.label}>{d.label} | {d.value}</p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)]">
            신청하기
            <svg
              className="transition-transform duration-200 group-hover:translate-x-1.5"
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      className="col-span-3 flex items-center justify-center py-24"
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

export default function SeminarPage() {
  const [activeTab, setActiveTab] = useState<"open" | "ended">("open");
  const programs = activeTab === "open" ? OPEN_PROGRAMS : ENDED_PROGRAMS;

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />
      <DesktopHero />

      {/* ── Program Section ──────────────────────────────────────────────────── */}
      <section className="px-[240px] py-[160px] flex flex-col gap-[80px] items-center">

        <div className="flex gap-10 items-start w-full">
          {/* Tabs */}
          <div className="flex flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("open")}
              className={`flex items-center min-w-[220px] px-6 py-4 rounded-full text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                activeTab === "open"
                  ? "bg-[var(--bg-primary)] text-[var(--txt-white)]"
                  : "border border-[var(--border-neutral)] text-[var(--border-neutral)] bg-transparent"
              }`}
            >
              오픈 예정 세미나
            </button>
            <button
              onClick={() => setActiveTab("ended")}
              className={`flex items-center min-w-[220px] px-6 py-4 rounded-full text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                activeTab === "ended"
                  ? "bg-[var(--bg-primary)] text-[var(--txt-white)]"
                  : "border border-[var(--border-neutral)] text-[var(--border-neutral)] bg-transparent"
              }`}
            >
              종료된 세미나
            </button>
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              className="grid grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {programs.length === 0 ? (
                <EmptyState message="종료된 세미나가 없습니다." />
              ) : (
                programs.map((program, i) => (
                  <ProgramCard key={i} program={program} delay={i * 0.1} />
                ))
              )}
            </motion.div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}

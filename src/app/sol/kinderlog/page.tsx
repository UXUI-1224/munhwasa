"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

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
          <Image src="/assets/kinderlog-hero.png" alt="킨더로그" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[rgba(32,32,32,0.4)]" />
        </motion.div>

        {/* Pre-text */}
        <motion.div
          className="absolute top-[120px] left-0 right-0 pointer-events-none"
          style={{ opacity: preTextOp }}
        >
          {/* Mobile: label + title centered */}
          <div className="flex md:hidden flex-col items-center gap-4 px-6">
            <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">Solution</p>
            <h1 className="text-[36px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] text-center">
              AI 스마트 보육 솔루션<br />킨더로그를 소개합니다.
            </h1>
          </div>
          {/* Desktop: left-right layout */}
          <div className="hidden md:flex items-end justify-between pl-[240px] pr-[240px]">
            <div className="flex flex-col gap-6 w-[464px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">Solution</p>
              <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
                <p>AI 스마트 보육 솔루션</p>
                <p>킨더로그를 소개합니다.</p>
              </div>
            </div>
            <div className="w-[830px] shrink-0">
              <div className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                <p>원 안의 AI 카메라가 아이들의 하루를 관찰해,</p>
                <p>알림장·일지 초안, 행동발달·행정일지 리포트 생성 등 원의 스마트한 운영을 돕는 AI 기반 보육 솔루션입니다.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post-text */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: postTextOp }}
        >
          {/* Mobile: centered */}
          <div className="flex md:hidden flex-col items-center justify-center h-full gap-4 px-6">
            <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">Solution</p>
            <h1 className="text-[36px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-white)] text-center">
              AI 스마트 보육 솔루션<br />킨더로그를 소개합니다.
            </h1>
          </div>
          {/* Desktop: left-right layout */}
          <div className="hidden md:flex items-center h-full">
            <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between">
              <div className="flex flex-col gap-6 w-[464px] shrink-0">
                <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">Solution</p>
                <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)]">
                  <p>AI 스마트 보육 솔루션</p>
                  <p>킨더로그를 소개합니다.</p>
                </div>
              </div>
              <div className="w-[830px] shrink-0">
                <div className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-white)]">
                  <p>원 안의 AI 카메라가 아이들의 하루를 관찰해,</p>
                  <p>알림장·일지 초안, 행동발달·행정일지 리포트 생성 등 원의 스마트한 운영을 돕는 AI 기반 보육 솔루션입니다.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Step Section ─────────────────────────────────────────────────────────────

type Step = { title: string; desc: string | string[] };

function StepSection({ title, steps }: { title: string; steps: Step[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || animDone) return;

    let triggered = false;

    function runAnimation() {
      const absTop = el!.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: absTop });

      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = sw + "px";
      document.body.style.overflow = "hidden";

      setFixed(true);

      let start: number | null = null;
      const DURATION = 2200;

      function frame(ts: number) {
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / DURATION);
        setProgress(p);
        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
          setFixed(false);
          setAnimDone(true);
          const bottom = absTop + window.innerHeight;
          setTimeout(() => {
            window.scrollTo({ top: bottom, behavior: "smooth" });
          }, 300);
        }
      }

      requestAnimationFrame(frame);
    }

    function onScroll() {
      if (triggered) return;
      const rect = el!.getBoundingClientRect();
      if (rect.top <= 1) {
        triggered = true;
        runAnimation();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [animDone]);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "100vh" }}>
      <section
        className="bg-[var(--bg-gray)] w-full flex flex-col justify-center"
        style={fixed ? { position: "fixed", inset: 0, zIndex: 40 } : { position: "absolute", inset: 0 }}
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-10">
          <h2 className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
            {title}
          </h2>

          <div className="flex flex-col gap-6">
            {/* Mobile: vertical track + stacked labels */}
            <div className="flex md:hidden gap-4">
              <div className="relative w-6 shrink-0">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#E8E8E8] rounded-full" />
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-[var(--bg-primary)] rounded-full"
                  style={{ height: `${progress * 100}%` }}
                />
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-6"
                  style={{ top: `clamp(0px, calc(${progress * 100}% - 12px), calc(100% - 24px))` }}
                >
                  <Image src="/assets/sol-step-bullet.svg" alt="" fill />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                {steps.map((step, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <p className="text-[16px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                      {step.title}
                    </p>
                    {Array.isArray(step.desc)
                      ? step.desc.map((line, j) => (
                          <p key={j} className="text-[14px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                            {line}
                          </p>
                        ))
                      : (
                          <p className="text-[14px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                            {step.desc}
                          </p>
                        )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: horizontal track */}
            <div className="hidden md:block relative h-6 w-full">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#E8E8E8] rounded-full" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--bg-primary)] rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6"
                style={{ left: `calc(${progress * 100}% - 12px)` }}
              >
                <Image src="/assets/sol-step-bullet.svg" alt="" fill />
              </div>
            </div>

            {/* Desktop: 4-col labels */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                    {step.title}
                  </p>
                  {Array.isArray(step.desc)
                    ? step.desc.map((line, j) => (
                        <p key={j} className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                          {line}
                        </p>
                      ))
                    : (
                        <p className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                          {step.desc}
                        </p>
                      )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const KINDERLOG_FEATURES = [
  {
    icon: "/assets/kinderlog-feature-1.svg",
    w: 83, h: 60,
    title: "AI 카메라 설치",
    desc: ["아이 눈높이에 맞춰", "원 안에 카메라를 설치합니다."],
  },
  {
    icon: "/assets/kinderlog-feature-2.svg",
    w: 80, h: 60,
    title: "원 안에서 분석",
    desc: ["영상을 밖으로 보내지 않아", "회선 공사가 필요 없습니다."],
  },
  {
    icon: "/assets/kinderlog-feature-3.svg",
    w: 86, h: 60,
    title: "영상 자동 삭제",
    desc: ["분석이 끝나면 영상은 지우고", "글·사진, 데이터만 남깁니다."],
  },
];

const KINDERLOG_STEPS: Step[] = [
  { title: "상담 신청",    desc: "도입 문의를 남겨 주세요." },
  { title: "현장 진단·설치", desc: "원 환경에 맞춰 카메라를 설치합니다." },
  { title: "시범 운영",    desc: "실제 기록을 함께 확인합니다." },
  { title: "정식 도입",    desc: "원의 하루에 킨더로그를 더합니다." },
];

const KINDERLOG_BENEFITS = [
  {
    title: "교사",
    desc: "행정 업무는 AI 초안으로, 시간은 아이에게",
    graphic: (
      <div className="relative" style={{ width: 96, height: 110 }}>
        <Image src="/assets/kinderlog-benefit-teacher.svg" alt="" fill />
        <div className="absolute" style={{ left: 59, top: 71, width: 46, height: 46, transform: "rotate(-3.83deg)" }}>
          <Image src="/assets/kinderlog-clock.svg" alt="" fill />
        </div>
      </div>
    ),
  },
  {
    title: "원장",
    desc: "반별·아이별 기록이 데이터로, 운영을 한눈에",
    graphic: (
      <div className="relative" style={{ width: 127, height: 115 }}>
        <Image src="/assets/kinderlog-benefit-principal.svg" alt="" fill />
      </div>
    ),
  },
  {
    title: "학부모",
    desc: "오늘의 하루는 알림장·사진, 성장은 리포트로",
    graphic: (
      <div className="relative" style={{ width: 123, height: 119 }}>
        <Image src="/assets/kinderlog-benefit-parent.svg" alt="" fill />
      </div>
    ),
  },
];

export default function KinderlogPage() {
  return (
    <div className="relative flex flex-col overflow-x-clip bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        {/* Hero */}
        <Hero />

        {/* Feature section */}
        <section className="w-full bg-white py-16 md:py-[120px]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
            {/* Left: title */}
            <div className="flex flex-col gap-4 md:gap-6 shrink-0 md:sticky md:top-24">
              <div className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
                <p>설치는 간단하게,</p>
                <p>분석은 우리 원 안에서만.</p>
              </div>
            </div>

            {/* Right: 3 feature icons */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-6 w-full md:w-[830px] md:shrink-0">
              {KINDERLOG_FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex flex-row md:flex-col gap-4 md:gap-0 items-center md:items-start md:justify-between md:flex-1 md:h-[195px]"
                  initial={{ opacity: 0, scale: 0.65, y: 24 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 16, delay: i * 0.13 }}
                >
                  <div className="relative shrink-0" style={{ width: f.w, height: f.h }}>
                    <Image src={f.icon} alt={f.title} fill />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                      {f.title}
                    </p>
                    {f.desc.map((line, j) => (
                      <p key={j} className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Step indicator section */}
        <StepSection title="킨더로그 도입은 이렇게 진행됩니다." steps={KINDERLOG_STEPS} />

        {/* Benefits section */}
        <section className="w-full bg-white py-16 md:py-[120px]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col md:flex-row gap-8 md:gap-6 items-start">
            {/* Left: title + mascot */}
            <div className="flex flex-col gap-4 md:gap-0 md:justify-between md:self-stretch shrink-0 w-full md:w-[342px]">
              <div className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
                <p>킨더로그를 통해</p>
                <p>무엇을 얻을 수 있나요?</p>
              </div>
              <div className="hidden md:flex flex-col items-start">
                {/* Balloon */}
                <div className="relative inline-flex flex-col gap-0.5 bg-[var(--bg-secondary-soft)] rounded-full px-6 py-4">
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-caption)]">기록이 가벼워지면,</p>
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-caption)]">원의 하루가 달라져요!</p>
                  <div className="absolute -bottom-3 left-9 w-[21px] h-3.5">
                    <Image src="/assets/kinderlog-balloon-arrow.svg" alt="" fill />
                  </div>
                </div>
                {/* Mascot */}
                <motion.div
                  className="relative mt-5 ml-8 w-[120px] h-[122px]"
                  initial={{ scale: 0.4, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 240, damping: 12, delay: 0.1 }}
                >
                  <Image src="/assets/kinderlog-mascot.svg" alt="" fill className="scale-x-[-1]" />
                </motion.div>
              </div>
            </div>

            {/* Right: 3 cards */}
            <div className="flex flex-col md:flex-row md:flex-1 gap-4 md:gap-6">
              {KINDERLOG_BENEFITS.map((card, i) => (
                <motion.div
                  key={i}
                  className="flex flex-row md:flex-col gap-4 md:gap-0 md:flex-1 md:justify-between md:h-[342px] bg-[var(--bg-gray)] rounded-3xl p-6"
                  initial={{ opacity: 0, y: 32, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 240, damping: 20, delay: i * 0.13 }}
                >
                  <motion.div
                    className="shrink-0"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 14, delay: i * 0.13 + 0.2 }}
                  >
                    {card.graphic}
                  </motion.div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-black">{card.title}</p>
                    <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="relative w-full px-[40px] py-16 md:py-[120px] flex flex-col items-center justify-center gap-6 text-center overflow-hidden"
          style={{ background: "linear-gradient(90deg, #3D1B08 0%, #0957C8 100%)" }}
        >
          <Image src="/assets/sol-banner-bg.svg" alt="" fill className="object-cover pointer-events-none" />
          <h2 className="text-[24px] md:text-[48px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-white)] px-6">
            킨더로그를 통해<br />스마트하게 운영하세요
          </h2>
          <p className="text-[14px] md:text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-white)] opacity-80 px-6">
            우리 어린이집과 유치원에 지금 바로 킨더로그를 도입해보세요
          </p>
          <Link
            href="/contact?tab=institution"
            className="mt-2 inline-flex items-center px-4 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] hover:opacity-90 transition-opacity"
          >
            도입 상담
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

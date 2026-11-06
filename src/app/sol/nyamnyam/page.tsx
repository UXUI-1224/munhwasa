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
          <Image src="/assets/nyamnyam/nyamnyam-hero.png" alt="냠냠키즈" fill className="object-cover" priority />
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
              AI 식습관 교육 솔루션<br />냠냠키즈를 소개합니다.
            </h1>
          </div>
          {/* Desktop: left-right layout */}
          <div className="hidden md:flex items-end justify-between pl-[240px] pr-[240px]">
            <div className="flex flex-col gap-6 w-[464px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">Solution</p>
              <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
                <p>AI 식습관 교육 솔루션</p>
                <p>냠냠키즈를 소개합니다.</p>
              </div>
            </div>
            <div className="w-[830px] shrink-0">
              <div className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                <p>아이들의 식사 전후 식판을 스캔하여 음식 섭취량, 잔반량, 식사 행동 패턴 등을</p>
                <p>자동으로 기록하고 분석하는 스마트 보육 솔루션입니다.</p>
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
              AI 식습관 교육 솔루션<br />냠냠키즈를 소개합니다.
            </h1>
          </div>
          {/* Desktop: left-right layout */}
          <div className="hidden md:flex items-center h-full">
            <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between">
              <div className="flex flex-col gap-6 w-[464px] shrink-0">
                <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">Solution</p>
                <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)]">
                  <p>AI 식습관 교육 솔루션</p>
                  <p>냠냠키즈를 소개합니다.</p>
                </div>
              </div>
              <div className="w-[830px] shrink-0">
                <div className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-white)]">
                  <p>아이들의 식사 전후 식판을 스캔하여 음식 섭취량, 잔반량, 식사 행동 패턴 등을</p>
                  <p>자동으로 기록하고 분석하는 스마트 보육 솔루션입니다.</p>
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
  return (
    <div className="relative" style={{ height: "50vh" }}>
      <section
        className="bg-[var(--bg-gray)] w-full flex flex-col justify-center"
        style={{ position: "absolute", inset: 0 }}
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
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-[var(--bg-primary)] rounded-full"
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-6"
                  initial={{ top: "0%" }}
                  whileInView={{ top: "calc(100% - 24px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image src="/assets/sol/sol-step-bullet.svg" alt="" fill />
                </motion.div>
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
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--bg-primary)] rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6"
                initial={{ left: "-12px" }}
                whileInView={{ left: "calc(100% - 12px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Image src="/assets/sol/sol-step-bullet.svg" alt="" fill />
              </motion.div>
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

const NYAMNYAM_FEATURES = [
  {
    img: "/assets/nyamnyam/nyamnyam-feature-1.png",
    title: "식사 전후 식판 분석",
    desc: "아이가 식판을 스캔하면 즐거운 식사 시간이 시작됩니다.\n음식을 골고루 먹으면 과일이 열리는 성장나무 '냠냠트리'로 아이가 스스로 올바른 식습관의 동기를 얻습니다.",
  },
  {
    img: "/assets/nyamnyam/nyamnyam-feature-2.png",
    title: "식습관과 섭취량 관리",
    desc: "AI 푸드스캐너의 데이터로 원아의 식습관과 성장 현황을 관리합니다.\n원아 등록부터 식습관 리포트, 냠냠트리까지 한눈에 관리할 수 있습니다.",
  },
  {
    img: "/assets/nyamnyam/nyamnyam-feature-3.png",
    title: "식습관 교육 콘텐츠",
    desc: "식사 전에는 식습관 예절과 안전 교육 등 콘텐츠를, 식사 후에는 남긴 양에 따라 칭찬과 격려의 메시지를 전합니다.\n우리 원의 메뉴로 AI가 매일 영상을 자동으로 생성하는 'AI 작은 선생님'이, 오늘의 메뉴 소개와 편식 개선 미션으로 아이들의 즐거운 점심시간을 돕습니다.",
  },
  {
    img: "/assets/nyamnyam/nyamnyam-feature-4.png",
    title: "기관과 가정의 식습관 연계",
    desc: "원아별 식습관 리포트를 가정에 제공하여 매일 우리 아이의 식사를 보호자가 점검할 수 있습니다.\n식습관 개선 놀이 활동 '냠냠마을'의 식습관 변화에 따른 동물/작물 키우기 콘텐츠를 통해 아이가 식습관을 익히고 개선할 수 있도록 돕습니다.",
  },
];

const NYAMNYAM_STEPS: Step[] = [
  { title: "상담 신청",    desc: "도입 문의를 남겨 주세요." },
  { title: "서비스 운영 안내", desc: "기관에 서비스 운영 관련 안내 메일을 전달드립니다." },
  { title: "스캐너 설치",  desc: ["교사/운영 정보 제출 완료 후", "사전 협의한 솔루션 시작 일자 전 스캐너를 설치합니다."] },
  { title: "정식 도입",    desc: "원의 식사 시간에 냠냠키즈를 더합니다." },
];

export default function NyamnyamPage() {
  return (
    <div className="relative flex flex-col overflow-x-clip bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        {/* Hero */}
        <Hero />

        {/* Feature section */}
        <section className="w-full bg-white py-16 md:py-[120px]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col md:flex-row items-start gap-8 md:gap-6 justify-between">
            {/* Left: title */}
            <div className="flex flex-col gap-4 shrink-0 w-full md:w-[342px] md:sticky md:top-24">
              <div className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
                <p>교사와 부모가 볼 수 없는</p>
                <p>모든 순간을 데이터로 기록합니다.</p>
              </div>
            </div>

            {/* Right: 4 feature rows */}
            <div className="flex flex-col gap-10 md:gap-16 w-full md:w-[830px] md:shrink-0">
              {NYAMNYAM_FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col md:flex-row gap-4 md:gap-8 items-start"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.08 }}
                >
                  {/* Feature image */}
                  <motion.div
                    className="relative w-full md:w-[340px] md:shrink-0 rounded-2xl overflow-hidden"
                    style={{ aspectRatio: "340/240" }}
                    initial={{ scale: 0.75, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                  >
                    <Image src={f.img} alt={f.title} fill className={i === 2 ? "object-fill" : "object-cover"} />
                    <div className="absolute inset-0 bg-[rgba(255,231,161,0.16)] rounded-2xl" />
                  </motion.div>

                  {/* Text */}
                  <div className="flex flex-col gap-3 md:gap-6">
                    <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                      {f.title}
                    </p>
                    <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] whitespace-pre-line">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Step indicator section */}
        <StepSection title="냠냠키즈 도입은 이렇게 진행됩니다." steps={NYAMNYAM_STEPS} />

        {/* Benefits section */}
        <section className="w-full bg-white py-16 md:py-[120px]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col md:flex-row gap-8 md:gap-6 items-start">
            {/* Left: title + description */}
            <div className="flex flex-col gap-4 md:gap-0 md:justify-between md:self-stretch shrink-0 w-full md:w-[342px]">
              <div className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
                <p>냠냠키즈를 통해</p>
                <p>무엇을 얻을 수 있나요?</p>
              </div>
              <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                문화사는 냠냠키즈의 총판 운영을 통해 전국 교육 기관 네트워크를 확보하고 데이터를 발판 삼아 신규 교구 개발에 활용하고자 합니다.
              </p>
            </div>

            {/* Right: 3 cards */}
            <div className="flex flex-col md:flex-row md:flex-1 gap-4 md:gap-6">
              {/* Teacher card */}
              <motion.div
                className="flex flex-row md:flex-col gap-4 md:gap-0 md:flex-1 md:justify-between md:h-[342px] bg-[var(--bg-gray)] rounded-3xl p-6"
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0 }}
              >
                <motion.div
                  className="relative h-[120px] w-[120px] md:h-[200px] md:w-full shrink-0 rounded-2xl overflow-hidden border-4 border-[#A6A6A6] bg-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.15 }}
                >
                  <Image src="/assets/nyamnyam/nyamnyam-benefit-teacher.png" alt="" fill className="object-contain p-2" />
                </motion.div>
                <div className="flex flex-col gap-1">
                  <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-black">교사</p>
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                    원아별 식사 일지 작성 등 번거로운 관리 절차 경감
                  </p>
                </div>
              </motion.div>

              {/* Principal card */}
              <motion.div
                className="flex flex-row md:flex-col gap-4 md:gap-0 md:flex-1 md:justify-between md:h-[342px] bg-[var(--bg-gray)] rounded-3xl p-6"
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.13 }}
              >
                <motion.div
                  className="relative h-[120px] w-[120px] md:h-[200px] md:w-full shrink-0 rounded-2xl overflow-hidden border-4 border-[#A6A6A6] bg-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.28 }}
                >
                  <Image src="/assets/nyamnyam/nyamnyam-benefit-principal.png" alt="" fill className="object-contain p-2" />
                </motion.div>
                <div className="flex flex-col gap-1">
                  <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-black">원장</p>
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                    전문 시스템 도입으로 우리 원만의 경쟁력 확보
                  </p>
                </div>
              </motion.div>

              {/* Parent card */}
              <motion.div
                className="flex flex-row md:flex-col gap-4 md:gap-0 md:flex-1 md:justify-between md:h-[342px] bg-[var(--bg-gray)] rounded-3xl p-6"
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.26 }}
              >
                <motion.div
                  className="relative h-[120px] w-[120px] md:h-[200px] md:w-full shrink-0 rounded-2xl overflow-hidden border-4 border-[#A6A6A6] bg-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.41 }}
                >
                  <Image src="/assets/nyamnyam/nyamnyam-benefit-parent.png" alt="" fill className="object-cover" />
                </motion.div>
                <div className="flex flex-col gap-1">
                  <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-black">학부모</p>
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]">
                    가정 연계로 원에 대한 신뢰와 만족도 향상
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="relative w-full px-[40px] py-16 md:py-[120px] flex flex-col items-center justify-center gap-6 text-center overflow-hidden"
          style={{ background: "linear-gradient(90deg, #3D1B08 0%, #0957C8 100%)" }}
        >
          <Image src="/assets/sol/sol-banner-bg.svg" alt="" fill className="object-cover pointer-events-none" />
          <h2 className="text-[24px] md:text-[48px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-white)] px-6">
            냠냠키즈를 통해<br />스마트하게 운영하세요
          </h2>
          <p className="text-[14px] md:text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-white)] opacity-80 px-6">
            우리 어린이집, 유치원과 가정에 지금 바로 냠냠키즈를 도입해보세요
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

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─── Scroll-driven Hero ───────────────────────────────────────────────────────

function DesktopHero() {
  const [animDone, setAnimDone] = useState(false);
  const progress = useMotionValue(0);

  const imageTop   = useTransform(progress, [0, 1],    ["365px", "0px"]);
  const imageLeft  = useTransform(progress, [0, 1],    ["64px",  "0px"]);
  const imageRight = useTransform(progress, [0, 1],    ["64px",  "0px"]);
  const imageBR    = useTransform(progress, [0, 0.76], ["24px",  "0px"]);
  const preTextOp  = useTransform(progress, [0, 0.56], [1, 0]);
  const postTextOp = useTransform(progress, [0.5, 1],  [0, 1]);

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
    return () => {
      window.removeEventListener("wheel", onWheel);
      unlock();
    };
  }, [progress]);

  const inner = (
    <>
      <motion.div
        className="absolute overflow-hidden"
        style={{ top: imageTop, left: imageLeft, right: imageRight, bottom: "0px", borderRadius: imageBR }}
      >
        <Image src="/assets/business-hero.jpg" alt="사업 영역" fill className="object-cover object-bottom" priority />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(32,32,32,0.4) 0%, rgba(32,32,32,0.4) 100%), linear-gradient(90deg, rgba(255,242,204,0.2) 0%, rgba(255,242,204,0.2) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-[120px] left-0 right-0 flex flex-col items-center gap-4 pointer-events-none"
        style={{ opacity: preTextOp }}
      >
        <h1 className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] text-center whitespace-nowrap">
          사업 영역
        </h1>
        <div className="text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-display)] text-center max-w-[830px]">
          <p>AI 기반 관찰부터 교육 콘텐츠, 교사·부모 코칭까지</p>
          <p>영유아 교육기관의 운영과 아이의 성장을 지원합니다.</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-10"
        style={{ opacity: postTextOp }}
      >
        <h1 className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-white)] text-center whitespace-nowrap">
          사업 영역
        </h1>
        <div className="text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-white)] text-center max-w-[830px]">
          <p>AI 기반 관찰부터 교육 콘텐츠, 교사·부모 코칭까지</p>
          <p>영유아 교육기관의 운영과 아이의 성장을 지원합니다.</p>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="relative" style={{ height: "100vh" }}>
      <section
        className="overflow-hidden bg-[var(--bg-white)]"
        style={animDone ? { position: "absolute", inset: 0 } : { position: "fixed", inset: 0, zIndex: 40 }}
      >
        {inner}
      </section>
    </div>
  );
}

function MobileHero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[480px] overflow-hidden">
      <Image src="/assets/business-hero.jpg" alt="사업 영역" fill className="object-cover object-bottom" priority />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(32,32,32,0.4) 0%, rgba(32,32,32,0.4) 100%), linear-gradient(90deg, rgba(255,242,204,0.2) 0%, rgba(255,242,204,0.2) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 pt-[72px]">
        <h1 className="text-[40px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] text-center">
          사업 영역
        </h1>
        <div className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-white)] text-center max-w-[400px]">
          <p>AI 기반 관찰부터 교육 콘텐츠, 교사·부모 코칭까지</p>
          <p>영유아 교육기관의 운영과 아이의 성장을 지원합니다.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Business Section ─────────────────────────────────────────────────────────

type BizCardProps = {
  icon: string;
  iconAlt: string;
  title: string;
  desc: string[];
  tags: string[];
  delay?: number;
};

const bounce: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

function BizCard({ icon, iconAlt, title, desc, tags, delay = 0 }: BizCardProps) {
  return (
    <motion.div
      className="group flex flex-col gap-6 h-full px-10 py-12 rounded-3xl bg-[var(--bg-gray)] hover:bg-[#0957C8] transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div className="flex flex-col flex-1 items-start justify-between">
        {/* Icon — bouncy pop (overshoot bezier) */}
        <motion.div
          className="relative w-[140px] h-[140px] shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: bounce, delay: delay + 0.18 }}
        >
          <Image src={icon} alt={iconAlt} fill className="object-contain" />
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: delay + 0.3 }}
        >
          <p className="text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] group-hover:text-[#FBFBFB] transition-colors duration-300">
            {title}
          </p>
          <div className="text-[20px] font-normal leading-[1.4] tracking-[-0.01em] text-[var(--txt-body)] group-hover:text-[#E8E8E8] transition-colors duration-300">
            {desc.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </motion.div>
      </div>

      {/* Divider + tags */}
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease, delay: delay + 0.42 }}
      >
        <div className="w-full h-px bg-[#D4D4D4] group-hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-300" />
        <div className="flex flex-col gap-2 text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] group-hover:text-[#E8E8E8] transition-colors duration-300">
          {tags.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BusinessSection() {
  return (
    <section className="w-full bg-[var(--bg-white)] py-24">
      <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center">
          <motion.p
            className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            BUSINESS
          </motion.p>
          <motion.h2
            className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            문화사가 하는 일
          </motion.h2>
        </div>

        {/* Cards grid with center logo circle */}
        <div className="relative w-full" style={{ height: 1400 }}>
          {/* Center orange circle with logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full w-[300px] h-[300px]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgb(255,191,128) 20%, rgba(255,128,0,0.9) 50%, rgb(255,191,128) 80%, rgba(255,255,255,0) 100%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: bounce, delay: 0 }}
          >
            <div className="relative w-[160px] h-[72px]">
              <Image src="/assets/logo-white.svg" alt="문화사" fill className="object-contain" />
            </div>
          </motion.div>

          {/* Background track — infinite rotation */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1104px] h-[1104px] pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Image src="/assets/biz-back-track.svg" alt="" fill className="object-contain" />
          </motion.div>

          {/* AI card — top left */}
          <div className="absolute top-0 left-0 w-[464px] h-[600px]">
            <BizCard
              icon="/assets/biz-ai-icon.svg"
              iconAlt="AI 솔루션"
              title="AI·데이터 솔루션"
              desc={["AI가 아이의 하루를 관찰하고 데이터로 기록해", "효율적인 교육 운영과 가정 교육을 돕습니다."]}
              tags={["AI 행동관찰 솔루션 킨더로그 운영", "식습관 분석 솔루션 냠냠키즈 운영"]}
              delay={0.2}
            />
          </div>

          {/* Edu card — top right */}
          <div className="absolute top-0 right-0 w-[464px] h-[600px]">
            <BizCard
              icon="/assets/biz-edu-icon.svg"
              iconAlt="교육 및 코칭"
              title="교육 및 코칭"
              desc={["교사와 부모, 원장이 아이를 더 깊이 이해하도록", "현장에 맞는 코칭과 세미나로 함께합니다."]}
              tags={["아이 행동 정서 이해 교사 직무연수", "사회 정서 역량을 키울 수 있는 성장 클래스", "부모를 위한 학부모 프로그램"]}
              delay={0.35}
            />
          </div>

          {/* Program card — bottom left */}
          <div className="absolute bottom-0 left-0 w-[464px] h-[600px]">
            <BizCard
              icon="/assets/biz-program-icon.svg"
              iconAlt="체험/프로그램"
              title="체험/프로그램"
              desc={["온 가족이 함께하는 현장에서", "아이에게 특별한 경험을 선사합니다."]}
              tags={["정서와 공감을 키우는 찾아가는 음악회", "참여형 오프라인 콘텐츠 소통오락관"]}
              delay={0.5}
            />
          </div>

          {/* Contents card — bottom right */}
          <div className="absolute bottom-0 right-0 w-[464px] h-[600px]">
            <BizCard
              icon="/assets/biz-contents-icon.svg"
              iconAlt="교구 및 콘텐츠"
              title="교구 및 콘텐츠"
              desc={["손에 닿는 교구와 이야기로", "아이의 놀이가 자연스럽게 배움이 됩니다."]}
              tags={["전통/언어 놀이 교구 - 한입에꿀떡, 힘내윷 개발", "생활/역할 놀이 교구 - 킨텐도, 홈스윗홈 개발", "AI 솔루션 관찰 데이터를 바탕으로 한 자사 교구 플레이넥스트"]}
              delay={0.65}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  return (
    <div className="relative flex flex-col items-start overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        <div className="lg:hidden"><MobileHero /></div>
        <div className="hidden lg:block"><DesktopHero /></div>
        <BusinessSection />
      </main>
      <Footer />
    </div>
  );
}

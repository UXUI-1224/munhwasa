"use client";
import Image from "next/image";
import { motion } from "motion/react";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

type StatCardProps = {
  num: string;
  unit: string;
  title: string;
  desc: string | string[];
  imgSrc?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  size?: "large" | "small";
  delay?: number;
};

function StatCard({
  num,
  unit,
  title,
  desc,
  imgSrc,
  imgAlt = "",
  imgWidth = 180,
  imgHeight = 172,
  size = "large",
  delay = 0,
}: StatCardProps) {
  const isLarge = size === "large";
  const numSize = isLarge ? "text-[64px]" : "text-[48px]";

  return (
    <motion.div
      className={`relative flex flex-col items-start bg-[var(--bg-white)] rounded-2xl p-8 overflow-hidden ${
        isLarge ? "h-[340px] w-[522px]" : "size-[340px]"
      }`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div className="flex flex-col gap-8 w-full">
        {/* Number */}
        <div className="flex items-end gap-0.5">
          <span
            className={`${numSize} font-semibold leading-none tracking-[-0.04em] text-[var(--gray-900)] whitespace-nowrap`}
          >
            {num}
          </span>
          <span className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--gray-900)] whitespace-nowrap">
            {unit}
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
          <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--gray-800)]">
            {title}
          </p>
          <div className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--gray-500)]">
            {Array.isArray(desc)
              ? desc.map((line, i) => <p key={i}>{line}</p>)
              : desc.split("\n").map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
      </div>

      {/* Icon / Graphic */}
      {imgSrc && (
        <div className="absolute bottom-8 right-6 pointer-events-none">
          <Image src={imgSrc} alt={imgAlt} width={imgWidth} height={imgHeight} />
        </div>
      )}
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative w-full bg-[var(--blue-050)] py-[160px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full relative flex items-start justify-between">

        {/* Left title */}
        <div className="w-[342px] shrink-0 flex flex-col items-start">
          <motion.h2
            className="text-[44px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-display)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            숫자로 말하는<br />문화사의 오늘
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="relative flex flex-col gap-6 w-[1068px] shrink-0">
          {/* Decorative asterisks — relative to card grid */}
          <Image src="/assets/stats-graphic-1.svg" alt="" width={80} height={89} className="absolute pointer-events-none" style={{ right: -100, top: -45 }} />
          <Image src="/assets/stats-graphic-1.svg" alt="" width={80} height={89} className="absolute pointer-events-none" style={{ left: -100, bottom: -44 }} />
        {/* Row 1: two large cards */}
        <div className="flex gap-6">
          <StatCard
            num="2,000"
            unit="개+"
            title="함께 하는 교육기관"
            desc={["전국 유치원·어린이집과 함께하는", "파트너 네트워크"]}
            imgSrc="/assets/stats-icon-1.svg"
            imgWidth={180}
            imgHeight={172}
            size="large"
            delay={0}
          />
          <StatCard
            num="20"
            unit="개"
            title="전국 권역 네트워크"
            desc={["전국 권역 지사 운영 및", "영업 파트너 네트워크"]}
            imgSrc="/assets/stats-icon-2.svg"
            imgWidth={170}
            imgHeight={171}
            size="large"
            delay={0.1}
          />
        </div>

        {/* Row 2: three small cards */}
        <div className="flex gap-6">
          <StatCard
            num="10"
            unit="년 이상"
            title="핵심 인력 노하우"
            desc={["유아 관련 기업 경력", "10년 이상의 인력 중심 구성"]}
            size="small"
            delay={0}
          />
          <StatCard
            num="100,000"
            unit="+"
            title="누적 교구 판매"
            desc={["자체 개발 교구 4종 누적 판매량", "(2021~2023년 기준)"]}
            size="small"
            delay={0.1}
          />
          <StatCard
            num="100"
            unit="회+"
            title="누적 프로그램 운영"
            desc={["영유아 기관·교사·학부모 대상", "프로그램 기획 및 운영 누적 횟수"]}
            size="small"
            delay={0.2}
          />
        </div>
      </div>
    </div>
    </section>
  );
}

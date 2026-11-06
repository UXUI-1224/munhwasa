"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

// ─── Program Data ─────────────────────────────────────────────────────────────

const PROGRAM = {
  category: "교육/코칭",
  title: "2027년 유아 교육 코칭",
  date: "2026-10-27",
  views: 312,
  img: "/assets/education-program-1.png",
  details: [
    { label: "대상", value: "신규 어린이집 교사" },
    { label: "목적", value: "2027년 유아 교육 코칭" },
    { label: "운영시간", value: "13:00 ~ 14:00" },
    { label: "신청오픈", value: "26/12/07" },
    { label: "권장인원", value: "20명" },
  ],
  body: `2027년을 대비하는 유아 교육 현장의 선생님들을 위한 전문 코칭 프로그램입니다.

빠르게 변화하는 교육 환경 속에서 아이들의 발달 단계에 맞는 올바른 교육 방향을 함께 고민하고, 현장에서 바로 적용할 수 있는 실전 코칭을 제공합니다. 아이의 사회·정서 발달부터 인지 발달, 언어 발달까지 균형 있는 유아 교육 역량을 갖출 수 있도록 문화사의 전문 코치진이 함께합니다.

참가 신청은 신청오픈일에 맞춰 별도 채널로 진행되며, 선착순으로 마감됩니다. 자세한 사항은 문의 바랍니다.`,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EducationProgramPage() {
  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />

      {/* ── Dark Hero ────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[450px] flex items-center justify-center overflow-hidden pt-[64px]">
        <div className="absolute inset-0 bg-[#2a1e18]" />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/education-program-1.png"
            alt=""
            fill
            className="object-cover object-center opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]" />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-3 pb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[#E8E8E8]">
            {PROGRAM.category}
          </p>
          <div className="w-9 h-[1px] bg-[#E8E8E8] opacity-60" />
          <p className="text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[#E8E8E8] text-center">
            {PROGRAM.title}
          </p>
        </motion.div>
      </section>

      {/* ── Article Content ──────────────────────────────────────────────────── */}
      <section className="pt-10 pb-[160px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-9">

        {/* Meta */}
        <div className="flex gap-[10px] items-center text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--txt-black)]">
          <span>{PROGRAM.date}</span>
        </div>

        {/* Main image */}
        <motion.div
          className="relative w-full rounded-[16px] overflow-hidden"
          style={{ aspectRatio: "1440/720" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image src={PROGRAM.img} alt={PROGRAM.title} fill className="object-cover" />
        </motion.div>

        {/* Program details */}
        <motion.div
          className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] flex flex-col"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        >
          {PROGRAM.details.map((d) => (
            <p key={d.label}>{d.label} | {d.value}</p>
          ))}
        </motion.div>

        {/* Body text */}
        <motion.div
          className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] whitespace-pre-line break-keep"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          {PROGRAM.body}
        </motion.div>

        {/* 목록 button */}
        <div className="flex items-start">
          <Link
            href="/education/teacher"
            className="flex items-center justify-center px-5 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] hover:opacity-90 transition-opacity"
          >
            목록
          </Link>
        </div>

        {/* 오픈 예정 — floating, disabled */}
        <button
          disabled
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center min-w-[200px] px-4 py-4 rounded-full bg-[#A6A6A6] text-[18px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#D4D4D4] cursor-not-allowed"
        >
          오픈 예정
        </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

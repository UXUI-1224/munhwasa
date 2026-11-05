"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

// ─── Program Data ─────────────────────────────────────────────────────────────

const PROGRAM = {
  category: "공연/행사",
  title: "함께 체험하고 즐기는 키즈콘서트",
  date: "2026-10-27",
  views: 186,
  img: "/assets/concerts-program-1.png",
  details: [
    { label: "대상", value: "7세 이상 자유" },
    { label: "운영시간", value: "16:00 ~ 18:00" },
    { label: "장소", value: "신청 후 안내" },
    { label: "신청오픈", value: "26/11/16" },
    { label: "권장인원", value: "20명" },
  ],
  body: `아이들이 직접 보고, 듣고, 참여하는 특별한 키즈콘서트 프로그램입니다.

전문 아티스트와 함께하는 공연과 체험 활동으로 아이들의 감수성과 창의력을 키워줍니다. 음악과 퍼포먼스, 그리고 직접 참여하는 체험 프로그램으로 아이들이 오감으로 느끼는 소중한 추억을 만들어 드립니다.

신청은 신청오픈일 이후 별도 채널을 통해 선착순으로 진행됩니다. 자세한 사항은 문의 바랍니다.`,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConcertsProgramPage() {
  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />

      {/* ── Dark Hero ────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[450px] flex items-center justify-center overflow-hidden pt-[64px]">
        <div className="absolute inset-0 bg-[#2a1e18]" />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/concerts-program-1.png"
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
      <section className="px-[240px] pt-10 pb-[160px] flex flex-col gap-9">

        {/* Meta */}
        <div className="flex gap-[10px] items-center text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--txt-black)]">
          <span>{PROGRAM.date}</span>
          <span>조회수 {PROGRAM.views}</span>
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
            href="/experience/concerts"
            className="flex items-center justify-center px-4 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] hover:opacity-90 transition-opacity"
          >
            목록
          </Link>
        </div>

        {/* 신청 마감 — floating, disabled */}
        <button
          disabled
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center min-w-[200px] px-4 py-4 rounded-full bg-[#A6A6A6] text-[18px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#D4D4D4] cursor-not-allowed"
        >
          신청 마감
        </button>
      </section>

      <Footer />
    </div>
  );
}

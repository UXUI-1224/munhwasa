"use client";
import { ReactNode, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

// 카드 1·3: y + rotate
const charVariants = {
  rest:  { y: 0,   rotate: -12 },
  hover: { y: -24, rotate: 0 },
};

// 카드 2: 좌우반전(scaleX) + y + rotate
const charVariantsFlipped = {
  rest:  { y: 0,   rotate: 12, scaleX: -1 },
  hover: { y: -24, rotate: 0,  scaleX: -1 },
};

type CardData = {
  title: string;
  description: string;
  bg: string;
  char: ReactNode;
};

function BusinessCard({
  title,
  description,
  bg,
  char,
  index,
}: CardData & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 768) return; // 모바일에서만
        setMobileActive(entry.isIntersecting);
      },
      { threshold: 0.55 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl w-full md:flex-1 md:min-w-0 aspect-[4/3] md:aspect-[3/4] ${bg}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: 0.6 + index * 0.1 }}
    >
      {/* hover host — "hover" variant 하위로 전파 */}
      <motion.div
        className="relative flex flex-col justify-between h-full p-6 md:p-8"
        initial="rest"
        whileHover="hover"
        animate={mobileActive ? "hover" : "rest"}
      >
        {/* 텍스트 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <p className="text-[20px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
            {title}
          </p>
          <p
            className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {char}
      </motion.div>
    </motion.div>
  );
}

const CARDS: CardData[] = [
  /* ── 카드 1 · AI·데이터 솔루션 ─────────────────────────── */
  {
    title: "AI·데이터 솔루션",
    description:
      "AI가 아이의 하루를 관찰하고 데이터로 기록해 효율적인 교육 운영과 가정 교육을 돕습니다.",
    bg: "bg-[var(--bg-secondary-softer)]",
    char: (
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none opacity-90"
        style={{ top: "60%", right: "-20%", bottom: "-20%", left: "40%" }}
        variants={charVariants}
        transition={{ duration: 0.35, ease }}
      >
        <Image src="/assets/character-1.svg" alt="" width={180} height={180} />
      </motion.div>
    ),
  },

  /* ── 카드 2 · 교육 및 코칭 ───────────────────────────── */
  {
    title: "교육 및 코칭",
    description:
      "교사와 부모, 원장이 아이를 깊이 이해하도록 현장에 맞는 코칭과 세미나로 함께합니다.",
    bg: "bg-[var(--bg-primary-softer)]",
    char: (
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none opacity-90"
        style={{ top: "60%", right: "-20%", bottom: "-20%", left: "40%" }}
        variants={charVariantsFlipped}
        transition={{ duration: 0.35, ease }}
      >
        <Image src="/assets/character-2.svg" alt="" width={180} height={180} />
      </motion.div>
    ),
  },

  /* ── 카드 3 · 체험 프로그램 ─────────────────────────────── */
  {
    title: "체험 프로그램",
    description:
      "온 가족이 함께하는 현장에서,<br/>아이에게 특별한 경험을 선사합니다.",
    bg: "bg-[var(--bg-secondary-softer)]",
    char: (
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none opacity-90"
        style={{ top: "60%", right: "-20%", bottom: "-20%", left: "40%" }}
        variants={charVariants}
        transition={{ duration: 0.35, ease }}
      >
        <Image src="/assets/character-3.svg" alt="" width={180} height={180} />
      </motion.div>
    ),
  },

  /* ── 카드 4 · 교육 및 콘텐츠 ───────────────────────────── */
  {
    title: "교육 및 콘텐츠",
    description:
      "손에 닿는 교구와 이야기로,<br/>아이의 놀이가 자연스럽게 배움이 됩니다.",
    bg: "bg-[var(--bg-primary-softer)]",
    char: (
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none opacity-90"
        style={{ top: "60%", right: "-20%", bottom: "-20%", left: "40%" }}
        variants={charVariants}
        transition={{ duration: 0.35, ease }}
      >
        <Image src="/assets/character-4.svg" alt="" width={180} height={180} />
      </motion.div>
    ),
  },
];

export default function BusinessSection() {
  return (
    <section className="w-full py-[80px] md:py-[160px] bg-[var(--bg-white)]">
      <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-[40px] md:gap-[80px]">
        {/* 섹션 타이틀 */}
        <div className="w-full md:w-[464px]">
          <motion.h2
            className="text-[28px] md:text-[44px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-display)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            영유아 교육기관 운영과<br />아이의 성장을 지원합니다
          </motion.h2>
        </div>

        {/* 카드 목록 */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
          {CARDS.map((card, i) => (
            <BusinessCard key={i} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

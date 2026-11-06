"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─── Scroll-driven Hero (mobile + desktop unified) ───────────────────────────

function Hero() {
  const [animDone, setAnimDone] = useState(false);
  const progress    = useMotionValue(0);
  const isMobileRef = useRef(false);

  // Functional transforms — read isMobileRef so responsive values update on resize
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

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const delta = touchStartY - e.touches[0].clientY; // positive = swipe up
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
        {/* Image */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ top: imageTop, left: imageSide, right: imageSide, bottom: "0px", borderRadius: imageBR }}
        >
          <Image src="/assets/about-hero.png" alt="About 문화사" fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(32,32,32,0.3) 0%, rgba(32,32,32,0.3) 100%), linear-gradient(90deg, rgba(255,242,204,0.4) 0%, rgba(255,242,204,0.4) 100%)",
            }}
          />
        </motion.div>

        {/* Pre-scroll: 배경 위 검정 텍스트 */}
        <motion.div
          className="absolute top-[120px] left-0 right-0 flex flex-col items-center gap-4 pointer-events-none px-6"
          style={{ opacity: preTextOp }}
        >
          <h1 className="text-[36px] md:text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] text-center">
            About 문화사
          </h1>
          <div className="text-[16px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-display)] text-center max-w-[830px]">
            <p>AI 기반 관찰과 교육 콘텐츠, 교사·부모 코칭을 연결하여</p>
            <p>영유아 교육기관의 운영과 아이의 성장을 지원하는 교육 솔루션 기업</p>
          </div>
        </motion.div>

        {/* Post-scroll: full-bleed 이미지 위 흰 텍스트 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-10 px-6"
          style={{ opacity: postTextOp }}
        >
          <h1 className="text-[36px] md:text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-white)] text-center">
            About 문화사
          </h1>
          <div className="text-[16px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-white)] text-center max-w-[830px]">
            <p>AI 기반 관찰과 교육 콘텐츠, 교사·부모 코칭을 연결하여</p>
            <p>영유아 교육기관의 운영과 아이의 성장을 지원하는 교육 솔루션 기업</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Philosophy Section ───────────────────────────────────────────────────────

type ValueItemProps = {
  num: string;
  title: string;
  body: string[];
  imgSrc: string;
  delay?: number;
};

function ValueItem({ num, title, body, imgSrc, delay = 0 }: ValueItemProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[464px_1fr] gap-6 items-center w-full">
      {/* Text */}
      <motion.div
        className="flex flex-col gap-4 md:gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease, delay }}
      >
        <p className="text-[24px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)]">
          {title}
        </p>
        <div className="text-[16px] md:text-[18px] font-normal leading-[1.6] tracking-[-0.04em] text-[var(--txt-body)]">
          {body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "708 / 410" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease, delay: delay + 0.1 }}
      >
        <Image
          src={imgSrc}
          alt={`${num} ${title}`}
          fill
          className="object-cover object-bottom"
        />
      </motion.div>
    </div>
  );
}

const VALUES: ValueItemProps[] = [
  {
    num: "01",
    title: "관찰",
    body: [
      "AI가 아이의 놀이 행동과 식습관, 또래 관계를 세심하게 살핍니다.",
      "교사가 미처 담아내기 어려운 일상의 순간까지,",
      "아이의 하루를 놓치지 않고 바라봅니다.",
    ],
    imgSrc: "/assets/about-value-1.png",
    delay: 0,
  },
  {
    num: "02",
    title: "데이터",
    body: [
      "흩어진 관찰은 의미 있는 기록으로 쌓입니다.",
      "아이만의 성장 패턴과 변화의 신호를 데이터로 읽어내어,",
      "감이 아닌 근거로 아이를 이해합니다.",
    ],
    imgSrc: "/assets/about-value-2.png",
    delay: 0,
  },
  {
    num: "03",
    title: "연결",
    body: [
      "데이터는 아이 한 명 한 명에게 맞는 교육 경험으로 이어집니다.",
      "아이는 놀이 속에서 자연스럽게 배우고",
      "교사와 가정은 아이의 성장을 함께 확인합니다.",
    ],
    imgSrc: "/assets/about-value-3.png",
    delay: 0,
  },
  {
    num: "04",
    title: "지원",
    body: [
      "관찰과 기록의 부담은 덜고, 교육의 질은 높입니다.",
      "문화사는 교사의 곁에서 운영을 돕고",
      "가정과 함께 아이의 다음 걸음을 설계합니다.",
    ],
    imgSrc: "/assets/about-value-4.png",
    delay: 0,
  },
];

function PhilosophySection() {
  return (
    <section className="w-full bg-[var(--bg-white)] py-[160px]">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 xl:px-6 flex flex-col gap-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-6 items-center">
          <motion.p
            className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)] text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            OUR VALUE
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)] text-center"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            문화사의 철학
          </motion.h2>
        </div>

        {/* Value items */}
        <div className="flex flex-col gap-16 xl:gap-10">
          {VALUES.map((item) => (
            <ValueItem key={item.num} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CI Section ──────────────────────────────────────────────────────────────

type ColorSwatchProps = {
  bg: string;
  textColor: string;
  name: string;
  hex: string;
  desc: string;
  index: number;
};

function ColorSwatch({ bg, textColor, name, hex, desc, index }: ColorSwatchProps) {
  return (
    <motion.div
      className="aspect-square rounded-2xl p-4 flex flex-col justify-between flex-1 min-w-0"
      style={{ backgroundColor: bg, color: textColor }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: 0.05 * index }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-semibold leading-[1.6] tracking-[-0.04em] whitespace-nowrap">{name}</p>
        <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] whitespace-nowrap">{hex}</p>
      </div>
      <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em]">{desc}</p>
    </motion.div>
  );
}

const COLOR_SWATCHES: Omit<ColorSwatchProps, "index">[] = [
  {
    bg: "#2A1E18",
    textColor: "#FBFBFB",
    name: "Brand Primary",
    hex: "#2A1E18",
    desc: "문화사 시그니처의 주 색상",
  },
  {
    bg: "#FFF6EE",
    textColor: "#1A1A1A",
    name: "Brand Secondary",
    hex: "#FFF6EE",
    desc: "문화사 시그니처의 보조 색상",
  },
  {
    bg: "#FF8000",
    textColor: "#FBFBFB",
    name: "Primary",
    hex: "#FF8000",
    desc: "문화사 홈페이지의 주 색상",
  },
  {
    bg: "#0957C8",
    textColor: "#FBFBFB",
    name: "Secondary",
    hex: "#0957C8",
    desc: "문화사 홈페이지의 보조 색상",
  },
  {
    bg: "#FBFBFB",
    textColor: "#1A1A1A",
    name: "White",
    hex: "#FBFBFB",
    desc: "문화사 홈페이지의 시스템 색상",
  },
  {
    bg: "#1A1A1A",
    textColor: "#FBFBFB",
    name: "Black",
    hex: "#1A1A1A",
    desc: "문화사 홈페이지의 시스템 색상",
  },
];

function CISection() {
  return (
    <section className="w-full bg-[var(--bg-gray)] py-[120px]">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 xl:px-6 flex flex-col gap-[64px]">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            CI
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            문화사의 철학을 담은 CI
          </motion.h2>
        </div>

        {/* Logo System */}
        <div className="flex flex-col gap-[120px]">
          <div className="flex flex-col gap-12">
            <motion.h3
              className="text-[24px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              로고 시스템
            </motion.h3>

            <div className="flex flex-row gap-4 md:gap-6">
              {/* Primary Signature */}
              <div className="flex flex-col gap-4 flex-1">
                <motion.div
                  className="bg-[var(--bg-white)] rounded-2xl flex items-center justify-center aspect-square md:aspect-auto md:h-[398px]"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0 }}
                >
                  <Image
                    src="/assets/logo-vertical.svg"
                    alt="문화사 Primary Signature"
                    width={360}
                    height={162}
                    className="w-[80px] sm:w-[240px] md:w-[360px] h-auto"
                  />
                </motion.div>
                <motion.p
                  className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.1 }}
                >
                  Primary Signature
                </motion.p>
              </div>

              {/* Secondary Signature */}
              <div className="flex flex-col gap-4 flex-1">
                <motion.div
                  className="bg-[var(--bg-white)] rounded-2xl flex items-center justify-center aspect-square md:aspect-auto md:h-[398px]"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.1 }}
                >
                  <Image
                    src="/assets/logo-horizontal.svg"
                    alt="문화사 Secondary Signature"
                    width={476}
                    height={60}
                    className="w-[100px] sm:w-[320px] md:w-[476px] h-auto"
                  />
                </motion.div>
                <motion.p
                  className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.2 }}
                >
                  Secondary Signature
                </motion.p>
              </div>
            </div>
          </div>

          {/* Color System */}
          <div className="flex flex-col gap-12">
            <motion.h3
              className="text-[24px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              컬러 시스템
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {COLOR_SWATCHES.map((s, i) => (
                <ColorSwatch key={s.name} {...s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="relative flex flex-col items-start overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />

      <main className="flex flex-col w-full">
        <Hero />
        <PhilosophySection />
        <CISection />
      </main>

      <Footer />
    </div>
  );
}

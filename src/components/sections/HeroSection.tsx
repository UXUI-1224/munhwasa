"use client";
import { useEffect } from "react";
import { motion } from "motion/react";

// ─── Shared easing ──────────────────────────────────────────────────────────

const springEase = (t: number): number =>
  1 -
  Math.exp(-t * 11.1803) *
    (Math.cos(t * 0.1581) + 70.7054 * Math.sin(t * 0.1581));

const smoothBezier = [0.5, 0, 0.5, 1] as [number, number, number, number];
const revealEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

// ─── Animation timing (seconds) ─────────────────────────────────────────────

const T = {
  yellowPillReveal: 0,    // Yellow pill clip-path reveal
  yellowPillAnim:   0.6,  // Yellow pill internal animations start
  textHaru:         1.05, // "아이의 하루를" clip-path reveal
  bluePillReveal:   1.65, // Blue pill clip-path reveal
  textGwanchal:     2.25, // "관찰하고" clip-path reveal
  bluePillAnim:     2.25, // Blue pill internal animations start
  textConnect:      2.75, // "기관과 가정을 연결" text fade-in start
  greenPillReveal:  3.35, // Green pill clip-path reveal
  greenPillAnim:    3.35, // Green pill internal animations start
  textEnd:          3.95, // "합니다" text fade-in start
  desc:             4.25, // Description clip-path reveal
  cta1:             4.85, // CTA buttons fade in
};

// ─── Yellow Pill ─────────────────────────────────────────────────────────────

function YellowPill({ animDelay = 0 }: { animDelay?: number }) {
  return (
    <div
      className="relative shrink-0 rounded-full bg-[#FFE54F] overflow-hidden"
      style={{ width: 333, height: 100 }}
    >
      {/* Vector6 arch (1st block) */}
      <motion.div
        className="absolute"
        style={{ top: "59%", right: "51.59%", bottom: "8.51%", left: "30.64%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: {
            duration: 3, times: [0, 0.03, 0.13, 1],
            ease: ["linear", smoothBezier, "linear"],
            delay: animDelay, repeat: 0,
          },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/hero-graphic-1-3.svg" alt="" className="w-full h-full rotate-[6.72deg] origin-center" />
      </motion.div>

      {/* Vector7 sparkle (last block) */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ width: 15, height: 11.5, left: 155, top: 43 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: {
            duration: 3, times: [0, 0.22, 0.34, 1],
            ease: ["linear", smoothBezier, "linear"],
            delay: animDelay, repeat: 0,
          },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/hero-graphic-1-4.svg" alt="" className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Background rect */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 167.9, height: 190.4, left: 221.98, top: -49.93 }}
        initial={{ x: 0 }}
        animate={{ x: [0, -20, -20] }}
        transition={{
          x: { duration: 3, times: [0, 0.2015, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        <div className="flex-none -rotate-[16.25deg]">
          <div className="bg-[#FFF2A7]" style={{ width: 127.95, height: 161.03 }} />
        </div>
      </motion.div>

      {/* Character */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 161.95, height: 161.93, left: 206.19, top: -4.82 }}
        initial={{ rotate: 155.936, x: 0, y: 12 }}
        animate={{
          rotate: [155.936, 155.936, 161.821, 161.821],
          x: [0, 0, -20, -20],
          y: [12, 12, 0, 0],
        }}
        transition={{
          rotate: { duration: 3, times: [0, 0.0984, 0.3, 1], ease: ["linear", springEase, "linear"], delay: animDelay, repeat: 0 },
          x: { duration: 3, times: [0, 0.0984, 0.2994, 1], ease: ["linear", springEase, "linear"], delay: animDelay, repeat: 0 },
          y: { duration: 3, times: [0, 0.0984, 0.2994, 1], ease: ["linear", springEase, "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="-scale-y-100 flex-none">
          <div className="relative overflow-hidden" style={{ width: 128.33, height: 128.3 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/home/hero-chara-1.svg" alt="" className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </motion.div>

      {/* Book1 */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 118.65, height: 92.06, left: -16, top: 35.15 }}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: [0, 0, 1, 1], x: [0, 0, 28, 28] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.0985, 0.2994, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
          x: { duration: 3, times: [0, 0.0984, 0.2994, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        <div className="flex-none rotate-[10.13deg]">
          <div className="relative overflow-hidden" style={{ width: 107.24, height: 74.36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/home/hero-graphic-1-1.svg" alt="" className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </motion.div>

      {/* Book2 */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ width: 59.27, height: 63.27, left: 21, top: -25 }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 0, 1, 1], y: [0, 0, 16, 16] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.0984, 0.2989, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
          y: { duration: 3, times: [0, 0.0984, 0.2989, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/hero-graphic-1-2.svg" alt="" className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Green bar (2nd block) */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 33.956, height: 15.55, left: 86, top: 29 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.09, 0.18, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="-rotate-[13.63deg]">
          <div className="bg-[#84C944] rounded-[2px]" style={{ width: 33, height: 8 }} />
        </div>
      </motion.div>

      {/* Purple bar (3rd block) */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 24.21, height: 12.25, left: 107, top: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.15, 0.24, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="rotate-[10.97deg]">
          <div className="bg-[#B494FA] rounded-[2px]" style={{ width: 23.11, height: 8 }} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Blue Pill ────────────────────────────────────────────────────────────────

function BluePill({ animDelay = 0 }: { animDelay?: number }) {
  return (
    <div
      className="relative shrink-0 rounded-full bg-[#0957C8] overflow-hidden"
      style={{ width: 333, height: 100 }}
    >
      {/* Background rect */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 207.21, height: 193.74, left: -70.21, top: -52.14 }}
        initial={{ x: -47.792 }}
        animate={{ x: [-47.792, -8.792, -8.792] }}
        transition={{
          x: { duration: 3, times: [0, 0.198, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        <div className="-scale-y-100 flex-none -rotate-[163.75deg]">
          <div className="bg-[#3487FF]" style={{ width: 171.58, height: 151.78 }} />
        </div>
      </motion.div>

      {/* Character */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ top: "-12.94%", right: "38.66%", bottom: "-38.74%", left: "2.7%" }}
        initial={{ rotate: -19.431, x: 1.923, y: 6.809 }}
        animate={{
          rotate: [-19.431, -19.431, -11.431, -11.431],
          x: [1.923, 1.923, 5.001, 5.001],
          y: [6.809, 6.809, -0.274, -0.274],
        }}
        transition={{
          rotate: { duration: 3, times: [0, 0.0986, 0.2994, 1], ease: ["linear", springEase, "linear"], delay: animDelay, repeat: 0 },
          x: { duration: 3, times: [0, 0.0986, 0.2994, 1], ease: ["linear", springEase, "linear"], delay: animDelay, repeat: 0 },
          y: { duration: 3, times: [0, 0.0986, 0.2994, 1], ease: ["linear", springEase, "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="w-full h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/hero-chara-2.svg" alt="" className="absolute inset-0 w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Camera */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 88.61, height: 69.61, left: 242.75, top: 25.68 }}
        initial={{ opacity: 0, x: 20.001 }}
        animate={{ opacity: [0, 0, 1, 1], x: [20.001, 20.001, 0.001, 0.001] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.1025, 0.2994, 1], ease: ["linear", "easeIn", "linear"], delay: animDelay, repeat: 0 },
          x: { duration: 3, times: [0, 0.1065, 0.2989, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        <div className="flex-none -rotate-8">
          <div className="relative overflow-hidden" style={{ width: 81.21, height: 58.88 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/home/hero-graphic-2-1.svg" alt="" className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </motion.div>

      {/* Sparkle small (Vector2) — first */}
      <motion.div
        className="absolute -translate-y-1/2 flex items-center justify-center"
        style={{ left: "68.6%", right: "27.76%", top: "calc(50% - 5.95px)", aspectRatio: "12.113 / 17.122" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.35, 0.48, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
          scale: { duration: 3, times: [0, 0.35, 0.48, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="-rotate-8 flex-none w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/hero-graphic-2-3.svg" alt="" className="w-full h-full" />
        </div>
      </motion.div>

      {/* Sparkle large (Vector1) — second */}
      <motion.div
        className="absolute -translate-y-1/2 flex items-center justify-center"
        style={{ left: "69.67%", right: "24.6%", top: "calc(50% - 21.42px)", aspectRatio: "19.066 / 25.154" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.45, 0.58, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
          scale: { duration: 3, times: [0, 0.45, 0.58, 1], ease: ["linear", smoothBezier, "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="-rotate-8 flex-none w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/hero-graphic-2-2.svg" alt="" className="w-full h-full" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Green Pill ───────────────────────────────────────────────────────────────

function GreenPill({ animDelay = 0 }: { animDelay?: number }) {
  return (
    <div
      className="relative shrink-0 rounded-full bg-[#00952D] overflow-hidden isolate"
      style={{ width: 333, height: 100, clipPath: "inset(0 0 0 0 round 50px)" }}
    >
      {/* Background rect */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ width: 200.69, height: 190.67, left: -20.01, top: -24.2 }}
        initial={{ x: -171.987 }}
        animate={{ x: [-171.987, -117.987, 0.013, 0.013] }}
        transition={{
          x: { duration: 3, times: [0, 0.0005, 0.201, 1], ease: ["linear", "easeIn", "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        <div className="flex-none -rotate-[11.25deg]">
          <div className="bg-[#29AF51]" style={{ width: 172.78, height: 160.03 }} />
        </div>
      </motion.div>

      {/* Center figure */}
      <motion.div
        className="absolute -translate-y-1/2"
        style={{ width: 24, height: 22.18, left: "45.65%", top: "calc(50% - 16.91px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.301, 0.4527, 1], ease: ["linear", "easeInOut", "linear"], delay: animDelay, repeat: 0 },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/hero-graphic-3-2.svg" alt="" className="w-full h-full" />
      </motion.div>

      {/* Animated line: 3 subpaths trimmed sequentially L→R */}
      <motion.svg
        className="absolute"
        style={{ width: 145, height: 24.99, left: 93.5, top: 44.01 }}
        viewBox="0 0 149 28.986"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 왼쪽 곡선: x=2 → x=73 */}
        <motion.path
          d="M2.00005 17.4856C2.33338 11.1523 17.3 0.896622 36.5001 2.09662C53.5561 3.16262 66.8243 6.95034 73.0743 12.6421"
          stroke="#F5BFD7"
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.48, ease: "easeOut", delay: animDelay + 0.975 }}
        />
        {/* 2. 중앙 루프 */}
        <motion.path
          d="M73.0743 12.6421C75.6188 14.9594 77.0001 17.5923 77.0001 20.4856C77.0001 21.9856 77.1187 26.9273 73.0001 26.9856C68.7966 27.0451 67.373 19.4636 73.0743 12.6421Z"
          stroke="#F5BFD7"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.27, ease: "easeInOut", delay: animDelay + 1.455 }}
        />
        {/* 3. 오른쪽 곡선: x=73 → x=147 */}
        <motion.path
          d="M73.0743 12.6421C78.0349 6.7069 88.3894 1.34711 107 2.09663C125.485 2.84108 147 17.4857 147 17.4857"
          stroke="#F5BFD7"
          strokeWidth={4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: animDelay + 1.725 }}
        />
      </motion.svg>

      {/* Right character */}
      <motion.div
        className="absolute"
        style={{ left: "63.36%", right: "5.25%", top: "13%", bottom: "-17.52%" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 0, 1, 1], y: [8, 8, 0, 0] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.1, 0.2995, 1], ease: ["linear", "easeIn", "linear"], delay: animDelay, repeat: 0 },
          y: { duration: 3, times: [0, 0.1, 0.2995, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/hero-chara-4.svg" alt="" className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Left character */}
      <motion.div
        className="absolute"
        style={{ left: "3.91%", right: "64.71%", top: "18%", bottom: "-22.52%" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 0, 1, 1], y: [8, 8, 0, 0] }}
        transition={{
          opacity: { duration: 3, times: [0, 0.1, 0.3005, 1], ease: ["linear", "easeIn", "linear"], delay: animDelay, repeat: 0 },
          y: { duration: 3, times: [0, 0.1, 0.301, 1], ease: "linear", delay: animDelay, repeat: 0 },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/hero-chara-3.svg" alt="" className="absolute inset-0 w-full h-full" />
      </motion.div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const DESIGN_W = 1920;
const DESIGN_H = 960;

export default function HeroSection() {
  useEffect(() => {
    function updateScale() {
      document.documentElement.style.setProperty(
        "--hw-scale",
        String(window.innerWidth / DESIGN_W)
      );
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      {/* ── PC Hero (md+) ───────────────────────────────────────────────────── */}
      <section
        className="hidden md:block relative w-full bg-[var(--bg-gray)] overflow-hidden"
        style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: DESIGN_W,
            height: DESIGN_H,
            transformOrigin: "top left",
            transform: "scale(var(--hw-scale, 1))",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-16"
            style={{
              width: 1329,
              transform: "translate(-50%, calc(-50% + 37px))",
            }}
          >
            {/* ── Display text ─────────────────────────────────── */}
            <div className="flex flex-col items-center gap-8 w-full">

              {/* Line 1 */}
              <div className="flex items-center gap-4 justify-center">
                <motion.div
                  className="shrink-0"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.75, ease: revealEase, delay: T.yellowPillReveal }}
                >
                  <YellowPill animDelay={T.yellowPillAnim} />
                </motion.div>

                <motion.span
                  className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.65, ease: revealEase, delay: T.textHaru }}
                >
                  아이의 하루를
                </motion.span>

                <motion.div
                  className="shrink-0"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.75, ease: revealEase, delay: T.bluePillReveal }}
                >
                  <BluePill animDelay={T.bluePillAnim} />
                </motion.div>

                <motion.span
                  className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.6, ease: revealEase, delay: T.textGwanchal }}
                >
                  관찰하고
                </motion.span>
              </div>

              {/* Line 2 */}
              <div className="flex items-center gap-4 justify-center">
                <motion.span
                  className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.65, ease: revealEase, delay: T.textConnect }}
                >
                  기관과 가정을
                </motion.span>

                <motion.span
                  className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.65, ease: revealEase, delay: T.textConnect + 0.2 }}
                >
                  연결
                </motion.span>

                <motion.div
                  className="shrink-0"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.75, ease: revealEase, delay: T.greenPillReveal }}
                >
                  <GreenPill animDelay={T.greenPillAnim} />
                </motion.div>

                <motion.span
                  className="text-[72px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.65, ease: revealEase, delay: T.textEnd }}
                >
                  합니다.
                </motion.span>
              </div>
            </div>

            {/* ── Description ──────────────────────────────────── */}
            <motion.p
              className="text-[30px] font-medium leading-[1.4] tracking-[-0.06em] text-[var(--txt-heading)] text-center whitespace-pre-line"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.9, ease: revealEase, delay: T.desc }}
            >
              {`AI 관찰과 교육 콘텐츠, 교사와 부모 코칭으로\n영유아 교육기관의 운영과 아이의 성장을 지원합니다.`}
            </motion.p>

            {/* ── CTA Buttons ──────────────────────────────────── */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: revealEase, delay: T.cta1 }}
            >
              <a
                href="/experience/hiforest"
                className="flex items-center justify-center gap-2 min-w-[200px] px-4 py-4 rounded-full bg-[var(--bg-primary-softer)] text-[18px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)] hover:bg-[#FFE9D4] transition-colors"
              >
                체험/행사 보기
              </a>
              <a
                href="/contact?tab=institution"
                className="flex items-center justify-center gap-2 min-w-[200px] px-4 py-4 rounded-full bg-[var(--bg-primary)] text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] hover:opacity-90 transition-opacity"
              >
                기관 도입 상담
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mobile Hero (< md) ──────────────────────────────────────────────── */}
      <section
        className="md:hidden relative w-full bg-[var(--bg-gray)] flex flex-col px-6 py-10 gap-6"
        style={{ minHeight: "100svh" }}
      >
        {/* Pills + Text */}
        <div className="flex flex-col gap-4 flex-1 justify-center">

          {/* 아이의 하루를 + YellowPill (한 줄) */}
          <motion.div
            className="flex items-center gap-3 overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.75, ease: revealEase, delay: 0 }}
          >
            <span className="text-[28px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap shrink-0">
              아이의 하루를
            </span>
            <div style={{ width: 173, height: 52, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ transformOrigin: "top left", transform: "scale(0.52)", width: 333, height: 100 }}>
                <YellowPill animDelay={0.6} />
              </div>
            </div>
          </motion.div>

          {/* 관찰하고 + BluePill (한 줄) */}
          <motion.div
            className="flex items-center gap-3 overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.75, ease: revealEase, delay: 0.6 }}
          >
            <span className="text-[28px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-nowrap shrink-0">
              관찰하고
            </span>
            <div style={{ width: 173, height: 52, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ transformOrigin: "top left", transform: "scale(0.52)", width: 333, height: 100 }}>
                <BluePill animDelay={1.2} />
              </div>
            </div>
          </motion.div>

          {/* 기관과 가정을 연결합니다. + GreenPill (한 줄) */}
          <motion.div
            className="flex items-center gap-3 overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.75, ease: revealEase, delay: 1.2 }}
          >
            <span className="text-[28px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] whitespace-pre-line shrink-0">
              {"기관과 가정을\n연결합니다."}
            </span>
            <div style={{ width: 173, height: 52, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ transformOrigin: "top left", transform: "scale(0.52)", width: 333, height: 100 }}>
                <GreenPill animDelay={1.8} />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-[20px] font-medium leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)] whitespace-pre-line overflow-hidden mt-2"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, ease: revealEase, delay: 2.0 }}
          >
            {"AI 관찰과 교육 콘텐츠, 교사와 부모 코칭으로\n영유아 교육기관의 운영과 아이의 성장을 지원합니다."}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: revealEase, delay: 2.6 }}
        >
          <a
            href="/experience/hiforest"
            className="flex items-center justify-center py-4 rounded-full bg-[var(--bg-primary-softer)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]"
          >
            체험/행사 보기
          </a>
          <a
            href="/contact?tab=institution"
            className="flex items-center justify-center py-4 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)]"
          >
            기관 도입 상담
          </a>
        </motion.div>
      </section>
    </>
  );
}

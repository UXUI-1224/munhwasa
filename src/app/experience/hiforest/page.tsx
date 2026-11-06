"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ZONES = [
  { name: "감각놀이존", sub: "편백존" },
  { name: "예술놀이존", sub: "드로잉아트" },
  { name: "역할놀이존", sub: "미니 마을" },
  { name: "신체활동놀이존", sub: "XR액션큐" },
  { name: "자연놀이존", sub: "야외 잔디 운동장" },
  { name: "감성놀이존", sub: "파티룸" },
  { name: "자유놀이존", sub: "대강당" },
];

const CURRICULUM_COLS = [
  { label: "신체운동·건강", bullets: [true,  false, false, true,  true,  false, true]  },
  { label: "의사소통",      bullets: [false, true,  true,  false, false, true,  false] },
  { label: "사회관계",      bullets: [false, false, true,  false, true,  true,  true]  },
  { label: "예술경험",      bullets: [false, true,  false, false, false, false, false] },
  { label: "자연탐구",      bullets: [true,  false, false, true,  false, false, false] },
];

const PLAY_ZONES = [
  {
    img: "/assets/hiporest-zone-1.png",
    tags: ["편백존", "최대 15~20명"],
    name: "감각놀이존",
    desc: "친환경 편백 공간에서 담고, 만지고, 옮기는 촉감 놀이로 오감을 깨웁니다.",
  },
  {
    img: "/assets/hiporest-zone-2.png",
    tags: ["드로잉아트", "최대 15명"],
    name: "예술놀이존",
    desc: "색을 자유롭게 표현하며 창의력을 키우는 확장형 미술 체험 공간입니다.",
  },
  {
    img: "/assets/hiporest-zone-3.png",
    tags: ["미니 마을", "최대 20명"],
    name: "역할놀이존",
    desc: "주방, 마켓, 아이스크림 가게, 인형의 집에서 역할을 맡아 노는 작은 마을입니다.",
  },
  {
    img: "/assets/hiporest-zone-4.png",
    tags: ["XR액션큐"],
    name: "신체활동놀이존",
    desc: "바닥 화면 위를 뛰어다니며 즐기는 몰입형 신체 활동 공간입니다.",
  },
  {
    img: "/assets/hiporest-zone-5.png",
    tags: ["야외 잔디 운동장"],
    name: "자연놀이존",
    desc: "잔디 위를 뛰놀며 북 놀이, 미끄럼틀, 밧줄 균형 놀이로 계절을 느끼는 야외 공간입니다.",
  },
  {
    img: "/assets/hiporest-zone-6.png",
    tags: ["파티룸"],
    name: "감성놀이존",
    desc: "티파티와 단체 사진을 남기는 파티 분위기의 실내 포토존입니다.",
  },
  {
    img: "/assets/hiporest-zone-7.png",
    tags: ["대강당"],
    name: "자유놀이존",
    desc: "전동차와 교통 표지판이 있는 넓은 홀에서 자유롭게 뛰노는 공간입니다.",
  },
];

const STEPS = [
  {
    step: "STEP 01",
    duration: null,
    title: "입장 · 환복",
    desc: "체험존에 입장한 후 전용 놀이복으로 갈아입습니다.",
    note: null,
    orange: false,
  },
  {
    step: "STEP 02",
    duration: "30분",
    title: "예술놀이존",
    desc: "드로잉아트 (25분 진행 + 5분 정리)",
    note: null,
    orange: true,
  },
  {
    step: "STEP 03",
    duration: "75분",
    title: "자유놀이",
    desc: "편백존 · XR액션큐 · 대강당 · 미니 마을을 자유롭게 오가며 놀이합니다.",
    note: "※ 기관 선생님 인솔 필요",
    orange: true,
  },
  {
    step: "STEP 04",
    duration: null,
    title: "야외 포토존",
    desc: "1층 야외 포토존에서 단체 사진을 촬영합니다.",
    note: null,
    orange: false,
  },
  {
    step: "STEP 05",
    duration: null,
    title: "차량 탑승",
    desc: "놀이를 마치고 차량에 탑승합니다.",
    note: null,
    orange: false,
  },
];

const OPERATION_NOTES = [
  "평일 10:00~18:00 운영(주말 휴무) · 기본 2시간 이용",
  "1시간 / 1시간 30분도 선택할 수 있습니다(요금: 2시간 기준)",
  "하루 한 기관만 이용하는 단독 예약제로 운영됩니다.",
];

const KIDS_CHECK = [
  "스스로 선택합니다",
  "친구와 협력합니다",
  "감정을 표현합니다",
  "문제를 해결합니다",
  "몸을 움직입니다",
  "새로운 도전을 즐깁니다",
  "자신감을 키웁니다",
  "배움의 즐거움을 경험합니다",
];

const TEACHER_CHECK = [
  "교육 과정과 자연스러운 연계",
  "놀이복 제공",
  "계절별로 다른 놀이 운영",
  "원별 단독 예약 가능",
  "교사 인솔 지원",
  "안전한 이동 동선",
  "단체 사진 촬영",
  "넓은 전용 주차장",
];

const REC_CARDS = [
  { num: "01", text: "놀이 중심 교육을 실천하는 기관" },
  { num: "02", text: "표준보육과정과 누리과정을 더욱 풍성하게 운영하고 싶은 기관" },
  { num: "03", text: "특별한 현장체험을 계획하는 기관" },
  { num: "04", text: "학부모 만족도를 높이고 싶은 기관" },
  { num: "05", text: "계절별 교육 과정을 놀이로 확장하고 싶은 기관" },
];

const LOCATION_ROWS = [
  { label: "주소", value: "인천 연수구 아암대로 825-29" },
  { label: "전화", value: "010-9542-1441" },
  { label: "주차", value: "전용 주차장 · 단체 차량 하차 공간\n(상세 안내는 예약 시 제공)" },
];

// ─── Shared Variants ──────────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const titleReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 20 },
  },
};

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
          <Image src="/assets/hiporest-hero.png" alt="하이포레스트" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "rgba(32,32,32,0.16)" }} />
        </motion.div>

        {/* Mobile pre-text */}
        <motion.div
          className="flex md:hidden absolute top-[120px] left-0 right-0 flex-col items-center gap-4 pointer-events-none px-6"
          style={{ opacity: preTextOp }}
        >
          <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
            Experience
          </p>
          <div className="text-[32px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)] text-center break-keep">
            <p>교실을 넘어, 놀이로</p>
            <p>하이포레스트</p>
          </div>
        </motion.div>

        {/* Desktop pre-text */}
        <motion.div
          className="hidden md:flex absolute top-[120px] left-[240px] right-[240px] items-end justify-between pointer-events-none"
          style={{ opacity: preTextOp }}
        >
          <div className="flex flex-col gap-6 w-[464px] shrink-0">
            <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
              Experience
            </p>
            <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)] break-keep">
              <p>교실을 넘어, 놀이로</p>
              <p>하이포레스트</p>
            </div>
          </div>
          <div className="w-[830px] shrink-0">
            <div className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)] break-keep">
              <p>표준보육과정/누리과정과 연계된 놀이 중심의 대규모 교육연계 놀이공간, 하이포레스트.</p>
              <p>아이들은 마음껏 뛰어 놀고, 교사는 놀이를 자연스럽게 교육 과정으로 확장할 수 있습니다.</p>
            </div>
          </div>
        </motion.div>

        {/* Mobile post-text */}
        <motion.div
          className="flex md:hidden absolute inset-0 flex-col items-center justify-center gap-4 pointer-events-none z-10 px-6"
          style={{ opacity: postTextOp }}
        >
          <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">
            Experience
          </p>
          <div className="text-[32px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)] text-center break-keep">
            <p>교실을 넘어, 놀이로</p>
            <p>하이포레스트</p>
          </div>
        </motion.div>

        {/* Desktop post-text */}
        <motion.div
          className="hidden md:flex absolute inset-0 items-center pointer-events-none z-10"
          style={{ opacity: postTextOp }}
        >
          <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between">
            <div className="flex flex-col gap-6 w-[464px] shrink-0">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--bg-primary)]">
                Experience
              </p>
              <div className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-white)] break-keep">
                <p>교실을 넘어, 놀이로</p>
                <p>하이포레스트</p>
              </div>
            </div>
            <div className="w-[830px] shrink-0">
              <div className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-white)] break-keep">
                <p>표준보육과정/누리과정과 연계된 놀이 중심의 대규모 교육연계 놀이공간, 하이포레스트.</p>
                <p>아이들은 마음껏 뛰어 놀고, 교사는 놀이를 자연스럽게 교육 과정으로 확장할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HiforestPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ x: number; scrollLeft: number } | null>(null);

  function onCarouselMouseDown(e: React.MouseEvent) {
    if (!carouselRef.current) return;
    dragState.current = { x: e.clientX, scrollLeft: carouselRef.current.scrollLeft };
  }
  function onCarouselMouseMove(e: React.MouseEvent) {
    if (!dragState.current || !carouselRef.current) return;
    e.preventDefault();
    carouselRef.current.scrollLeft = dragState.current.scrollLeft - (e.clientX - dragState.current.x);
  }
  function onCarouselMouseUp() { dragState.current = null; }

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />

      <Hero />

      {/* ── Section · Features ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-[160px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-12 md:gap-[80px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full">
            <motion.div
              className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] break-keep"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={titleReveal}
            >
              <p>교실을 넘어</p>
              <p>놀이로 교육과정을 확장합니다.</p>
            </motion.div>
            <motion.div
              className="text-[18px] md:text-[24px] font-normal leading-[1.6] tracking-[-0.04em] text-[var(--txt-body)] w-full md:w-[708px] md:shrink-0 break-keep"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p>송도 중심에서 만나는 탁 트인 전망과 쾌적한 자연환경.</p>
              <p>아이들의 놀이가 더욱 자유롭고 깊어지는 특별한 교육 공간입니다.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:flex md:gap-6 gap-4 w-full">
            {[
              { img: "/assets/hiporest-feature-1.png", title: "대규모 단독 건물", desc: "원 전용 예약으로 다른 기관과 섞이지 않고 단독으로 이용합니다." },
              { img: "/assets/hiporest-feature-2.png", title: "넓은 전용 주차장", desc: "단체 차량 하차부터 입장까지 안전한 동선을 갖췄습니다." },
              { img: "/assets/hiporest-feature-3.png", title: "탁 트인 전망", desc: "높은 지대에서 내려다보는 송도 전망과 숲세권 자연환경." },
              { img: "/assets/hiporest-feature-3.png", title: "실내 · 야외 놀이환경", desc: "날씨와 계절에 맞춰 실내와 야외를 함께 이용합니다." },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-5 md:flex-1 min-w-0"
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: i * 0.13 }}
              >
                <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden">
                  <Image src={card.img} alt={card.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                    {card.title}
                  </p>
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] break-keep">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section · Curriculum ─────────────────────────────────────────────── */}
      <section className="relative bg-[var(--bg-gray)] py-16 md:py-[160px] overflow-clip">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-12 md:gap-[64px]">
          <div className="flex flex-col md:flex-row md:gap-[80px] md:items-start gap-10 w-full">
            {/* Left */}
            <div className="flex flex-col gap-6 w-full md:w-[480px] md:shrink-0">
              <div className="flex flex-col gap-4">
                <motion.div
                  className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] break-keep"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={titleReveal}
                >
                  <p>교육과정을</p>
                  <p>놀이로 연결합니다</p>
                </motion.div>
                <motion.div
                  className="text-[18px] md:text-[24px] font-normal leading-[1.6] tracking-[-0.04em] text-[var(--txt-body)] break-keep"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <p>놀이는 아이들의 가장 중요한 배움입니다.</p>
                  <p>표준보육과정과 누리과정을 바탕으로 여섯 가지</p>
                  <p>놀이를 자연스럽게 경험하도록 설계되었습니다.</p>
                </motion.div>
              </div>
            </div>

            {/* Right: Curriculum Matrix */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              {/* Mobile table: zone + matched curriculum tags */}
              <div className="md:hidden border border-[var(--border-neutral)] rounded-[16px] overflow-hidden">
                {ZONES.map((zone, zi) => (
                  <div
                    key={zi}
                    className={`flex items-start gap-4 px-4 py-4 bg-white ${zi < ZONES.length - 1 ? "border-b border-[var(--border-neutral)]" : ""}`}
                  >
                    <div className="w-[110px] shrink-0">
                      <p className="text-[13px] font-semibold leading-[1.3] tracking-[-0.04em] text-black">{zone.name}</p>
                      <p className="text-[11px] font-normal leading-[1.3] tracking-[-0.04em] text-[var(--txt-caption)] mt-0.5">{zone.sub}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {CURRICULUM_COLS.filter((col) => col.bullets[zi]).map((col, ci) => (
                        <span
                          key={ci}
                          className="bg-[var(--bg-primary-softer)] text-[var(--txt-primary)] text-[11px] font-semibold leading-[1.2] px-2 py-1 rounded-[6px] whitespace-nowrap"
                        >
                          {col.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table: full grid */}
              <div className="hidden md:block border border-[var(--border-neutral)] rounded-[16px] overflow-hidden">
                {/* Header Row */}
                <div className="flex border-b border-[var(--border-neutral)]">
                  <div className="w-[181px] shrink-0 bg-[var(--txt-primary)] px-7 py-5 flex items-center">
                    <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)]">놀이존</p>
                  </div>
                  {CURRICULUM_COLS.map((col, ci) => (
                    <div
                      key={ci}
                      className={`flex-1 bg-[var(--txt-primary)] px-3 py-5 flex items-center justify-center ${ci < CURRICULUM_COLS.length - 1 ? "border-r border-[var(--border-neutral)]" : ""}`}
                    >
                      <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] text-center whitespace-nowrap">
                        {col.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Body Rows */}
                {ZONES.map((zone, zi) => (
                  <div key={zi} className={`flex ${zi < ZONES.length - 1 ? "border-b border-[var(--border-neutral)]" : ""}`}>
                    <div className="w-[181px] shrink-0 border-r border-[var(--border-neutral)] bg-white px-7 py-4 flex flex-col gap-2">
                      <p className="text-[18px] font-semibold leading-[1.2] tracking-[-0.04em] text-black">{zone.name}</p>
                      <p className="text-[16px] font-normal leading-[1.2] tracking-[-0.04em] text-[var(--txt-caption)]">{zone.sub}</p>
                    </div>
                    {CURRICULUM_COLS.map((col, ci) => (
                      <div
                        key={ci}
                        className={`flex-1 h-[82px] bg-white flex items-center justify-center ${ci < CURRICULUM_COLS.length - 1 ? "border-r border-[var(--border-neutral)]" : ""}`}
                      >
                        {col.bullets[zi] && (
                          <Image src="/assets/hiporest-bullet.svg" alt="" width={16} height={16} />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Decorative element */}
          <motion.div
            className="absolute bottom-[-60px] right-[-48px] md:bottom-[-200px] md:right-auto md:left-[-114px] w-[160px] h-[160px] md:w-[544px] md:h-[544px] pointer-events-none"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.3 }}
          >
            <div className="flex items-center justify-center w-full h-full [transform:scaleX(-1)] md:[transform:none]">
              <Image
                src="/assets/hiporest-deco.svg"
                alt=""
                width={451}
                height={451}
                style={{ transform: "rotate(167.94deg) scaleY(-1)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section · Play Zones ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-[160px] flex flex-col gap-12 md:gap-[64px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-4">
          <motion.div
            className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleReveal}
          >
            놀이존 안내
          </motion.div>
          <motion.p
            className="text-[18px] md:text-[24px] font-normal leading-[1.6] tracking-[-0.04em] text-[var(--txt-body)] break-keep"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            아이들의 발달 영역에 맞춰 설계된 7개의 놀이존을 소개합니다.
          </motion.p>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={carouselRef}
          className="w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onCarouselMouseDown}
          onMouseMove={onCarouselMouseMove}
          onMouseUp={onCarouselMouseUp}
          onMouseLeave={onCarouselMouseUp}
        >
          <div className="flex gap-4 md:gap-6 w-max pb-2" style={{ paddingLeft: "max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem))" }}>
            {PLAY_ZONES.map((zone, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-5 w-[260px] md:w-[342px] shrink-0"
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: i * 0.08 }}
              >
                <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden">
                  <Image src={zone.img} alt={zone.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 flex-wrap">
                    {zone.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="bg-[var(--bg-primary-softer)] text-[var(--txt-primary)] text-[14px] font-normal leading-[1.2] tracking-[-0.02em] opacity-60 px-2 py-1.5 rounded-[8px] whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[18px] md:text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                    {zone.name}
                  </p>
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-body)] break-keep">
                    {zone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section · Day Course ─────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-[160px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-12 md:gap-[64px]">
          <div className="flex flex-col gap-4">
            <motion.div
              className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={titleReveal}
            >
              추천 놀이 코스
            </motion.div>
            <motion.p
              className="text-[18px] md:text-[24px] font-normal leading-[1.6] tracking-[-0.04em] text-[var(--txt-body)] break-keep"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              예술놀이존에서 드로잉아트를 즐긴 뒤, 원하는 놀이존을 자유롭게 오가는 인기 코스입니다.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-6 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: {} }}
          >
            {/* Step row */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 w-full"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
            >
              {STEPS.map((step, i) => {
                const bg    = step.orange ? "bg-[var(--bg-primary)]"       : "bg-[var(--bg-primary-softer)]";
                const lbl   = step.orange ? "text-[var(--txt-white)]"      : "text-[var(--bg-primary)]";
                const title = step.orange ? "text-[var(--txt-white)]"      : "text-[var(--txt-heading)]";
                const body  = step.orange ? "text-[var(--txt-white)]"      : "text-[var(--txt-body)]";

                return (
                  <motion.div
                    key={i}
                    className={`md:flex-1 p-6 md:p-7 rounded-[16px] md:min-h-[300px] ${bg} ${step.note ? "flex flex-col justify-between gap-6" : "flex flex-col gap-6 md:gap-10"}`}
                    variants={cardItem}
                  >
                    {step.note ? (
                      <>
                        <div className="flex flex-col gap-6 md:gap-10">
                          <div className="flex items-center justify-between">
                            <p className={`text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] ${lbl}`}>{step.step}</p>
                            {step.duration && (
                              <span className="bg-[var(--bg-black)] text-white text-[12px] font-normal leading-[1.3] tracking-[-0.04em] px-2.5 py-1 rounded-full whitespace-nowrap">
                                {step.duration}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className={`text-[20px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] whitespace-nowrap ${title}`}>{step.title}</p>
                            <p className={`text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] break-keep ${body}`}>{step.desc}</p>
                          </div>
                        </div>
                        <p className={`text-[12px] font-normal leading-[1.3] tracking-[-0.04em] whitespace-nowrap ${body}`}>{step.note}</p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <p className={`text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] ${lbl}`}>{step.step}</p>
                          {step.duration && (
                            <span className="bg-[var(--bg-black)] text-white text-[12px] font-normal leading-[1.3] tracking-[-0.04em] px-2.5 py-1 rounded-full whitespace-nowrap">
                              {step.duration}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className={`text-[20px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] whitespace-nowrap ${title}`}>{step.title}</p>
                          <p className={`text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.02em] break-keep ${body}`}>{step.desc}</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Operation notes */}
            <motion.div
              className="bg-white border border-[#a4e0b6] rounded-[16px] flex flex-col gap-3 pb-[30px] pt-6 px-6 md:px-10"
              variants={{
                hidden: { opacity: 0, y: 32, scale: 0.92 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 240,
                    damping: 20,
                    delay: (STEPS.length - 1) * 0.13 + 0.55,
                  },
                },
              }}
            >
              <p className="text-[18px] font-semibold leading-[1.6] text-[#00952d]">운영 안내</p>
              {OPERATION_NOTES.map((note, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-1 h-1 rounded-full bg-[var(--txt-label)] shrink-0" />
                  <p className="text-[14px] md:text-[16px] font-normal leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)] break-keep">{note}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section · For Kids & Teachers ────────────────────────────────────── */}
      <section className="bg-[#effff4] py-16 md:py-[160px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-12 md:gap-[64px]">
          <motion.div
            className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)] break-keep"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleReveal}
          >
            <p>아이도, 선생님도</p>
            <p>만족하는 하루</p>
          </motion.div>

          {/* Two cards */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Kids card */}
            <motion.div
              className="flex-1 flex flex-col gap-8 p-6 md:p-12 bg-white rounded-[24px]"
              initial={{ opacity: 0, y: 32, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <p className="text-[22px] md:text-[30px] font-medium leading-[1.4] tracking-[-0.06em] text-[var(--txt-primary)]">
                하이포레스트를 거친 아이들은
              </p>
              <div className="relative aspect-[16/9] md:h-[280px] md:aspect-auto rounded-[16px] overflow-hidden">
                <Image src="/assets/hiporest-kids.png" alt="놀이하는 아이들" fill className="object-cover" />
              </div>
              <div className="flex flex-col text-[16px]">
                {Array.from({ length: 4 }, (_, row) => (
                  <div key={row} className="flex gap-6">
                    {[row * 2, row * 2 + 1].map((idx) => (
                      <div key={idx} className="flex-1 flex gap-3 items-center py-4">
                        <span className="text-[#00952d] font-semibold leading-[1.6] shrink-0">✓</span>
                        <p className="text-[14px] md:text-[16px] text-[#333] font-normal leading-[1.4] tracking-[-0.02em] break-keep">{KIDS_CHECK[idx]}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Teacher card */}
            <motion.div
              className="flex-1 flex flex-col gap-8 p-6 md:p-12 bg-white rounded-[24px]"
              initial={{ opacity: 0, y: 32, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.13 }}
            >
              <p className="text-[22px] md:text-[30px] font-medium leading-[1.4] tracking-[-0.06em] text-[var(--txt-primary)]">
                하이포레스트만의 장점
              </p>
              <div className="relative aspect-[16/9] md:h-[280px] md:aspect-auto rounded-[16px] overflow-hidden">
                <Image src="/assets/hiporest-teachers.png" alt="인솔 교사와 아이들" fill className="object-cover" />
              </div>
              <div className="flex flex-col text-[16px]">
                {Array.from({ length: 4 }, (_, row) => (
                  <div key={row} className="flex gap-6">
                    {[row * 2, row * 2 + 1].map((idx) => (
                      <div key={idx} className="flex-1 flex gap-3 items-center py-4">
                        <span className="text-[#00952d] font-semibold leading-[1.6] shrink-0">✓</span>
                        <p className="text-[14px] md:text-[16px] text-[#333] font-normal leading-[1.4] tracking-[-0.02em] break-keep">{TEACHER_CHECK[idx]}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recommended */}
          <div className="flex flex-col md:flex-row md:gap-[66px] gap-8 items-start w-full">
            {/* Balloon + character */}
            <div className="flex flex-col gap-6 items-start justify-end shrink-0">
              <motion.div
                className="bg-[var(--bg-secondary-softer)] flex items-center justify-center px-6 py-4 rounded-full relative"
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
              >
                <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-caption)] whitespace-nowrap">
                  이런 기관에 추천해요!
                </p>
                <div className="absolute bottom-[-13.5px] left-9">
                  <Image src="/assets/hiporest-vector.svg" alt="" width={21} height={14} />
                </div>
              </motion.div>
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 240, damping: 12, delay: 0.1 }}
                >
                  <Image
                    src="/assets/hiporest-02.svg"
                    alt=""
                    width={118}
                    height={120}
                    style={{ transform: "scaleX(-1)" }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Rec cards */}
            {/* Mobile: horizontal carousel */}
            <div className="md:hidden self-stretch -mx-6 overflow-x-auto scrollbar-hide touch-pan-x">
              <div className="flex gap-3 w-max px-6">
                {REC_CARDS.map((card, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col justify-between w-[180px] shrink-0 h-[180px] p-5 bg-white rounded-[16px]"
                    initial={{ opacity: 0, y: 32, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 20, delay: i * 0.13 + 0.2 }}
                  >
                    <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#00952d]">
                      {card.num}
                    </p>
                    <p className="text-[14px] font-semibold leading-[1.6] tracking-[-0.02em] text-[#00952d] break-keep">
                      {card.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Desktop: flex row */}
            <div className="hidden md:flex md:flex-1 md:gap-6 w-full md:items-stretch">
              {REC_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col justify-between md:flex-1 md:h-[257px] p-6 bg-white rounded-[16px]"
                  initial={{ opacity: 0, y: 32, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 240, damping: 20, delay: i * 0.13 + 0.2 }}
                >
                  <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#00952d]">
                    {card.num}
                  </p>
                  <p className="text-[17px] font-semibold leading-[1.6] tracking-[-0.02em] text-[#00952d] break-keep">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section · 오시는 길 ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-[160px]">
        <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-12 md:gap-[64px]">
          <motion.div
            className="text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-display)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleReveal}
          >
            오시는 길
          </motion.div>
          <div className="flex flex-col md:flex-row md:gap-12 md:items-start gap-8 w-full">
            {/* Map */}
            <motion.div
              className="w-full md:flex-1 h-[280px] md:h-[400px] rounded-[16px] overflow-hidden"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <iframe
                src="https://maps.google.com/maps?q=인천+연수구+아암대로+825-29&output=embed&hl=ko&zoom=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </motion.div>

            {/* Location info */}
            <motion.div
              className="w-full md:w-[480px] md:shrink-0 flex flex-col"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            >
              <div className="pb-6">
                <p className="text-[24px] md:text-[28px] md:text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[var(--txt-primary)]">
                  하이포레스트
                </p>
              </div>
              <div className="border-t border-[var(--border-neutral)] pt-6 flex flex-col">
                {LOCATION_ROWS.map((row, i) => (
                  <div key={i} className="flex gap-6 items-start py-3">
                    <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-caption-soft)] w-16 shrink-0">
                      {row.label}
                    </p>
                    <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)] flex-1 break-keep whitespace-pre-line">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

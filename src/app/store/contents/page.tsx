"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import ProductPopup from "@/components/ProductPopup";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    img: "/assets/store-edu-1.png",
    name: "우리 아이 식사 습관 콘텐츠",
    desc: "영상을 보면서 편식하는 습관을 고칠 수 있어요",
    price: "2,000",
  },
];

const HERO_GRADIENT =
  "linear-gradient(53.95deg, rgba(54,54,54,0.8) 13.995%, rgba(134,134,134,0) 54.07%), linear-gradient(90deg, rgba(32,32,32,0.2) 0%, rgba(32,32,32,0.2) 100%)";

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProductCard({ img, name, desc, price, onClick }: {
  img: string; name: string; desc: string; price: string; onClick: () => void;
}) {
  return (
    <motion.button
      className="flex flex-col gap-6 pb-6 text-left group w-full"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden">
        <Image src={img} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-label)]">{name}</p>
          <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--txt-caption)]">{desc}</p>
        </div>
        <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">{price}원</p>
      </div>
    </motion.button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoreContents() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="pt-[80px] md:pt-[120px]">
        <div className="max-w-[1440px] mx-auto w-full px-6">
        <div
          className="relative h-[524px] rounded-[24px] overflow-hidden flex items-end md:items-center p-[24px] md:p-[80px]"
        >
          <Image
            src="/assets/store-edu-hero.png"
            alt="교육 콘텐츠"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-[24px]" style={{ background: HERO_GRADIENT }} />
          <div className="relative z-10 flex flex-col gap-3">
            <p className="text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[#F6F6F6]">
              우리 아이 식습관 교육 콘텐츠
            </p>
            <p className="text-[18px] font-normal leading-[1.6] tracking-[-0.04em] text-[#F6F6F6]">
              우리 아이의 건강한 식습관을 위한<br className="md:hidden" /> 교육 콘텐츠 출시!
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* ── Product Grid ──────────────────────────────────────────────────── */}
      <section className="pt-[60px] pb-[120px] md:py-[120px]">
        <div className="max-w-[1440px] mx-auto w-full px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} {...p} onClick={() => setPopupOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Color Me Out Section ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden py-[80px]">
        {/* Background image */}
        <Image
          src="/assets/store-edu-section-bg.png"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="max-w-[1440px] mx-auto w-full px-6 flex items-center justify-between">

        {/* Left text */}
        <motion.div
          className="relative z-10 flex flex-col gap-6 w-[708px] shrink-0"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="text-[44px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)]">
            <p>감정의 색을 표현하다</p>
            <p>Color Me Out</p>
          </div>
          <p className="text-[18px] font-normal leading-[1.6] tracking-[-0.04em] text-[var(--txt-white)] break-keep">
            색과 패턴으로 감정을 표현하는 문화사의 감정 캐릭터 IP입니다.<br />
            아직 언어로 감정을 설명하기 어려워 하는 아이들이, 색을 통해 마음을 들여다보고 표현할 수 있도록<br />
            만들었습니다. 추후 캐릭터를 활용한 교구, 확장팩, B2B 협업 상품으로 IP 활용 영역을 넓힐 예정입니다.
          </p>
        </motion.div>

        {/* Right graphic */}
        <motion.div
          className="relative z-10 h-[350px] w-[708px] shrink-0"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          {/* Blue spiky blob — top-left */}
          <img
            src="/assets/store-edu-char-25.svg"
            alt=""
            className="absolute"
            style={{ top: 10, left: 0, width: 171, height: 171, transform: "rotate(-4deg)" }}
          />
          {/* Pink spiky blob — middle (mirrored) */}
          <img
            src="/assets/store-edu-char-02.svg"
            alt=""
            className="absolute"
            style={{ top: 114, left: 170, width: 185, height: 182, transform: "scaleX(-1) rotate(8deg)" }}
          />
          {/* Turquoise leaf — bottom-middle */}
          <img
            src="/assets/store-edu-char-21.svg"
            alt=""
            className="absolute"
            style={{ top: 179, left: 382, width: 162, height: 170, transform: "rotate(-4deg)" }}
          />
          {/* Orange character — right */}
          <img
            src="/assets/store-edu-char04.png"
            alt=""
            className="absolute"
            style={{ top: 45, right: 0, width: 170, height: 170, transform: "rotate(4deg)", objectFit: "contain" }}
          />
        </motion.div>
        </div>
      </section>

      <Footer />
      <ProductPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}

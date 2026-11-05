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
    img: "/assets/store-food-1.png",
    name: "한입에꿀떡",
    desc: "떡국 에너지를 통해 우리 아이의 키와 지혜가 자라요",
    price: "34,000",
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
      <div className="relative w-full aspect-[377/278] rounded-[16px] overflow-hidden">
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

export default function StoreFood() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="pt-[80px] px-[240px]">
        <div
          className="relative h-[524px] rounded-[24px] overflow-hidden flex items-center p-[80px]"
        >
          <Image
            src="/assets/store-food-hero.png"
            alt="식품"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-[24px]" style={{ background: HERO_GRADIENT }} />
          <div className="relative z-10 flex flex-col gap-3">
            <p className="text-[40px] font-semibold leading-[1.2] tracking-[-0.06em] text-[#F6F6F6]">
              놀면서 먹어요, 한입에 꿀떡!
            </p>
            <p className="text-[18px] font-normal leading-[1.6] tracking-[-0.04em] text-[#F6F6F6]">
              우리 아이의 건강한 식습관을 위한 안심 먹거리를 만나 보세요
            </p>
          </div>
        </div>
      </section>

      {/* ── Product Grid ──────────────────────────────────────────────────── */}
      <section className="px-[240px] py-[160px]">
        <div className="grid grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} {...p} onClick={() => setPopupOpen(true)} />
          ))}
        </div>
      </section>

      <Footer />
      <ProductPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}

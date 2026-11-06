"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";

type NewsCardProps = {
  category: string;
  title: string;
  date: string;
  imgSrc: string;
  href: string;
};

function NewsCard({ category, title, date, imgSrc, href }: NewsCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-6 w-[280px] md:w-[420px] shrink-0 group"
      draggable={false}
    >
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "420/315" }}>
        <Image
          src={imgSrc}
          alt={title}
          fill
          draggable={false}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-caption)]">
            {category}
          </p>
          <p className="text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
            {title}
          </p>
        </div>
        <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--txt-caption-soft)]">
          {date}
        </p>
      </div>
    </Link>
  );
}

const NEWS_DATA: NewsCardProps[] = [
  {
    category: "현장소식",
    title: "영유아 교육 현장",
    date: "2026.10.21",
    imgSrc: "/assets/activity/news-image-1.png",
    href: "/activity/1",
  },
  {
    category: "보도자료",
    title: "2026년 하반기 원장 초청 설명회",
    date: "2026.10.21",
    imgSrc: "/assets/activity/news-image-2.png",
    href: "/activity/2",
  }
];

const CARD_GAP = 24;

export default function NewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const x            = useMotionValue(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([0]);

  useEffect(() => {
    function update() {
      if (!containerRef.current || !trackRef.current) return;
      const firstCard = trackRef.current.children[0] as HTMLElement | null;
      const cardStep  = firstCard ? firstCard.offsetWidth + CARD_GAP : 420 + CARD_GAP;
      const visibleW  = containerRef.current.offsetWidth;
      const totalW    = trackRef.current.scrollWidth;
      const maxLeft   = Math.min(0, visibleW - totalW);

      const points: number[] = [];
      let p = 0;
      while (p > maxLeft) {
        points.push(p);
        p -= cardStep;
      }
      points.push(maxLeft);
      setSnapPoints(points);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function handleDragEnd(_: unknown, info: { velocity: { x: number } }) {
    const current  = x.get();
    const velocity = info.velocity.x;
    const last     = snapPoints[snapPoints.length - 1] ?? 0;

    let target: number;
    if (velocity < -150) {
      const idx = snapPoints.findIndex(p => p <= current);
      target = snapPoints[Math.min(idx + 1, snapPoints.length - 1)] ?? last;
    } else if (velocity > 150) {
      const idx = snapPoints.findLastIndex(p => p >= current);
      target = snapPoints[Math.max(idx - 1, 0)] ?? 0;
    } else {
      target = snapPoints.reduce((nearest, p) =>
        Math.abs(p - current) < Math.abs(nearest - current) ? p : nearest,
        snapPoints[0]
      );
    }

    animate(x, target, { type: "spring", stiffness: 400, damping: 40 });
  }
  
  return (
    <section className="w-full bg-[var(--gray-050)] py-[120px] overflow-hidden">
      <div ref={containerRef} className="max-w-[1440px] mx-auto w-full flex flex-col gap-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-4 w-full px-6">
          <motion.h2
            className="text-[28px] lg:text-[44px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-display)] whitespace-nowrap"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            문화사가 만드는 교육 현장 소식
          </motion.h2>
        </div>

        {/* Cards — pl-6만, 오른쪽은 section overflow:hidden으로 자연스럽게 흘러넘침 */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 items-start cursor-grab active:cursor-grabbing select-none pl-6"
          drag="x"
          dragConstraints={{ left: snapPoints[snapPoints.length - 1] ?? 0, right: 0 }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
        >
          {NEWS_DATA.map((item, i) => (
            <NewsCard key={i} {...item} />
          ))}
          {/* trailing spacer — 마지막 카드 오른쪽 여백 */}
          <div className="shrink-0 w-4 h-1" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}

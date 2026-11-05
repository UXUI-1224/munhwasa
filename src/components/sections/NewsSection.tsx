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
      className="flex flex-col gap-6 w-[420px] shrink-0 group"
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
    imgSrc: "/assets/news-image-1.png",
    href: "/activity/1",
  },
  {
    category: "보도자료",
    title: "2026년 하반기 원장 초청 설명회",
    date: "2026.10.21",
    imgSrc: "/assets/news-image-2.png",
    href: "/activity/2",
  }
];

const CARD_STEP = 420 + 24;

export default function NewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const x            = useMotionValue(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([0]);

  useEffect(() => {
    function update() {
      if (!containerRef.current || !trackRef.current) return;
      const visibleW = containerRef.current.offsetWidth;
      const totalW   = trackRef.current.scrollWidth;
      const maxLeft  = Math.min(0, visibleW - totalW);

      const points: number[] = [];
      let p = 0;
      while (p > maxLeft) {
        points.push(p);
        p -= CARD_STEP;
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
    <section className="w-full bg-[var(--gray-050)] py-[120px]">
      {/* container는 header 정렬 + drag 범위 측정용, overflow 없음 */}
      <div ref={containerRef} className="max-w-[1440px] mx-auto w-full flex flex-col gap-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-4 w-full">
          <motion.h2
            className="text-[44px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-display)] whitespace-nowrap"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            문화사가 만드는 교육 현장 소식
          </motion.h2>
          <motion.a
            href="/activity"
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] self-start hover:opacity-90 transition-opacity"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.95 }}
          >
            소식 보기
          </motion.a>
        </div>

        {/* Cards — overflow 없음, 오른쪽으로 자연스럽게 흘러넘침 */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 items-start cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ left: snapPoints[snapPoints.length - 1] ?? 0, right: 0 }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
        >
          {NEWS_DATA.map((item, i) => (
            <NewsCard key={i} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

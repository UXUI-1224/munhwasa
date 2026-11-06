"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import ProductPopup from "@/components/ProductPopup";
import { type Product } from "@/data/products";

type Tab = "details" | "reviews" | "qna";

type Props = {
  product: Product;
};

export default function ProductDetailPage({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [popupOpen, setPopupOpen] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  const buyBtnRef = useRef<HTMLButtonElement>(null);

  const fmt = (n: number) => n.toLocaleString("ko-KR");
  const subtotal = product.price * quantity;
  const hasMultipleImages = product.images.length > 1;

  useEffect(() => {
    const btn = buyBtnRef.current;
    if (!btn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingBtn(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <GNB />

      <main className="flex flex-col gap-[80px] md:gap-[160px] pb-[80px] md:pb-[160px] pt-[80px] md:pt-[120px]">

        {/* ── Product Info ───────────────────────────────────────────────── */}
        <section className="pt-[40px] md:pt-[80px]">
          <div className="max-w-[1440px] mx-auto w-full px-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-[48px] md:gap-[80px] items-stretch justify-between">

                {/* Left: Main Image */}
                <div className="relative flex-1 aspect-square overflow-hidden bg-[var(--bg-gray)] rounded-[8px]">
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col justify-between gap-[37px] flex-1">

                {/* Top */}
                <div className="flex flex-col gap-[49px]">
                  <div className="flex flex-col gap-[41px]">

                    {/* Name + Desc + Price + Shipping */}
                    <div className="flex flex-col gap-[30px]">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-[28px] font-medium leading-[1.4] text-[var(--txt-label)]">
                            {product.name}
                          </p>
                          <p className="text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-caption)]">
                            {product.desc}
                          </p>
                        </div>
                        <p className="text-[20px] font-medium leading-[1.4] tracking-[-0.02em] text-[var(--txt-label)]">
                          {fmt(product.price)}원
                        </p>
                      </div>

                      <div className="h-px bg-[#E5E5E5]" />

                      <div className="flex flex-col gap-1 text-[18px] tracking-[-0.02em]">
                        <div className="flex gap-[10px] items-center">
                          <span className="font-medium text-[var(--txt-label)] whitespace-nowrap">배송 방법</span>
                          <span className="font-normal text-[var(--txt-label)]">{product.shippingMethod}</span>
                        </div>
                        {product.shippingCost > 0 && (
                          <div className="flex gap-[10px] items-center">
                            <span className="font-medium text-[var(--txt-label)] whitespace-nowrap">배송비</span>
                            <span className="font-normal text-[var(--txt-label)]">{fmt(product.shippingCost)}원</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="bg-[var(--bg-gray)] px-6 pt-5 pb-4 flex flex-col gap-5 rounded-[8px]">
                      <p className="text-[20px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-label)]">
                        수량
                      </p>
                      <div className="h-px bg-[#E5E5E5]" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-stretch h-[35px] border border-black">
                          <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-[52px] flex items-center justify-center text-[20px] text-[var(--txt-label)] border-r border-black hover:bg-[var(--bg-gray)] transition-colors"
                            aria-label="수량 감소"
                          >
                            −
                          </button>
                          <span className="w-[52px] flex items-center justify-center text-[16px] font-normal text-[var(--txt-label)]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-[52px] flex items-center justify-center text-[20px] text-[var(--txt-label)] border-l border-black hover:bg-[var(--bg-gray)] transition-colors"
                            aria-label="수량 증가"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[20px] font-medium text-[#9F9F9F] tracking-[-0.02em]">
                          {fmt(product.price * quantity)}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total + CTA */}
                <div className="flex flex-col gap-[24px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] font-normal text-[#6A6A6A] tracking-[-0.02em] whitespace-nowrap">
                      총 상품 금액({quantity}개)
                    </p>
                    <p className="text-[24px] font-semibold text-[var(--txt-label)] tracking-[-0.02em]">
                      {fmt(subtotal)}원
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      ref={buyBtnRef}
                      onClick={() => setPopupOpen(true)}
                      className="flex-1 h-[70px] flex items-center justify-center bg-[var(--bg-primary)] text-[18px] font-medium text-white tracking-[-0.02em] hover:opacity-90 transition-opacity rounded-[8px]"
                    >
                      구매하기
                    </button>
                    <button
                      onClick={() => setPopupOpen(true)}
                      className="flex-1 h-[70px] flex items-center justify-center border border-[var(--bg-primary)] text-[18px] font-medium text-[var(--bg-primary)] tracking-[-0.02em] hover:bg-[var(--bg-primary-softer)] transition-colors rounded-[8px]"
                    >
                      문의하기
                    </button>
                  </div>
                </div>
              </div>
              </div>

              {/* Thumbnails — below image, left-aligned */}
              {hasMultipleImages && (
                <div className="flex gap-6 items-center">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-[98px] h-[98px] shrink-0 overflow-hidden border-2 transition-colors rounded-[8px] ${
                        activeImage === i
                          ? "border-[var(--bg-primary)]"
                          : "border-[var(--border-neutral)]"
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Product Detail Tabs ────────────────────────────────────────── */}
        <section>
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-[80px]">

            {/* Tabs — sticky */}
            <div className="md:relative md:top-auto sticky top-[80px] z-40 flex items-stretch">
              {(
                [
                  { key: "details", label: "상세 정보" },
                  { key: "reviews", label: "구매평" },
                  { key: "qna", label: "Q&A" },
                ] as { key: Tab; label: string }[]
              ).map(({ key, label }, i, arr) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 flex items-center justify-center py-4 md:py-6 text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] transition-colors ${
                    i === 0 ? "rounded-l-[8px]" : ""
                  } ${
                    i === arr.length - 1 ? "rounded-r-[8px]" : ""
                  } ${
                    activeTab === key
                      ? "bg-[var(--bg-primary)] text-white"
                      : "bg-white border border-[var(--border-neutral)] text-[var(--txt-body)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "details" && (
                <div className="flex flex-col gap-[60px]">

                  {/* Features */}
                  <div className="flex flex-col gap-6">
                    {product.features.map((f, i, arr) => (
                      <div key={f.title} className={`flex flex-col gap-2 pb-6 ${i < arr.length - 1 ? "border-b border-[var(--border-neutral)]" : ""}`}>
                        <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.02em] text-[var(--txt-label)]">
                          {f.title}
                        </p>
                        <p className="text-[15px] font-normal leading-[1.7] tracking-[-0.02em] text-[var(--txt-body)]">
                          {f.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Spec Table */}
                  <div className="flex flex-col gap-5">
                    <p className="text-[15px] font-normal leading-[24px] text-[#363636] tracking-[-0.02em]">
                      상품정보 제공고시
                    </p>
                    <div>
                      {product.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex border-b border-[rgba(128,128,128,0.14)] border-t -mt-px"
                        >
                          <div className="bg-[rgba(128,128,128,0.05)] px-3 py-2 w-[180px] md:w-[256px] shrink-0">
                            <p className="text-[12px] font-normal leading-[19.2px] text-[#363636] tracking-[-0.02em]">
                              {spec.label}
                            </p>
                          </div>
                          <div className="px-3 py-2 flex-1">
                            <p className="text-[12px] font-normal leading-[19.2px] text-[#363636] tracking-[-0.02em]">
                              {spec.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="flex flex-col items-center justify-center py-[80px] gap-4">
                  <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-caption)]">
                    아직 등록된 구매평이 없습니다.
                  </p>
                </div>
              )}

              {activeTab === "qna" && (
                <div className="flex flex-col items-center justify-center py-[80px] gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-caption)]">
                      아직 등록된 Q&A가 없습니다.
                    </p>
                    <p className="text-[16px] font-normal text-[var(--txt-caption-soft)] tracking-[-0.02em]">
                      궁금한 점이 있으시면 문의해 주세요.
                    </p>
                  </div>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="px-8 h-[52px] flex items-center justify-center border border-[var(--bg-primary)] text-[16px] font-medium text-[var(--bg-primary)] tracking-[-0.02em] hover:bg-[var(--bg-primary-softer)] transition-colors rounded-[8px]"
                  >
                    문의하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Floating Buy Button ────────────────────────────────────────── */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--border-neutral)] px-6 py-4"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="max-w-[640px] mx-auto w-full flex gap-3">
              <button
                onClick={() => setPopupOpen(true)}
                className="flex-1 h-[56px] flex items-center justify-center bg-[var(--bg-primary)] text-[18px] font-medium text-white tracking-[-0.02em] hover:opacity-90 transition-opacity rounded-[8px]"
              >
                구매하기
              </button>
              <button
                onClick={() => setPopupOpen(true)}
                className="flex-1 h-[56px] flex items-center justify-center border border-[var(--bg-primary)] text-[18px] font-medium text-[var(--bg-primary)] tracking-[-0.02em] hover:bg-[var(--bg-primary-softer)] transition-colors rounded-[8px]"
              >
                문의하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}

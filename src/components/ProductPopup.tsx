"use client";

import { AnimatePresence, motion } from "motion/react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProductPopup({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Dim */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Card */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-[33px] bg-white rounded-[24px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.08)] px-[80px] py-[24px] w-[360px]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-label)] whitespace-nowrap">
              현재 준비 중인 상품입니다.
            </p>
            <button
              onClick={onClose}
              className="flex items-center justify-center px-4 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-white)] hover:opacity-90 transition-opacity"
            >
              확인
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

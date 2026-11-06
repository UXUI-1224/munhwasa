import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const NEWS_CARDS = [
  {
    id: 1,
    image: "/assets/activity-news-1.png",
    category: "현장소식",
    title: "영유아 교육 현장",
    date: "2026.10.21",
  },
  {
    id: 2,
    image: "/assets/activity-news-2.png",
    category: "보도자료",
    title: "2026년 하반기 원장 초청 설명회",
    date: "2026.10.21",
  },
];

export default function ActivityPage() {
  return (
    <div className="relative flex flex-col overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        {/* SubHero */}
        <section className="w-full pt-[80px] md:pt-[120px] bg-[var(--bg-white)]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between gap-6">
            <div className="flex flex-col gap-6 shrink-0 w-[464px]">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
                COMMUNITY
              </p>
              <h1 className="text-[28px] md:text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
                문화사가 만든 순간들
              </h1>
            </div>
            <div className="flex-1 max-w-[830px] text-right">
              <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                문화사가 만든 특별한 순간에 대해 확인해 보세요
              </p>
            </div>
          </div>
        </section>

        {/* Card Grid */}
        <section className="w-full md:py-[120px] pb-[120px] pt-[60px]">
          <div className="max-w-[1440px] mx-auto w-full px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {NEWS_CARDS.map((card) => (
                <Link
                  key={card.id}
                  href={`/activity/${card.id}`}
                  className="flex flex-col gap-6 pb-6 group"
                >
                  <div className="relative w-full aspect-[420/315] rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-[14px] md:text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-caption)]">
                        {card.category}
                      </p>
                      <p className="text-[20px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[var(--txt-heading)]">
                        {card.title}
                      </p>
                    </div>
                    <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--txt-caption-soft)]">
                      {card.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

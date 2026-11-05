import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import Link from "next/link";

const POSTS = [
  { id: 1, no: "01", title: "문화사 홈페이지가 오픈했습니다.", date: "2026.11.05" },
];

export default function NewsPage() {
  return (
    <div className="relative flex flex-col overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        {/* SubHero */}
        <section className="w-full pt-[120px] pb-[80px] bg-[var(--bg-white)]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between gap-6">
            <div className="flex flex-col gap-6 shrink-0 w-[464px]">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
                NEWS
              </p>
              <h1 className="text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
                문화사 소식
              </h1>
            </div>
            <div className="flex-1 max-w-[830px] text-right">
              <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                문화사의 다양한 소식을 확인해 보세요
              </p>
            </div>
          </div>
        </section>

        {/* Board Table */}
        <section className="w-full bg-white pb-[160px] pt-[96px]">
          <div className="max-w-[1440px] mx-auto w-full px-6">
            <div className="flex flex-col w-full">
              {/* Header */}
              <div className="flex items-center w-full border-t border-[#959595]">
                <div className="flex items-center justify-center w-20 h-12 px-6 py-3">
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-label)]">
                    No
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center h-12 py-3">
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-label)]">
                    제목
                  </p>
                </div>
                <div className="flex items-center justify-center w-[150px] h-12 py-3">
                  <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[var(--txt-label)]">
                    작성시간
                  </p>
                </div>
              </div>

              {/* Rows */}
              {POSTS.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/news/${post.id}`}
                  className={`flex items-center w-full border-t border-[#E1E1E1] hover:bg-[var(--bg-gray)] transition-colors${
                    i === POSTS.length - 1 ? " border-b border-b-[#E1E1E1]" : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-20 p-6">
                    <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[#A6A6A6]">
                      {post.no}
                    </p>
                  </div>
                  <div className="flex flex-1 items-center px-4 py-6">
                    <p className="text-[16px] font-normal leading-[1.2] tracking-[-0.04em] text-[var(--txt-body)]">
                      {post.title}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-[150px] p-6">
                    <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[#A6A6A6]">
                      {post.date}
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

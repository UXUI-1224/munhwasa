import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<string, { category: string; title: string; date: string; views: number; body: string[] }> = {
  "1": {
    category: "공지사항",
    title: "문화사 홈페이지가 오픈했습니다.",
    date: "2026.11.05",
    views: 1,
    body: [
      "안녕하세요, 문화사입니다.",
      "문화사 공식 홈페이지가 오픈하였습니다.",
      "문화사는 10년 이상의 노하우를 바탕으로 영유아 교육기관을 지원하는 전문 기업입니다. AI 기반 관찰 솔루션부터 교육 콘텐츠, 교사·부모 코칭까지 다양한 서비스를 통해 영유아 교육기관의 운영과 아이들의 성장을 함께 지원하겠습니다.",
      "앞으로도 문화사에 많은 관심과 성원 부탁드립니다.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((id) => ({ id }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = POSTS[id];
  if (!post) notFound();

  return (
    <div className="relative flex flex-col overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        {/* Dark Hero Section */}
        <section className="relative w-full overflow-hidden" style={{ height: "450px" }}>
          <div className="absolute inset-0 bg-[#2a1e18]" />
          <div
            className="absolute overflow-hidden"
            style={{
              left: "30.88%",
              width: "38.28%",
              height: "120.29%",
              top: "-10.25%",
            }}
          >
            <Image
              src="/assets/board-detail-hero.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)]" />

          {/* Centered text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pb-5">
            <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[#E8E8E8]">
              {post.category}
            </p>
            <Image
              src="/assets/board-detail-border.svg"
              alt=""
              width={36}
              height={2}
            />
            <p className="text-[24px] font-semibold leading-[1.3] tracking-[-0.06em] text-[#E8E8E8] text-center px-6">
              {post.title}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full pb-[160px] pt-10">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-9">
            {/* Metadata */}
            <div className="flex gap-[10px] items-center text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--txt-display)]">
              <span>{post.date}</span>
            </div>

            {/* Body text */}
            <div className="flex flex-col gap-4 text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-display)]">
              {post.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Back button */}
            <Link
              href="/news"
              className="flex items-center self-start px-4 py-3 rounded-full bg-[var(--bg-primary)] text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-white hover:opacity-90 transition-opacity"
            >
              목록
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

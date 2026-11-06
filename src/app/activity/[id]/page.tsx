import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<
  string,
  { category: string; title: string; date: string; views: number; image: string; body: string[] }
> = {
  "1": {
    category: "현장소식",
    title: "영유아 교육 현장",
    date: "2026.10.21",
    views: 24,
    image: "/assets/activity-news-1.png",
    body: [
      "문화사가 함께한 영유아 교육 현장의 소중한 순간을 담았습니다.",
      "아이들의 밝은 웃음 속에서 배움이 놀이가 되고, 놀이가 배움이 되는 특별한 시간이었습니다. 문화사는 앞으로도 현장의 목소리에 귀 기울이며 더 나은 교육 환경을 만들어 나가겠습니다.",
    ],
  },
  "2": {
    category: "보도자료",
    title: "2026년 하반기 원장 초청 설명회",
    date: "2026.10.21",
    views: 48,
    image: "/assets/activity-news-2.png",
    body: [
      "2026년 하반기 원장 초청 설명회가 성황리에 개최되었습니다.",
      "전국 각지에서 모인 원장님들과 함께 AI 기반 행동관찰 솔루션 킨더로그와 최신 교육 트렌드를 공유하는 뜻깊은 자리였습니다. 현장의 귀한 의견을 바탕으로 더욱 발전된 서비스로 보답하겠습니다.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((id) => ({ id }));
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

            {/* Content image */}
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "600px" }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Body text */}
            <div className="flex flex-col gap-4 text-[16px] font-normal leading-[1.4] tracking-[-0.02em] text-[var(--txt-display)]">
              {post.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Back button */}
            <Link
              href="/activity"
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

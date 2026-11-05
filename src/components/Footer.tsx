import Image from "next/image";
import Link from "next/link";

const NAV_COLUMNS: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "문화사",
    items: [
      { label: "About 문화사", href: "/about" },
      { label: "사업 영역",    href: "/business" },
      { label: "연혁",         href: "/history" },
    ],
  },
  {
    title: "솔루션",
    items: [
      { label: "킨더로그", href: "#" },
      { label: "냠냠키즈", href: "#" },
    ],
  },
  {
    title: "교육/코칭",
    items: [
      { label: "교사 코칭",  href: "/education/teacher" },
      { label: "부모 코칭",  href: "/education/parent" },
      { label: "원장 세미나", href: "/education/seminar" },
    ],
  },
  {
    title: "체험/행사",
    items: [
      { label: "하이포레스트", href: "/experience/hiforest" },
      { label: "공연/행사",   href: "/experience/concerts" },
    ],
  },
    {
    title: "스토어",
    items: [
      { label: "놀이/교구",   href: "/store/toys" },
      { label: "식품",        href: "/store/food" },
      { label: "교육 콘텐츠", href: "/store/contents" },
    ],
  },
  {
    title: "소식/자료",
    items: [
      { label: "공지사항",  href: "/news" },
      { label: "활동 소식", href: "/activity" },
    ],
  },
  {
    title: "상담문의",
    items: [
      { label: "기관 도입 상담", href: "/contact?tab=institution" },
      { label: "일반 문의",     href: "/contact?tab=general" },
    ],
  },
];


export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-black)] py-[80px]">
      <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-12">
      {/* Top: Logo + Nav columns */}
      <div className="flex items-start justify-between w-full">
        {/* Logo */}
        <Image
          src="/assets/logo-vertical-white.svg"
          alt="문화사"
          width={115}
          height={52}
        />

        {/* Nav columns */}
        <div className="flex gap-6">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-6 min-w-[120px]">
              <p className="text-[16px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#F6F6F6] whitespace-nowrap">
                {col.title}
              </p>
              <div className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[#E8E8E8] whitespace-nowrap hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Company info + copyright */}
      <div className="flex gap-4 items-start w-full">
        {/* Company info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Legal + Copyright */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)] hover:text-white transition-colors"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)] hover:text-white transition-colors"
              >
                개인정보 취급처리방침
              </a>
            </div>
            <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)]">
              Copyright Ⓒ Munhwasha All Right Reserved.
            </p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

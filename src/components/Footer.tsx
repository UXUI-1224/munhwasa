import Image from "next/image";


export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-black)] py-[80px]">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-[64px] flex flex-col gap-12">
      {/* Top: Logo */}
      <div className="flex items-start w-full">
        <Image
          src="/assets/logo-vertical-white.svg"
          alt="문화사"
          width={115}
          height={52}
        />
      </div>

      {/* Bottom: Company info + copyright */}
      <div className="flex flex-col gap-6 md:gap-4 w-full">

        {/* Company info rows */}
        <div className="flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <span className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)]">주식회사 문화사</span>
            <div className="hidden md:block w-px h-[14px] bg-[var(--gray-500)] shrink-0" />
            <span className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)]">대표이사 김순배</span>
            <div className="hidden md:block w-px h-[14px] bg-[var(--gray-500)] shrink-0" />
            <span className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)]">메일 munhwasa79@naver.com</span>
          </div>
          {/* Row 2 */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <span className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)]">사업자등록번호 406-81-66140</span>
            <div className="hidden md:block w-px h-[14px] bg-[var(--gray-500)] shrink-0" />
            <span className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--gray-500)]">주소 인천광역시 연수구 송도과학로 70, 1동 25층 2511호(송도동, 송도 AT센터)</span>
          </div>
        </div>

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
    </footer>
  );
}

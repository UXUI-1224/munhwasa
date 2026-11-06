"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

type Tab = "institution" | "general";

const PRIVACY_TEXT = `• 개인정보의 수집 및 이용목적
  - 고객 문의, 제품 불편사항, 기타 문의 서비스를 이용하시고자 할 경우, 해당 서비스를 위한 최소한의 개인정보만을 수집합니다. 수집한 개인정보는 서비스의 제공과 서비스에 대한 고객만족도 평가에 활용됩니다.

• 수집하는 개인정보의 항목
  - 이름, 주소, 전화번호, 이메일. 단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강 상태 및 성생활 등)는 수집하지 않습니다.

• 개인정보의 보유 및 이용기간
  - (주)문화사는 고객님이 동의한 개인정보 수집 목적 또는 제공받은 목적이 달성되거나, 고객님께서 삭제를 요청한 경우, 지체 없이 파기합니다. 단, 법에 의해 일정 기간 보유하여야 할 필요가 있을 경우에는 해당 기간 동안 고객님의 개인정보를 보유할 수 있습니다.`;

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 flex-1 min-w-0 w-full">
      <div>
        <span className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)]">
          {label}
        </span>
        {required && (
          <span className="text-[20px] font-semibold leading-[1.2] text-[var(--txt-primary)]"> *</span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-[#D4D4D4] rounded-2xl pl-8 pr-6 py-5 text-[14px] md:text-[16px] font-normal leading-[1.2] tracking-[-0.04em] text-[#7A7A7A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[var(--bg-primary)] transition-colors bg-white";

const selectClass =
  "w-full border border-[#D4D4D4] rounded-2xl pl-8 pr-6 py-5 text-[14px] md:text-[16px] font-normal leading-[1.2] tracking-[-0.04em] text-[#7A7A7A] focus:outline-none focus:border-[var(--bg-primary)] transition-colors bg-white appearance-none";

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M7 10.5L14 17.5L21 10.5"
        stroke="#7A7A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  return (
    <div className="flex gap-2 items-center w-full">
      <input
        className={inputClass}
        placeholder="010"
        value={value[0]}
        onChange={(e) => onChange([e.target.value, value[1], value[2]])}
        maxLength={4}
      />
      <span className="text-[16px] font-semibold text-[var(--txt-caption)] shrink-0">-</span>
      <input
        className={inputClass}
        placeholder="1234"
        value={value[1]}
        onChange={(e) => onChange([value[0], e.target.value, value[2]])}
        maxLength={4}
      />
      <span className="text-[16px] font-semibold text-[var(--txt-caption)] shrink-0">-</span>
      <input
        className={inputClass}
        placeholder="5678"
        value={value[2]}
        onChange={(e) => onChange([value[0], value[1], e.target.value])}
        maxLength={4}
      />
    </div>
  );
}

function PrivacySection({
  agreed,
  onToggle,
}: {
  agreed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)]">
        개인정보 취급방침
      </p>
      <div className="border border-[#D4D4D4] rounded-2xl px-6 py-5 h-[120px] overflow-y-auto">
        <pre className="text-[14px] font-normal leading-[1.2] tracking-[-0.02em] text-[#7A7A7A] whitespace-pre-wrap font-[inherit]">
          {PRIVACY_TEXT}
        </pre>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span
          className={`flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded border ${
            agreed
              ? "bg-[var(--bg-primary)] border-[var(--bg-primary)]"
              : "bg-white border-[#D4D4D4]"
          } transition-colors shrink-0`}
        >
          {agreed && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7L5.5 10L11.5 4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="text-[14px] md:text-[16px] font-normal leading-[1.2] tracking-[-0.04em] text-[var(--txt-label)]">
          개인정보정책에 동의합니다.
        </span>
      </button>
    </div>
  );
}

function InstitutionForm() {
  const [solution, setSolution] = useState("");
  const [method, setMethod] = useState("");
  const [institution, setInstitution] = useState("");
  const [instType, setInstType] = useState("");
  const [manager, setManager] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(["", "", ""]);
  const [classCount, setClassCount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-16 w-full">
      {/* Required note */}
      <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[#7A7A7A] text-right w-full">
        <span className="text-[var(--txt-primary)]">*</span> 는 필수 입력 항목입니다.
      </p>

      {/* Row 1 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="관심 솔루션" required>
          <div className="relative">
            <select
              className={selectClass}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            >
              <option value="">관심이 있으신 솔루션을 선택해 주세요.</option>
              <option value="kinderlog">AI 행동관찰 솔루션 킨더로그</option>
              <option value="nyamnyam">식습관 분석 솔루션 냠냠키즈</option>
            </select>
            <ChevronDown />
          </div>
        </FormField>
        <FormField label="상담 방식" required>
          <div className="relative">
            <select
              className={selectClass}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">상담 방식을 선택해 주세요.</option>
              <option value="phone">전화 상담</option>
              <option value="visit">방문 상담</option>
              <option value="online">온라인 상담</option>
            </select>
            <ChevronDown />
          </div>
        </FormField>
      </div>

      {/* Row 2 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="기관명" required>
          <input
            className={inputClass}
            placeholder="기관명을 입력해 주세요."
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </FormField>
        <FormField label="기관 유형" required>
          <input
            className={inputClass}
            placeholder="기관 유형을 입력해 주세요."
            value={instType}
            onChange={(e) => setInstType(e.target.value)}
          />
        </FormField>
      </div>

      {/* Row 3 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="담당자" required>
          <input
            className={inputClass}
            placeholder="담당자 성함을 입력해 주세요."
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </FormField>
        <FormField label="지역" required>
          <input
            className={inputClass}
            placeholder="지역을 입력해 주세요."
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </FormField>
      </div>

      {/* Row 4 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="이메일" required>
          <input
            className={inputClass}
            placeholder="이메일을 입력해 주세요."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField label="대표 연락처" required>
          <PhoneField value={phone} onChange={setPhone} />
        </FormField>
      </div>

      {/* Full width */}
      <FormField label="예상 도입 반 수" required>
        <input
          className={inputClass}
          placeholder="솔루션을 도입하고자 하는 반의 개수를 입력해 주세요."
          value={classCount}
          onChange={(e) => setClassCount(e.target.value)}
        />
      </FormField>

      <PrivacySection agreed={agreed} onToggle={() => setAgreed(!agreed)} />

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[var(--bg-primary)] text-white text-[16px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
        >
          문의하기
        </button>
      </div>
    </form>
  );
}

function GeneralForm() {
  const [inquiryType, setInquiryType] = useState("");
  const [institution, setInstitution] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(["", "", ""]);
  const [classCount, setClassCount] = useState("");
  const [content, setContent] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-16 w-full">
      {/* Required note */}
      <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.04em] text-[#7A7A7A] text-right w-full">
        <span className="text-[var(--txt-primary)]">*</span> 는 필수 입력 항목입니다.
      </p>

      {/* Row 1 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="문의 유형" required>
          <div className="relative">
            <select
              className={selectClass}
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
            >
              <option value="">문의 유형을 선택해 주세요.</option>
              <option value="solution">솔루션 문의</option>
              <option value="education">교육/코칭 문의</option>
              <option value="program">프로그램 문의</option>
              <option value="other">기타</option>
            </select>
            <ChevronDown />
          </div>
        </FormField>
        <FormField label="기관명">
          <input
            className={inputClass}
            placeholder="기관명을 입력해 주세요."
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </FormField>
      </div>

      {/* Row 2 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="직급 및 담당">
          <input
            className={inputClass}
            placeholder="사내 직급 및 담당에 대해 입력해주세요."
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </FormField>
        <FormField label="이름" required>
          <input
            className={inputClass}
            placeholder="성함을 입력해 주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>
      </div>

      {/* Row 3 */}
      <div className="flex gap-6 items-start w-full md:flex-row flex-col">
        <FormField label="이메일" required>
          <input
            className={inputClass}
            placeholder="이메일을 입력해 주세요."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField label="대표 연락처" required>
          <PhoneField value={phone} onChange={setPhone} />
        </FormField>
      </div>

      {/* Full width */}
      <FormField label="예상 도입 반 수" required>
        <input
          className={inputClass}
          placeholder="솔루션을 도입하고자 하는 반의 개수를 입력해 주세요."
          value={classCount}
          onChange={(e) => setClassCount(e.target.value)}
        />
      </FormField>

      <FormField label="문의 내용" required>
        <textarea
          className="w-full border border-[#D4D4D4] rounded-2xl pl-8 pr-6 py-5 text-[14px] md:text-[16px] font-normal leading-[1.4] tracking-[-0.04em] text-[#7A7A7A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[var(--bg-primary)] transition-colors bg-white resize-none h-[120px]"
          placeholder="문의 내용을 입력해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormField>

      <PrivacySection agreed={agreed} onToggle={() => setAgreed(!agreed)} />

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[var(--bg-primary)] text-white text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] min-w-[200px] px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
        >
          문의하기
        </button>
      </div>
    </form>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam === "general" ? "general" : "institution"
  );

  useEffect(() => {
    if (tabParam === "general") setActiveTab("general");
    else setActiveTab("institution");
  }, [tabParam]);

  return (
    <div className="relative flex flex-col overflow-x-hidden bg-[var(--bg-white)]">
      <GNB />
      <main className="flex flex-col w-full">
        {/* SubHero */}
        <section className="w-full pt-[120px] pb-[80px] bg-[var(--bg-white)]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex items-end justify-between gap-6">
            <div className="flex flex-col gap-6 shrink-0 w-[464px]">
              <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-[var(--txt-primary)]">
                Customer Service
              </p>
              <h1 className="text-[28px] md:text-[48px] font-semibold leading-none tracking-[-0.06em] text-[var(--txt-display)]">
                상담문의
              </h1>
            </div>
            <div className="flex-1 max-w-[830px] text-right">
              <p className="text-[20px] font-semibold leading-[1.6] tracking-[-0.04em] text-[var(--txt-heading)]">
                문화사에 대해 궁금한 점이 있다면 무엇이든 자유롭게 문의하세요
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full pb-[160px]">
          <div className="max-w-[1440px] mx-auto w-full px-6 flex flex-col gap-10">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("institution")}
                className={`flex items-center px-5 py-3 md:px-6 md:py-4 rounded-full text-[16px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                  activeTab === "institution"
                    ? "bg-[var(--bg-primary)] text-white"
                    : "border border-[#D4D4D4] text-[#D4D4D4] hover:border-[var(--bg-primary)] hover:text-[var(--bg-primary)]"
                }`}
              >
                기관 도입 상담
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`flex items-center px-5 py-3 md:px-6 md:py-4 rounded-full text-[16px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.04em] text-left transition-colors ${
                  activeTab === "general"
                    ? "bg-[var(--bg-primary)] text-white"
                    : "border border-[#D4D4D4] text-[#D4D4D4] hover:border-[var(--bg-primary)] hover:text-[var(--bg-primary)]"
                }`}
              >
                일반 문의
              </button>
            </div>

            {/* Form */}
            {activeTab === "institution" ? <InstitutionForm /> : <GeneralForm />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  );
}

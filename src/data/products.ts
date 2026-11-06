// ─── Product Data ──────────────────────────────────────────────────────────────

export type ProductCategory = "toys" | "food" | "contents";

export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: ProductCategory;
  desc: string;
  shippingMethod: string;
  shippingCost: number;
  features: { title: string; content: string }[];
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Record<string, Product> = {
  // ── 놀이/교구 ──────────────────────────────────────────────────────────────
  himnaeyut: {
    id: "himnaeyut",
    name: "힘내윷",
    price: 20000,
    images: ["/assets/store/store-toys-1.png"],
    category: "toys",
    desc: "전통 놀이로 어려운 규칙도 차근차근 이해해요",
    shippingMethod: "택배",
    shippingCost: 4500,
    features: [
      { title: "어떤 교구인가요?", content: "힘내윷은 전통 윷놀이를 현대적으로 재해석한 문화사의 자체 개발 교구입니다. 복잡하지 않은 규칙과 직관적인 구성으로 3세 이상 누구나 쉽게 즐길 수 있어요." },
      { title: "어떤 점이 좋나요?", content: "차례를 지키고, 규칙을 이해하고, 이기고 지는 과정을 반복하면서 사회성과 정서 조절 능력을 자연스럽게 키울 수 있습니다. 가족이 함께 즐기는 놀이 시간이 아이의 성장으로 이어집니다." },
      { title: "구성품", content: "윷 4개, 말 16개(4색), 게임판 1개, 규칙 카드 1장" },
      { title: "권장 연령", content: "만 3세 이상 / 2~6인용" },
    ],
    specs: [
      { label: "품명 및 모델명", value: "힘내윷" },
      { label: "KC 인증정보", value: "어린이제품 공통안전기준 KC 인증" },
      { label: "크기·중량", value: "게임판 30×30cm, 말 지름 2.5cm / 총 중량 약 320g" },
      { label: "색상", value: "혼합색상" },
      { label: "재질", value: "나무(윷), ABS 플라스틱(말), 아트지(게임판·카드)" },
      { label: "사용연령 또는 권장사용연령", value: "만 3세 이상 / 2~6인용" },
      { label: "크기·체중의 한계", value: "해당 없음" },
      { label: "동일모델의 출시년월", value: "2024년 1월" },
      { label: "제조자", value: "(주)문화사" },
      { label: "제조국", value: "대한민국" },
      { label: "취급방법 및 주의사항", value: "직사광선·습기 피해 보관 / 36개월 미만 영유아 사용 금지" },
      { label: "품질보증기준", value: "제조사 하자에 의한 경우 구입일로부터 1년" },
      { label: "A/S 책임자와 전화번호", value: "(주)문화사 고객센터 / 02-0000-0000" },
    ],
  },
  kintendo: {
    id: "kintendo",
    name: "킨텐도",
    price: 24000,
    images: ["/assets/store/store-toys-2.png", "/assets/store/store-toys-2-detail.png"],
    category: "toys",
    desc: "생활 루틴을 놀이로 연결해 감정을 표현하는 방법을 배워요",
    shippingMethod: "택배",
    shippingCost: 4500,
    features: [
      { title: "어떤 교구인가요?", content: "킨텐도는 아이의 일상 루틴(세수, 밥 먹기, 정리 등)을 놀이로 연결하는 생활습관 교구입니다. 매일 반복되는 루틴을 게임처럼 즐기며 스스로 해내는 경험을 쌓을 수 있어요." },
      { title: "어떤 점이 좋나요?", content: "미션 카드를 완료할 때마다 스티커를 붙이고, 감정 카드로 오늘의 기분을 표현합니다. 성취감과 감정 표현 능력을 동시에 길러주는 구성이에요." },
      { title: "구성품", content: "루틴 미션 카드 72장, 감정 표현 카드 24장, 보상 스티커 100매, 활동 보드 1개" },
      { title: "권장 연령", content: "만 3~8세" },
    ],
    specs: [
      { label: "품명 및 모델명", value: "킨텐도" },
      { label: "KC 인증정보", value: "어린이제품 공통안전기준 KC 인증" },
      { label: "크기·중량", value: "활동 보드 25×35cm / 총 중량 약 280g" },
      { label: "색상", value: "혼합색상" },
      { label: "재질", value: "아트지(카드), PP(활동 보드), EVA(스티커)" },
      { label: "사용연령 또는 권장사용연령", value: "만 3~8세" },
      { label: "크기·체중의 한계", value: "해당 없음" },
      { label: "동일모델의 출시년월", value: "2024년 3월" },
      { label: "제조자", value: "(주)문화사" },
      { label: "제조국", value: "대한민국" },
      { label: "취급방법 및 주의사항", value: "습기 피해 보관 / 36개월 미만 영유아 사용 금지" },
      { label: "품질보증기준", value: "제조사 하자에 의한 경우 구입일로부터 1년" },
      { label: "A/S 책임자와 전화번호", value: "(주)문화사 고객센터 / 02-0000-0000" },
    ],
  },
  homswithome: {
    id: "homswithome",
    name: "홈스윗홈",
    price: 12000,
    images: ["/assets/store/store-toys-3.png"],
    category: "toys",
    desc: "가족 놀이를 통해 몰입하고 표현하는 방법을 배워요",
    shippingMethod: "택배",
    shippingCost: 4500,
    features: [
      { title: "어떤 교구인가요?", content: "홈스윗홈은 가족 역할극을 통해 아이가 다양한 감정과 상황을 경험하는 역할놀이 교구입니다. 가족 구성원 카드와 집 꾸미기 타일로 아이만의 집을 완성해 보세요." },
      { title: "어떤 점이 좋나요?", content: "역할을 맡아 연기하고, 상황에 맞는 대화를 나누면서 공감 능력과 창의적 표현력이 자랍니다. 부모와 함께하는 놀이로 애착 관계도 더욱 돈독해져요." },
      { title: "구성품", content: "가족 카드 20장, 집 꾸미기 타일 48개, 이벤트 카드 30장, 게임 보드 1개" },
      { title: "권장 연령", content: "만 4~9세 / 2~5인용" },
    ],
    specs: [
      { label: "품명 및 모델명", value: "홈스윗홈" },
      { label: "KC 인증정보", value: "어린이제품 공통안전기준 KC 인증" },
      { label: "크기·중량", value: "게임 보드 28×28cm / 총 중량 약 250g" },
      { label: "색상", value: "혼합색상" },
      { label: "재질", value: "아트지(카드·타일), 종이(보드)" },
      { label: "사용연령 또는 권장사용연령", value: "만 4~9세 / 2~5인용" },
      { label: "크기·체중의 한계", value: "해당 없음" },
      { label: "동일모델의 출시년월", value: "2024년 2월" },
      { label: "제조자", value: "(주)문화사" },
      { label: "제조국", value: "대한민국" },
      { label: "취급방법 및 주의사항", value: "직사광선·습기 피해 보관" },
      { label: "품질보증기준", value: "제조사 하자에 의한 경우 구입일로부터 1년" },
      { label: "A/S 책임자와 전화번호", value: "(주)문화사 고객센터 / 02-0000-0000" },
    ],
  },

  // ── 식품 ───────────────────────────────────────────────────────────────────
  hanip: {
    id: "hanip",
    name: "한입에꿀떡",
    price: 34000,
    images: ["/assets/store/store-food-1.png", "/assets/store/store-food-1-detail.png"],
    category: "food",
    desc: "떡국 에너지를 통해 우리 아이의 키와 지혜가 자라요",
    shippingMethod: "택배",
    shippingCost: 4500,
    features: [
      { title: "어떤 제품인가요?", content: "한입에꿀떡은 국내산 쌀로 만든 아이 전용 가래떡입니다. 떡국용으로 먹기 좋은 크기로 썰어 냉동 포장했으며, 명절이나 아이 간식으로 간편하게 활용할 수 있어요." },
      { title: "원재료 및 성분", content: "국내산 쌀 100% 사용. 무방부제, 무색소, 무첨가물. 알레르기 유발물질: 없음(제조 공정 중 대두 혼입 가능성 있음)" },
      { title: "보관 방법", content: "냉동 보관 (-18°C 이하). 해동 후 재냉동 불가. 개봉 후 가급적 즉시 섭취해 주세요." },
      { title: "구성", content: "1박스 20개입 / 총 중량 400g / 유통기한: 제조일로부터 12개월" },
    ],
    specs: [
      { label: "제품명", value: "한입에꿀떡 가래떡 (냉동)" },
      { label: "식품의 유형", value: "떡류" },
      { label: "제조원 / 유통전문판매원", value: "(주)문화사" },
      { label: "소비기한", value: "냉동 보관 시 제조일로부터 12개월" },
      { label: "내용량", value: "400g (20개입)" },
      { label: "원재료명 및 함량", value: "쌀(국내산) 100%" },
      { label: "영양성분", value: "1회 제공량 20g 기준 / 열량 44kcal / 탄수화물 10g / 단백질 1g / 지방 0g / 나트륨 1mg" },
      { label: "보관방법", value: "냉동 보관 (-18°C 이하) / 해동 후 재냉동 불가" },
      { label: "주의사항", value: "개봉 후 즉시 섭취 권장 / 제조 공정 중 대두 혼입 가능성 있음" },
      { label: "고객상담실", value: "(주)문화사 고객센터 / 02-0000-0000" },
    ],
  },

  // ── 교육 콘텐츠 ────────────────────────────────────────────────────────────
  "siksa-content": {
    id: "siksa-content",
    name: "우리 아이 식사 습관 콘텐츠",
    price: 2000,
    images: ["/assets/store/store-edu-1.png"],
    category: "contents",
    desc: "영상을 보면서 편식하는 습관을 고칠 수 있어요",
    shippingMethod: "디지털 콘텐츠",
    shippingCost: 0,
    features: [
      { title: "어떤 콘텐츠인가요?", content: "편식 습관을 가진 아이를 위해 문화사가 제작한 감정 기반 식습관 교육 영상입니다. 아이가 좋아하는 캐릭터와 함께 다양한 음식을 경험하며 자연스럽게 편식을 줄여나갑니다." },
      { title: "구성", content: "총 10화 구성 / 화당 약 5분 분량 / 스트리밍 방식 제공 (다운로드 불가)" },
      { title: "이용 방법", content: "구매 완료 후 등록된 이메일로 시청 링크가 발송됩니다. 별도 앱 설치 없이 모바일·PC 브라우저에서 바로 시청 가능해요." },
      { title: "이용 기간", content: "결제일로부터 180일간 무제한 시청 가능" },
    ],
    specs: [
      { label: "콘텐츠명", value: "우리 아이 식사 습관 콘텐츠" },
      { label: "제공 형태", value: "스트리밍 (다운로드 불가) / 총 10화 구성" },
      { label: "이용 가능 기기", value: "모바일·태블릿·PC 브라우저 (별도 앱 설치 불필요)" },
      { label: "이용 기간", value: "결제일로부터 180일" },
      { label: "제작자", value: "(주)문화사" },
      { label: "환불 조건", value: "미시청 시 결제일로부터 7일 이내 전액 환불 / 1화라도 시청 후 환불 불가" },
      { label: "고객상담실", value: "(주)문화사 고객센터 / 02-0000-0000" },
    ],
  },
};

export const PRODUCTS_BY_CATEGORY: Record<ProductCategory, Product[]> = {
  toys: ["himnaeyut", "kintendo", "homswithome"].map((id) => PRODUCTS[id]),
  food: ["hanip"].map((id) => PRODUCTS[id]),
  contents: ["siksa-content"].map((id) => PRODUCTS[id]),
};

// Map: existing listing page product names → product IDs for linking
export const PRODUCT_NAME_TO_ID: Record<string, string> = {
  힘내윷: "himnaeyut",
  킨텐도: "kintendo",
  홈스윗홈: "homswithome",
  한입에꿀떡: "hanip",
  "우리 아이 식사 습관 콘텐츠": "siksa-content",
};


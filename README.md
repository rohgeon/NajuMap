# VibeCoding Landing

A Next.js application for restaurant recommendations and location-based browsing.

## Features

- Map view with Naver Maps integration
- List view for restaurant browsing
- Restaurant detail pages
- Filter by food type, price, rating, and more
- Restaurant recommendation feature

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Naver Maps API

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID=your_naver_maps_client_id
OPENAI_API_KEY=your_openai_api_key (optional, for recommendations)
```

## Deployment

The project can be deployed using Vercel:

```bash
npm run build
```

## License

MIT


## PRD





**(1) Project Title**
 맛집지도 나주: AI 기반 나주혁신도시 맛집 추천 플랫폼

------

**(2) Project Objective**
 전라남도 나주혁신도시 거주자 및 방문객이 한 번의 클릭으로 가장 적합한 맛집을 찾도록 돕는 AI 웹 서비스입니다. 사용자의 위치와 선호도를 반영한 정량적 필터링(가격·거리·카테고리·편의시설)과 LLM 기반 리뷰·메뉴 분석을 결합해, 실시간으로 “나주혁신도시 추천 TOP3”를 제공하는 것이 목표입니다.

------

**(3) Target Users**

- **혁신도시 거주자 (25–50세)**: 출퇴근길·주말 외식 장소를 빠르게 찾길 원하는 직장인 및 가족 단위 사용자
- **신혼부부·젊은 부부**: 분위기·가성비·예약 가능 여부를 중시하는 사용자
- **외국인 연구원·교환학생**: 한국어 지도와 자연어 요약 추천을 통해 언어 장벽 없이 현지 식문화를 체험하고자 하는 사용자
- **미식 탐험가 (MZ세대)**: 인스타그램에 올릴 만한 비주얼과 신상 맛집을 발견하고자 하는 트렌드 세터

------

**(4) Core Features & Functionalities**

1. **다단계 지역 선택기**
   - 전라남도 → 나주시 → 빛가람동 등 3단계 드롭다운 + 자동 지오로케이션
2. **정량 필터 대시보드**
   - 카테고리(한식·양식·카페 등), 가격($~$$$$), 평점(0–5★), 최대 거리(1–10km), 편의시설(예약·주차·야외석 등)
   - 슬라이더·토글 UI, 선택 변경 시 즉시 지도·리스트 업데이트
3. **AI 매칭 & 요약**
   - 사용자 필터 결과를 기반으로 OpenAI GPT-4가 메뉴·리뷰를 분석해 “맞춤 한 줄 추천” 생성
   - TOP3 맛집에 대한 핵심 통계(평균 평점·리뷰 수·추천 메뉴) 요약 카드 제공
4. **실시간 지도 시각화**
   - Naver Maps API로 지도 렌더링, 핀 색상·크기로 매치 점수 표현
   - 핀 클릭 시 LLM 요약 추천 팝업 노출
5. **데이터 파이프라인 & 관리**
   - Naver/Kakao/Google Places API 우선 수집, Puppeteer 크롤링으로 보완
   - MongoDB Atlas에 위치 인덱스, Node.js 스케줄러(Verce­l Cron)로 매일 데이터 갱신

------

**(5) UI/UX Overview**

- **색상 테마**: 화이트 배경 + 오렌지 강조(#F97316) + 그레이 톤 텍스트
- **레이아웃**:
  - **데스크톱**: 왼쪽 300px 필터 사이드바 → 오른쪽 2/3 지도, 하단 리스트
  - **모바일**: 화면 상단 지역·필터 버튼 → 전체 화면 지도 → 하단 슬라이딩 리스트
- **사용자 흐름**:
  1. 첫 화면에서 “나주혁신도시” 자동 선택
  2. 필터 열기 → 선호도 선택 → “추천 받기” 클릭
  3. 지도·리스트 동기화 → 핀 또는 카드 클릭 시 요약 팝업/상세 페이지 이동

------

**(6) Technologies & APIs**

- **IDE & 협업**: CURSOR, GitHub
- **프론트엔드**: Next.js (App Router), React, Tailwind CSS, shadcn/ui, lucide-react
- **백엔드/API**: Next.js API Routes (Node.js, Express 스타일), Axios
- **AI/LLM**: OpenAI GPT-4 API
- **지도**: Naver Maps JavaScript API, Kakao Maps REST API, Google Places API
- **크롤링**: Puppeteer, Cheerio (Node.js)
- **데이터베이스**: MongoDB Atlas (지리공간 인덱스)
- **호스팅 & CI/CD**: Vercel (서버리스 함수), GitHub Actions for tests & cron jobs

------

**(7) Deployment Plan**

1. **개발 환경**: Vercel Preview Deployment (브랜치별)
2. **프로덕션**: Vercel 메인 브랜치 → 자동 배포
3. **환경 변수 관리**: Vercel Dashboard에 `NAVER_CLIENT_ID`, `KAKAO_KEY`, `GOOGLE_API_KEY`, `OPENAI_KEY`, `NEXT_PUBLIC_BASE_URL` 설정
4. **데이터 수집 스케줄**: Vercel Cron 또는 GitHub Actions로 매일 03:00에 `/api/collect` 호출

**(8) Project Timeline (5/14–6/11)**

- **Phase 1: Proposal & Specifications**
  - **5/14 (수) – 5/18 (일)**
  - PRD 최종 확정, 와이어프레임 초안 작성, API 키(Naver/Kakao/Google/OpenAI) 확보
- **Phase 2: UI Design & Prototyping**
  - **5/19 (월) – 5/25 (일)**
  - Figma로 데스크톱·모바일 핵심 화면 디자인, 사용자 흐름 검증
- **Phase 3: Core Development**
  - **5/26 (월) – 6/1 (일)**
  - 정량적 필터 UI, Naver Map 통합, Next.js API 라우트(`/api/collect`, `/api/restaurants`) 구현
  - MongoDB Atlas 연결 및 기본 데이터 저장
- **Phase 4: AI Integration & Personalization**
  - **6/2 (월) – 6/8 (일)**
  - OpenAI GPT-4 요약·추천 API 연동, 매칭 알고리즘 개발, Executive Summary 카드 UI 완성
- **Phase 5: QA & Testing**
  - **6/9 (화) – 6/10 (수)**
  - 유닛 테스트, 통합 테스트, 사용자 수용 테스트(UAT) 실시, 버그 수정
- **Phase 6: Launch & Handover**
  - **6/11 (목)**
  - 최종 검토, 도큐먼테이션 작성, Vercel 프로덕션 배포 및 운영팀 인수인계
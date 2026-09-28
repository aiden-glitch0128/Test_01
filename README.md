# Jeju Month Log

제주 한 달 살이 중 장소, 음식, 사진, 메모, 지출을 기록하는 모바일 우선 웹앱입니다. 현재 단계에서는 별도 백엔드 없이 mock 데이터와 브라우저 `localStorage`를 사용합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 여세요. 배포용 검증은 `npm run lint`와 `npm run build`로 실행합니다.

## 주요 구조

```text
app/                 # App Router 페이지 (홈, 기록, 타임라인, 통계)
components/          # 내비게이션, 카드, 로컬 데이터 Provider
lib/                 # 타입, mock 데이터, 포맷 유틸리티
public/images/       # mock 기록 이미지
```

`LogProvider`가 현재 데이터 접근 경계를 담당하므로, 추후 이 부분을 Supabase repository/API 호출로 교체할 수 있습니다. `.env.example`에는 향후 사용할 환경 변수 이름만 준비했습니다.

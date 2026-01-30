# Fix My Homepage - 문제 저장소

이 레포지토리는 [Fix My Homepage](https://github.com/SeoJaeWan/fix-my-homepage-site) 프로젝트의 문제 데이터를 관리합니다.

프론트엔드 개발자들이 실제로 마주할 수 있는 버그 상황을 체험하고 디버깅 능력을 향상시킬 수 있는 인터랙티브 학습 플랫폼입니다.

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/homepage.git
cd homepage

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속

## 🎯 현재 등록된 문제

총 **24개**의 React 문제가 등록되어 있습니다:

- `array-push-mutation` - 배열 직접 수정
- `callback-recreation` - 콜백 함수 재생성
- `context-value-identity` - Context value 객체 재생성
- `controlled-input` - Controlled Input 미작동
- `custom-hook-stale` - Custom Hook의 Stale Closure
- `derived-state-sync` - Derived State 동기화 문제
- `error-boundary` - Error Boundary 구현
- `event-listener-leak` - 이벤트 리스너 메모리 누수
- `fetch-user-data` - 비동기 데이터 fetching 경쟁 상태
- `form-validation-bug` - 폼 검증 로직 버그
- `infinite-rerender` - 무한 리렌더링
- `interval-cleanup` - setInterval cleanup 누락
- `key-index-bug` - 배열 인덱스를 key로 사용
- `map-no-return` - map에서 return 누락
- `optimistic-update` - Optimistic Update 실패 처리
- `portal-modal` - Portal을 사용한 Modal
- `race-condition` - Race Condition 처리
- `stale-closure` - Stale Closure 문제
- `state-batch-update` - 상태 배치 업데이트
- `suspense-cache` - Suspense Cache 구현
- `todo-app-complex` - 복잡한 Todo 앱
- `unnecessary-rerender` - 불필요한 리렌더링
- `useeffect-deps` - useEffect 의존성 배열 누락
- `usememo-deps` - useMemo 의존성 최적화

## 📁 프로젝트 구조

```
homepage/
├── app/
│   ├── problems/              # 문제 디렉토리
│   │   ├── context-value-identity/
│   │   │   ├── page.tsx       # Next.js 페이지
│   │   │   ├── problem.json   # 문제 메타데이터
│   │   │   ├── src/           # 버그가 있는 소스 코드
│   │   │   ├── solution/      # 해결 코드
│   │   │   └── test.tsx       # 테스트 코드
│   │   └── index.json         # 문제 인덱스 (자동 생성)
│   └── components/            # 공통 컴포넌트
├── scripts/                   # 유틸리티 스크립트
│   ├── create-problem.ts      # 새 문제 생성
│   └── generate-index.ts      # 인덱스 생성
└── __mocks__/                 # Jest 모킹 파일
```

## 🛠️ 개발 스크립트

```bash
# 개발 서버 실행 (포트 3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# 새 문제 생성 (대화형 CLI)
pnpm create-problem

# 문제 인덱스 생성
pnpm generate-index

# 전체 테스트 실행
pnpm test

# 테스트 watch 모드
pnpm test:watch
```

## 📋 문제 스키마

```typescript
interface Problem {
  title: string;                 // 한글 제목
  situation: string;             // 문제 상황 설명
  goals: string[];               // 달성 목표 리스트
  environment: {
    type: 'react';
    dependencies: Record<string, string>;
  };
  author: {
    github: string;              // GitHub username
  };
}
```

## 🤝 기여하기

새로운 문제를 기여하고 싶으신가요? 자세한 가이드는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

### 빠른 기여 절차

1. Repository Fork
2. 새 브랜치 생성 (`git checkout -b problem/new-problem`)
3. 문제 생성 (`pnpm create-problem`)
4. 테스트 작성 및 확인 (`pnpm test`)
5. 인덱스 생성 (`pnpm generate-index`)
6. 커밋 & Push (`git commit -m "feat: add new-problem"`)
7. Pull Request 생성

## 🚀 기술 스택

- **Framework**: Next.js 14.2.0 (App Router)
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 4.1.18
- **Testing**: Jest 30 + React Testing Library 16
- **Language**: TypeScript 5.3.3
- **Package Manager**: pnpm 10.28.0

## 📄 라이센스

MIT © [SeoJaeWan](https://github.com/SeoJaeWan)

## 🔗 관련 링크

- [Fix My Homepage 메인 사이트](https://github.com/SeoJaeWan/fix-my-homepage-site)
- [이슈 트래커](https://github.com/fix-my/homepage/issues)
- [기여 가이드](CONTRIBUTING.md)

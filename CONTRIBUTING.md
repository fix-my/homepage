# 문제 기여 가이드

Fix My Homepage에 문제를 기여해주셔서 감사합니다!

## 📝 문제 작성 절차

### 1. 레포지토리 Fork 및 Clone

```bash
git clone https://github.com/YOUR_USERNAME/homepage.git
cd homepage
pnpm install
```

### 2. 새 브랜치 생성

```bash
git checkout -b problem/your-problem-name
```

### 3. 문제 생성

대화형 CLI를 사용하여 문제를 생성합니다:

```bash
pnpm create-problem
```

프롬프트에 따라 입력:
```
Problem ID (kebab-case): button-not-working
Title (Korean): 버튼이 동작하지 않는 문제

Situation (Korean, press Enter twice when done):
버튼을 클릭해도 카운트가 증가하지 않습니다.
[Enter 두 번]

Goals (Korean, comma-separated):
버튼 클릭 시 카운트 증가, onClick 올바르게 연결

Author GitHub username (default: SeoJaeWan): [Enter]
```

생성되는 파일 구조:
```
app/problems/button-not-working/
├── page.tsx              # Next.js 페이지 (자동 생성)
├── problem.json          # 문제 메타데이터
├── src/
│   └── App.tsx          # 버그가 있는 코드 (템플릿)
├── solution/
│   └── App.tsx          # 정답 코드 (템플릿)
└── test.tsx             # 테스트 (템플릿)
```

### 4. problem.json 확인

생성된 `problem.json`을 확인하고 필요시 수정:

```json
{
  "title": "버튼이 동작하지 않는 문제",
  "situation": "버튼을 클릭해도 카운트가 증가하지 않습니다.",
  "goals": [
    "버튼 클릭 시 카운트 증가",
    "onClick 올바르게 연결"
  ],
  "environment": {
    "type": "react",
    "dependencies": {
      "react": "^18.0.0",
      "react-dom": "^18.0.0"
    }
  },
  "author": {
    "github": "your-username"
  }
}
```

### 5. 버그가 있는 코드 작성 (src/)

`src/App.tsx`를 수정하여 문제가 되는 코드를 작성합니다.

**작성 원칙:**
- **실제 상황**: 실무에서 발생할 수 있는 버그
- **단일 개념**: 한 문제당 하나의 주요 개념
- **명확한 증상**: 버그 증상이 즉시 드러나야 함
- **학습 가치**: 배울 만한 가치가 있는 패턴

**예시:**
```tsx
// 🐛 버그: onClick 오타 → onClik
<button onClik={handleClick}>Click me</button>
```

**복잡한 문제는 추가 파일 구성:**
```
src/
├── App.tsx
├── components/
│   └── Counter.tsx
├── hooks/
│   └── useCounter.ts
└── api/
    └── fetch.ts
```

### 6. 정답 코드 작성 (solution/)

`solution/App.tsx`에 버그를 수정한 코드를 작성합니다.

**원칙:**
- src/의 버그만 수정
- 구조는 src/와 동일하게 유지
- 테스트가 통과해야 함

**예시:**
```tsx
// ✅ 수정: 올바른 onClick
<button onClick={handleClick}>Click me</button>
```

### 7. 테스트 작성 (필수)

`test.tsx`에 Jest + React Testing Library 테스트를 작성합니다.

**테스트 원칙:**
- **src 테스트**: 실패해야 정상 (버그 있음)
- **solution 테스트**: 통과해야 정상 (버그 수정)
- **명확한 검증**: 목표 달성 여부를 명확히 검증

**기본 예시:**
```tsx
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App';

describe('button-not-working', () => {
  it('버튼 클릭 시 카운트가 증가한다', async () => {
    render(<App />);

    // 초기 상태 확인
    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    // 버튼 클릭
    const button = screen.getByRole('button', { name: /click me/i });
    await act(async () => {
      button.click();
    });

    // 결과 확인
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

## 🧪 테스트 코드 작성 가이드

### 사용 가능한 API

```typescript
import { render, screen, act, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
```

### Screen 쿼리 함수

| 카테고리 | getBy* | queryBy* | findBy* |
|---------|--------|----------|---------|
| **Text** | getByText | queryByText | findByText |
| **Role** | getByRole | queryByRole | findByRole |
| **PlaceholderText** | getByPlaceholderText | queryByPlaceholderText | findByPlaceholderText |
| **TestId** | getByTestId | queryByTestId | findByTestId |
| **LabelText** | getByLabelText | queryByLabelText | findByLabelText |
| **DisplayValue** | getByDisplayValue | queryByDisplayValue | findByDisplayValue |

### 쿼리 사용 패턴

```typescript
// getBy* - 요소를 찾고, 없으면 에러
const button = screen.getByRole('button', { name: /저장/ });

// queryBy* - 요소를 찾고, 없으면 null (부재 확인용)
const error = screen.queryByText('에러');
expect(error).not.toBeInTheDocument();

// findBy* - 비동기로 요소 찾기 (waitFor 내장)
const result = await screen.findByText('완료');
```

### 버튼 선택 시 getByRole 권장

```typescript
// ✅ 권장: getByRole 사용
const button = screen.getByRole('button', { name: /구매/ });

// ❌ 피하기: getByText (다른 요소와 중복 가능)
const button = screen.getByText('구매');
```

### 지원되는 암시적 Role

| Role | HTML 요소 |
|------|----------|
| button | `<button>`, `<input type="button/submit/reset">` |
| textbox | `<input type="text/email/password">`, `<textarea>` |
| checkbox | `<input type="checkbox">` |
| radio | `<input type="radio">` |
| link | `<a href="...">` |
| heading | `<h1>` ~ `<h6>` |

### 유틸리티 함수

```typescript
// act - React 상태 업데이트 래핑
await act(async () => {
  button.click();
});

// waitFor - 조건 충족까지 대기
await waitFor(() => {
  expect(screen.getByText('완료')).toBeInTheDocument();
}, { timeout: 3000 });

// cleanup - 테스트 후 정리 (자동 호출됨)
cleanup();
```

### jest-dom Matchers

```typescript
expect(element).toBeInTheDocument();
expect(element).toHaveTextContent('텍스트');
expect(element).toHaveAttribute('disabled');
expect(element).toHaveClass('active');
expect(element).toBeVisible();
expect(element).toBeDisabled();
expect(element).toBeEnabled();
expect(element).toHaveValue('value');
expect(element).toBeChecked();
```

### 비동기 처리 예시

```typescript
it('데이터 로딩 후 표시', async () => {
  render(<App />);

  // 로딩 중 확인
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // 데이터 로드 대기
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // 로딩 사라짐 확인
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
```

## 🎯 API 더미 데이터 (선택)

API 통신이 필요한 문제는 `api/` 폴더에 JSON 파일을 생성:

```
app/problems/fetch-user-data/
├── src/
│   └── App.tsx
└── api/
    └── users.json
```

**api/users.json:**
```json
[
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Jane" }
]
```

**src/App.tsx에서 사용:**
```tsx
useEffect(() => {
  // problemId는 자동으로 주입됨
  fetch(`/api/problems/${problemId}/users`)
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

## 🎨 Tailwind 커스텀 설정 (선택)

`src/tailwind.config.js` 생성 시 자동 적용:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
      },
    },
  },
};
```

## ✅ 로컬에서 테스트

### Jest 테스트 실행

```bash
# 전체 테스트
pnpm test

# watch 모드
pnpm test:watch

# 특정 문제만
pnpm test button-not-working
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 확인: `http://localhost:3000/problems/button-not-working`

## 📦 인덱스 생성

문제 추가 후 인덱스를 업데이트합니다:

```bash
pnpm generate-index
```

이 명령은 `app/problems/index.json`을 생성하여 모든 문제를 통합합니다.

## 🚀 커밋 및 Pull Request

### 커밋

```bash
git add .
git commit -m "feat: add button-not-working problem"
git push origin problem/button-not-working
```

### Pull Request

GitHub에서 PR 생성 시 다음 정보 포함:

- 문제 제목 및 설명
- 다루는 React 개념
- 버그의 원인 (간단히)
- 예상 학습 효과

**템플릿:**
```markdown
## 문제 설명
버튼 클릭 시 이벤트가 발생하지 않는 문제

## 다루는 개념
- React 이벤트 핸들러
- onClick 속성

## 난이도
초급

## 체크리스트
- [x] problem.json 작성
- [x] src/App.tsx 버그 코드 작성
- [x] solution/App.tsx 정답 코드 작성
- [x] test.tsx 테스트 작성
- [x] 로컬 테스트 통과 확인
- [x] pnpm generate-index 실행
```

---

## ✨ 좋은 문제의 조건

1. **실무 연관성**: 실제로 발생할 수 있는 버그
2. **학습 가치**: 중요한 React 개념을 다룸
3. **명확성**: 버그 증상이 즉시 드러남
4. **해결 가능성**: 적절한 난이도
5. **독립성**: 다른 문제에 의존하지 않음
6. **재현성**: 매번 동일하게 재현됨

## 📂 문제 카테고리 예시

### React 상태 관리
- useState 사용 오류
- 상태 직접 수정
- 배치 업데이트

### React Hooks
- useEffect 의존성 배열
- useCallback/useMemo 사용
- Custom Hook 설계

### 비동기 처리
- Race Condition
- Promise 체이닝
- async/await 오류

### 이벤트 처리
- 이벤트 핸들러 연결
- 이벤트 위임
- 합성 이벤트

### 성능 최적화
- 불필요한 리렌더링
- 메모이제이션
- 메모리 누수

## ⚠️ 주의사항

### 필수 사항
- ✅ `src/App.tsx`와 `solution/App.tsx`는 반드시 존재
- ✅ `test.tsx`는 필수 (Jest + RTL 사용)
- ✅ src 테스트는 실패, solution 테스트는 통과
- ✅ 한글로 작성 (코드 주석 제외)

### 금지 사항
- ❌ `page.tsx` 수정 금지 (자동 생성)
- ❌ `app/problems/index.json` 수정 금지 (자동 생성)
- ❌ 외부 라이브러리 과도한 사용
- ❌ problem.json에 임의 필드 추가

### 권장 사항
- 💡 Tailwind CSS 사용 권장
- 💡 TypeScript 사용 권장
- 💡 시맨틱 HTML 사용
- 💡 접근성 고려

## 📋 스크립트 요약

| 명령어 | 설명 |
|--------|------|
| `pnpm install` | 의존성 설치 |
| `pnpm create-problem` | 새 문제 생성 (대화형) |
| `pnpm test` | Jest 테스트 실행 |
| `pnpm test:watch` | Jest watch 모드 |
| `pnpm dev` | 개발 서버 실행 (포트 3000) |
| `pnpm generate-index` | index.json 업데이트 |

## 🤝 문의

문제가 있거나 질문이 있으면 [Issue](https://github.com/fix-my/homepage/issues)를 생성해주세요.

# Portfolio

React + Vite + TypeScript + Emotion으로 만든 개인 포트폴리오. 카메라 뷰파인더 HUD 메타포의 다크 테마.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm test         # 셀렉터·리듀서 단위 테스트 + JSON 스키마 검증
```

## 무엇을 어디서 고치나

| 바꾸고 싶은 것 | 파일 | 예 |
|---|---|---|
| 이름·소개·경력·프로젝트 | `src/data/data.json` | 프로젝트 추가, `pinned: true`로 홈에 노출 |
| HUD 문구·라벨·링크 | `src/data/content.json` | `navbar.rec`, `home.modeValue`, `site.githubUrl` |
| 색·서체·간격·크기 | `src/theme/tokens.ts` → `color`, `font`, `space`, `size` | 강조색 `accent`, 네비 높이 `navHeight` |
| 반응형 분기점 | `src/theme/tokens.ts` → `breakpoint` | `sm 600 / md 900 / lg 1024` |
| 애니메이션·타이밍 | `src/theme/tokens.ts` → `motion`, `behavior` | 타이프라이터 속도, 스와이프 임계값, 페이지 전환 시간 |
| 그리드 열 폭·카드 최소 폭 | `src/theme/tokens.ts` → `layout` | `projectCardMinWidth: 360` |
| 리드아웃 상위 N개 | `src/theme/tokens.ts` → `behavior.readoutLimit` | `3` |
| 페이지 구성·섹션 순서·유무 | `src/config/site.config.ts` | 홈에서 타임라인 제거, 리드아웃 키 순서 변경 |
| 네비 항목·순서·새 페이지 | `src/config/site.config.ts` → `pages` | 항목 추가 시 라우트·네비·스와이프 순서 자동 반영 |

### 데이터 형식

`data.json`과 `content.json`은 `src/data/schema.ts`의 zod 스키마로 검증됩니다. 형식이 맞지 않으면 `npm test`와 개발 서버 로드 시점에 어떤 경로가 잘못됐는지 알려줍니다.

- `projects[].release.date`는 `YYYY/MM`
- `projects[].release.status`는 `public | private`
- `projects[].name`은 React key로 쓰이므로 고유해야 함
- `about.resume[].period`는 `[시작, 끝]` 두 개

### 페이지 구성 예

```ts
// src/config/site.config.ts — 홈에서 타임라인을 빼고 핀 프레임을 6개로 제한
sections: [
  { type: 'hero', leftReadouts: ['projects', 'lang'], rightReadouts: ['current', 'mode'], showTypewriter: true, showCta: true },
  { type: 'pinnedFrames', limit: 6, showAllLink: true },
],
```

사용 가능한 섹션 타입과 옵션은 같은 파일의 `SectionSpec` 유니온에 정의돼 있습니다. 새 섹션을 만들려면 `src/sections/`에 컴포넌트를 추가하고 `SectionSpec`과 `src/app/sectionRegistry.tsx`에 등록하면 됩니다.

## 구조

```
src/app        라우팅·페이지 렌더(site.config 해석)
src/config     페이지·섹션 구조 선언
src/data       JSON + 스키마 + 리포지토리
src/model      순수 셀렉터(집계·정렬·필터)
src/features   상태 훅(필터·모달·탐색)
src/sections   페이지 블록
src/ui         공용 UI 프리미티브
src/theme      토큰·전역 스타일
src/components 고정 위젯(네비·푸터·프레임 코너 등)
```

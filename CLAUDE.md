# CLAUDE.md — portfolio

React 19 + Vite 6 + TypeScript + Emotion 개인 포트폴리오(뷰파인더 HUD 테마). 배포는 Vercel(SPA rewrite).

## 명령

```bash
npm run dev       # 개발 서버
npm run build     # tsc -b && vite build
npm test          # vitest run (src/**/*.test.ts)
npm run lint      # eslint (0 오류 0 경고 유지)
```

변경 후 게이트: `npm test && npx tsc -b && npm run lint && npm run build` 모두 통과. 같은 게이트가 `.github/workflows/ci.yml`에서 PR과 main 푸시마다 실행된다(Node 버전은 `.nvmrc`).

## 구조 맵

```
src/
  main.tsx                  진입점 → app/App
  app/                      조립 계층
    App.tsx                 Router + ThemeProvider + 고정 UI(Navbar, FrameCorners, NavigationController, ScrollControls, Footer)
    AppRoutes.tsx           siteConfig.pages → <Route>, 404 fallback
    Page.tsx                IPageSpec 해석: Seo + PageShell + (provider) + 섹션 순회
    sectionRegistry.tsx     섹션 타입→컴포넌트, provider→Provider 매핑
  config/
    site.config.ts          ★ 페이지·섹션 구조 선언(SectionSpec union, IPageSpec, siteConfig)
    routes.ts               siteConfig에서 파생된 라우트 표(Navbar·스와이프 공용)
  data/
    data.json               ★ 프로필·경력·프로젝트 콘텐츠
    content.json            ★ HUD 문구·라벨·외부 링크
    schema.ts               zod 스키마 + 추론 타입(IProject, IResume, IContent …)
    repository.ts           JSON 단일 진입점(모듈 로드 시 검증, 실패 시 throw)
    repository.test.ts      실제 JSON 스키마 가드
  model/                    순수 셀렉터(UI 무관, 테스트 대상)
    collections.ts          countBy, groupBy, rankTop, orderByUsage
    project.ts              집계·정렬·필터·pinned 선택, IProjectFilterCriteria
    career.ts               경력 정렬·최신 직장·학력·경력 기간
  features/                 상태를 가진 훅과 그 UI
    project-filter/         filterReducer(순수) + useProjectFilter(URL 파라미터 결합)
    project-modal/          useProjectModal + ProjectModal
    project-explorer/       Projects 섹션들이 공유하는 Context(Provider/useProjectExplorer)
    page-navigation/        useSwipeNavigation(스와이프·방향키) + navigationGuards(입력·스크롤 영역·모달에서 무시하는 순수 판정)
  sections/                 site.config에서 참조하는 페이지 블록(각자 data/model/ui만 의존)
  ui/                       도메인 무관 프리미티브(PageShell, Section, Card, Badge, Control, Modal, Hud, HudButton, Link, Button, Chip)
  components/               앱 고정 위젯(Navbar, Footer, FrameCorners, ScrollControls, NavigationController, PageTransition, Seo, ProjectBadges)
  theme/
    tokens.ts               ★ 디자인·동작 토큰(color·font·size·space·layout·motion·behavior·breakpoint)
    cssVariables.ts         tokens → :root CSS 변수(var(--accent) 등)
    mq.ts                   브레이크포인트 헬퍼(mq.sm/md/lg/upSm, MOBILE_QUERY)
    GlobalStyles.tsx, ThemeProvider.tsx, useTokens.ts, emotion.d.ts
  lib/                      useMediaQuery, scroll 헬퍼
  pages/NotFound.tsx        설정 밖 고정 페이지
public/
  favicon.svg               파비콘(뷰파인더 브래킷 + REC 점, 색은 tokens.ts와 수동 동기화)
  projects/<프로젝트>/      프로젝트 모달 첨부 이미지(data.json attachments[].src = /projects/...)
```

★ = 사용자 편집 진입점. 편집 가이드는 README.md 참고.

## 의존 방향

`app → config/sections/features → model/data/ui/theme`. `model`은 `data/schema` 타입만 의존하고 React를 모른다. `ui`는 `theme`만 의존한다. 섹션은 서로 import하지 않는다.

## 규칙

- JSON은 `data/repository`를 통해서만 읽는다(직접 import 금지). 스키마 변경은 `data/schema.ts`와 함께.
- 새 섹션: `sections/`에 컴포넌트 + props 인터페이스 → `site.config.ts`의 `SectionSpec`에 멤버 추가 → `sectionRegistry.tsx`에 등록.
- 새 페이지: `siteConfig.pages`에 항목 추가(라우트·네비·스와이프 순서 자동 반영).
- 색·크기·시간 상수는 `theme/tokens.ts`에만 둔다. 브레이크포인트는 `mq` 헬퍼로만 쓴다.
- 파생 계산(집계·정렬·필터)은 `model/`에 순수 함수로 두고 테스트를 붙인다.
- 커밋 양식은 전역 `commit-write` 스킬을 따른다.

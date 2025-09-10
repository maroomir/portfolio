import styled from "@emotion/styled";

/**
 * ScrollControls
 * - Floating up/down buttons on bottom-right (desktop & mobile)
 * - Mobile: invisible top tap area to scroll to top (tap-to-top)
 *
 * Behavior:
 * - ▲ button scrolls to top (smooth)
 * - ▼ button scrolls to bottom (smooth)
 * - ▲ is hidden near top; ▼ is hidden near bottom
 * - Mobile top tap area is visible only on small screens (via media query)
 */

export default function ScrollControls() {
  const toTop = () => {
    const appScroller = document.getElementById('app-scroll-container');
    const scroller: any = appScroller || document.documentElement || document.body;

    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scroller.scrollTo(0, 0);
      } else {
        scroller.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error('Scroll to top failed:', error);
      try { scroller.scrollTop = 0; } catch {} // fallback
    }
  };

  const toBottom = () => {
    const appScroller = document.getElementById('app-scroll-container');
    const scroller: any = appScroller || document.documentElement || document.body;

    const documentHeight = Math.max(
      scroller.scrollHeight, // 스크롤러의 실제 높이 사용
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scroller.scrollTo(0, documentHeight);
      } else {
        scroller.scrollTo({ top: documentHeight, behavior: "smooth" });
      }
    } catch (error) {
      console.error(`Scroll to bottom failed on ${scroller.tagName || scroller.id}:`, error);
      try { scroller.scrollTop = documentHeight; } catch {} // fallback
    }
  };


  return (
    <>
      <TopTapArea 
        role="button" 
        aria-label="스크롤 상단으로 이동" 
        onClick={toTop}
        onTouchStart={toTop}
      />
      <FloatingGroup>
        <FloatingButton 
          aria-label="페이지 상단으로 이동" 
          onClick={toTop}
          onTouchStart={toTop}
        >
          ▲
        </FloatingButton>
        <FloatingButton 
          aria-label="페이지 하단으로 이동" 
          onClick={toBottom}
          onTouchStart={toBottom}
        >
          ▼
        </FloatingButton>
      </FloatingGroup>
    </>
  );
}

/* Styles */

const TopTapArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px; /* 모바일 화면 상단 영역만 탭-투-톱 작동 */
  /* only active on small screens */
  display: none;
  @media (max-width: 900px) {
    display: block;
    z-index: 10002;
    background: rgba(0, 0, 0, 0.01); /* 투명하지만 디버깅에 용이한 미세한 배경 */
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    pointer-events: auto;
  }
`;

const FloatingGroup = styled.div`
  position: fixed;
  right: 12px;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10003;
  /* pointer-events: none; 제거 */
  
  > * {
    pointer-events: auto;
  }
`;

const FloatingButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  opacity: 1; /* Always visible */
  transform: translateY(0);
  transition: opacity 180ms ease, transform 180ms ease;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 0, 0, 0.8);
  }

  &:active {
    transform: translateY(0);
    background: rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 900px) {
    /* slightly smaller on mobile */
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
  }
`;

import styled from "@emotion/styled";
import { scrollToBottom, scrollToTop } from "@/lib/scroll";

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
  return (
    <>
      <TopTapArea 
        role="button" 
        aria-label="스크롤 상단으로 이동" 
        onClick={scrollToTop}
        onTouchStart={scrollToTop}
      />
      <FloatingGroup>
        <FloatingButton 
          aria-label="페이지 상단으로 이동" 
          onClick={scrollToTop}
          onTouchStart={scrollToTop}
        >
          ▲
        </FloatingButton>
        <FloatingButton 
          aria-label="페이지 하단으로 이동" 
          onClick={scrollToBottom}
          onTouchStart={scrollToBottom}
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
  border-radius: 0;
  background: rgba(11, 12, 14, 0.85);
  color: var(--accent);
  border: 1px solid var(--line-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  @media (max-width: 900px) {
    /* slightly smaller on mobile */
    width: 40px;
    height: 40px;
  }
`;

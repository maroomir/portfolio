import styled from "@emotion/styled";
import { useSwipeNavigation } from "@/features/page-navigation/useSwipeNavigation";

/**
 * NavigationController
 * - Mobile: horizontal swipe to navigate between routes (see useSwipeNavigation)
 * - Desktop: floating left/right arrow buttons to navigate
 */
export default function NavigationController() {
  const { goPrev, goNext } = useSwipeNavigation();

  return (
    <>
      <ArrowButtonLeft role="button" aria-label="이전 섹션" onClick={goPrev} $visible>
        ‹
      </ArrowButtonLeft>
      <ArrowButtonRight role="button" aria-label="다음 섹션" onClick={goNext} $visible>
        ›
      </ArrowButtonRight>
    </>
  );
}

/* Styles */

const baseButton = `
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 0;
  background: rgba(11, 12, 14, 0.85);
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 9999;
  border: 1px solid var(--line-strong);
  transition: border-color 160ms ease, color 160ms ease;

  &:hover {
    border-color: var(--accent);
    color: var(--text);
  }
`;

const ArrowButtonLeft = styled.button<{ $visible?: boolean }>`
  ${baseButton}
  left: 12px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ArrowButtonRight = styled.button<{ $visible?: boolean }>`
  ${baseButton}
  right: 12px;
  @media (max-width: 900px) {
    display: none;
  }
`;

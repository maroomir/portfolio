import styled from "@emotion/styled";
import { useSwipeNavigation } from "@/features/page-navigation/useSwipeNavigation";
import { HudButton } from "@/ui/HudButton";
import { mq } from "@/theme/mq";

/**
 * NavigationController
 * - Mobile: horizontal swipe to navigate between routes (see useSwipeNavigation)
 * - Desktop: floating left/right arrow buttons to navigate
 */
export default function NavigationController() {
  const { goPrev, goNext } = useSwipeNavigation();

  return (
    <>
      <ArrowButton aria-label="이전 섹션" onClick={goPrev} style={{ left: 12 }}>
        ‹
      </ArrowButton>
      <ArrowButton aria-label="다음 섹션" onClick={goNext} style={{ right: 12 }}>
        ›
      </ArrowButton>
    </>
  );
}

const ArrowButton = styled(HudButton)`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  z-index: 9999;

  ${mq.md} {
    display: none;
  }
`;

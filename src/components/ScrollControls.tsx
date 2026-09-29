import styled from "@emotion/styled";
import { scrollToBottom, scrollToTop } from "@/lib/scroll";
import { HudButton } from "@/ui/HudButton";
import { mq } from "@/theme/mq";

/**
 * ScrollControls
 * - Floating ▲/▼ buttons on the bottom-right (desktop & mobile)
 * - Mobile: invisible tap area along the top edge scrolls to top
 */
export default function ScrollControls() {
  return (
    <>
      <TopTapArea role="button" aria-label="스크롤 상단으로 이동" onClick={scrollToTop} onTouchStart={scrollToTop} />
      <FloatingGroup>
        <HudButton aria-label="페이지 상단으로 이동" onClick={scrollToTop} onTouchStart={scrollToTop}>
          ▲
        </HudButton>
        <HudButton aria-label="페이지 하단으로 이동" onClick={scrollToBottom} onTouchStart={scrollToBottom}>
          ▼
        </HudButton>
      </FloatingGroup>
    </>
  );
}

const TopTapArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: none;

  ${mq.md} {
    display: block;
    z-index: 10002;
    background: rgba(0, 0, 0, 0.01);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
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
`;

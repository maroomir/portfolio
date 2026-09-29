import styled from "@emotion/styled";
import { mq } from "@/theme/mq";
import { tokens } from "@/theme/tokens";

const OFFSET = tokens.size.frameCornerOffset;
const STROKE = tokens.size.frameCornerStroke;

/**
 * FrameCorners - 뷰파인더 화면 네 모서리의 브래킷 장식
 * - 뷰포트에 고정되며 클릭을 가로채지 않는 순수 장식 (모바일에서는 숨김)
 */
export default function FrameCorners() {
  return (
    <>
      <Corner aria-hidden style={{ top: `calc(var(--nav-height) + ${OFFSET}px)`, left: OFFSET, borderTopWidth: STROKE, borderLeftWidth: STROKE }} />
      <Corner aria-hidden style={{ top: `calc(var(--nav-height) + ${OFFSET}px)`, right: OFFSET, borderTopWidth: STROKE, borderRightWidth: STROKE }} />
      <Corner aria-hidden style={{ bottom: OFFSET, left: OFFSET, borderBottomWidth: STROKE, borderLeftWidth: STROKE }} />
      <Corner aria-hidden style={{ bottom: OFFSET, right: OFFSET, borderBottomWidth: STROKE, borderRightWidth: STROKE }} />
    </>
  );
}

const Corner = styled.div`
  position: fixed;
  width: ${tokens.size.frameCorner}px;
  height: ${tokens.size.frameCorner}px;
  border: 0 solid var(--accent);
  pointer-events: none;
  z-index: 50;

  ${mq.md} {
    display: none;
  }
`;

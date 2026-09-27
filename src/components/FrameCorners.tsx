import styled from "@emotion/styled";

/**
 * FrameCorners - 뷰파인더 화면 네 모서리의 브래킷 장식
 * - 뷰포트에 고정되며 클릭을 가로채지 않는 순수 장식 (모바일에서는 숨김)
 */
export default function FrameCorners() {
  return (
    <>
      <Corner aria-hidden style={{ top: "calc(var(--nav-height) + 24px)", left: 24, borderTopWidth: 3, borderLeftWidth: 3 }} />
      <Corner aria-hidden style={{ top: "calc(var(--nav-height) + 24px)", right: 24, borderTopWidth: 3, borderRightWidth: 3 }} />
      <Corner aria-hidden style={{ bottom: 24, left: 24, borderBottomWidth: 3, borderLeftWidth: 3 }} />
      <Corner aria-hidden style={{ bottom: 24, right: 24, borderBottomWidth: 3, borderRightWidth: 3 }} />
    </>
  );
}

const Corner = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 0 solid var(--accent);
  pointer-events: none;
  z-index: 50;

  @media (max-width: 900px) {
    display: none;
  }
`;

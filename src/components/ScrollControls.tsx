import { useEffect, useState } from "react";
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
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const height = document.scrollingElement ? document.scrollingElement.scrollHeight : document.body.scrollHeight;
      const viewport = window.innerHeight;
      setShowTop(scrollY > 220);
      setShowBottom(scrollY < Math.max(0, height - viewport - 220));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toBottom = () => {
    const height = document.scrollingElement ? document.scrollingElement.scrollHeight : document.body.scrollHeight;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, height);
    } else {
      window.scrollTo({ top: height, behavior: "smooth" });
    }
  };

  return (
    <>
      <TopTapArea role="button" aria-label="스크롤 상단으로 이동" onClick={toTop} />
      <FloatingGroup>
        <FloatingButton aria-label="페이지 상단으로 이동" onClick={toTop} $visible={showTop}>
          ▲
        </FloatingButton>
        <FloatingButton aria-label="페이지 하단으로 이동" onClick={toBottom} $visible={showBottom}>
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
  height: 44px;
  /* only active on small screens */
  display: none;
  @media (max-width: 900px) {
    display: block;
    z-index: 9998;
    background: transparent;
  }
`;

const FloatingGroup = styled.div`
  position: fixed;
  right: 12px;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
`;

const FloatingButton = styled.button<{ $visible?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.36);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  opacity: ${(p) => (p.$visible ? 0.96 : 0)};
  transform: translateY(0);
  transition: opacity 180ms ease, transform 180ms ease;
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 0, 0, 0.48);
  }

  @media (max-width: 900px) {
    /* slightly smaller on mobile */
    width: 40px;
    height: 40px;
  }
`;

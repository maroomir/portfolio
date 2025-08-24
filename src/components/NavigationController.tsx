import { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * NavigationController
 * - Mobile: horizontal swipe to navigate between routes
 * - Desktop: floating left/right arrow buttons to navigate
 *
 * Behavior:
 * - Routes order is taken from a fixed array: ['/', '/about', '/projects']
 * - Swipe threshold: 50px horizontal movement (default)
 * - Debounce navigation while navigating (600ms)
 */

const ROUTES = ["/", "/about", "/projects"];
const SWIPE_THRESHOLD = 50;
const NAV_DEBOUNCE_MS = 600;

export default function NavigationController() {
  const navigate = useNavigate();
  const location = useLocation();
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const navigating = useRef(false);
  const lastNav = useRef<number>(0);

  // Determine current index (best-effort by pathname startWith)
  const currentIndex = ROUTES.findIndex((r) => r === location.pathname) >= 0
    ? ROUTES.findIndex((r) => r === location.pathname)
    : ROUTES.findIndex((r) => location.pathname.startsWith(r)) || 0;

  const doNavigate = (targetIndex: number) => {
    if (navigating.current) return;
    if (targetIndex < 0 || targetIndex >= ROUTES.length) return;
    const now = Date.now();
    if (now - lastNav.current < NAV_DEBOUNCE_MS) return;
    lastNav.current = now;
    navigating.current = true;
    navigate(ROUTES[targetIndex]);
    setTimeout(() => { navigating.current = false; }, NAV_DEBOUNCE_MS);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;
    startX.current = null;
    startY.current = null;

    // ignore if vertical movement dominates
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    if (dx < 0) {
      // swipe left => move forward (right direction)
      doNavigate(currentIndex + 1);
    } else {
      // swipe right => move backward (left direction)
      doNavigate(currentIndex - 1);
    }
  };

  useEffect(() => {
    // Attach passive listeners to document for mobile swipes
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") doNavigate(currentIndex - 1);
      if (e.key === "ArrowRight") doNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <>
      <ArrowButtonLeft
        role="button"
        aria-label="이전 섹션"
        onClick={() => doNavigate(currentIndex - 1)}
        $visible
      >
        ‹
      </ArrowButtonLeft>
      <ArrowButtonRight
        role="button"
        aria-label="다음 섹션"
        onClick={() => doNavigate(currentIndex + 1)}
        $visible
      >
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
  border-radius: 999px;
  background: rgba(0,0,0,0.36);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 9999;
  border: 1px solid rgba(255,255,255,0.06);
  transition: transform 160ms ease, background 160ms ease, opacity 160ms ease;
  opacity: 0.92;

  &:hover {
    transform: translateY(-50%) scale(1.06);
    background: rgba(0,0,0,0.48);
  }

  &:active {
    transform: translateY(-50%) scale(0.98);
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

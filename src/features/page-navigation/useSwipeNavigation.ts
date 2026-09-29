import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/config/routes';
import { tokens } from '@/theme/tokens';
import { shouldNavigateOnKey, shouldTrackSwipe, type IElementSnapshot } from './navigationGuards';

/** Minimum horizontal travel to count a touch as a swipe. [px] */
const SWIPE_THRESHOLD = tokens.behavior.swipeThreshold;
/** Ignore further navigation requests for this long after one fires. [ms] */
const NAV_DEBOUNCE_MS = tokens.behavior.navDebounce;

export interface ISwipeNavigation {
  readonly goPrev: () => void;
  readonly goNext: () => void;
}

/** Target element and its ancestors up to <body>, as snapshots for the guard rules. */
function snapshotPath(target: EventTarget | null): IElementSnapshot[] {
  const path: IElementSnapshot[] = [];
  for (let element = target instanceof Element ? target : null; element && element !== document.body; element = element.parentElement) {
    path.push({
      tagName: element.tagName,
      isContentEditable: element instanceof HTMLElement && element.isContentEditable,
      role: element.getAttribute('role'),
      overflowX: getComputedStyle(element).overflowX,
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
    });
  }
  return path;
}

function isModalOpen(): boolean {
  return document.querySelector('[aria-modal="true"]') !== null;
}

function findRouteIndex(pathname: string): number {
  const exact = ROUTE_PATHS.indexOf(pathname);
  if (exact >= 0) {
    return exact;
  }
  const prefixed = ROUTE_PATHS.findIndex((path) => pathname.startsWith(path));
  return prefixed >= 0 ? prefixed : 0;
}

/**
 * Moves between top-level routes in ROUTE_PATHS order.
 * - Touch: horizontal swipe on the document (not inside inputs, horizontal scrollers or modals)
 * - Keyboard: ArrowLeft / ArrowRight (not while typing, inside arrow-key widgets or modals)
 * - Programmatic: goPrev / goNext (for on-screen arrows)
 */
export function useSwipeNavigation(): ISwipeNavigation {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentIndex = findRouteIndex(pathname);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastNavigatedAt = useRef<number>(0);

  const navigateTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= ROUTE_PATHS.length) {
        return;
      }
      const now = Date.now();
      if (now - lastNavigatedAt.current < NAV_DEBOUNCE_MS) {
        return;
      }
      lastNavigatedAt.current = now;
      navigate(ROUTE_PATHS[targetIndex]);
    },
    [navigate],
  );

  const goPrev = useCallback(() => navigateTo(currentIndex - 1), [navigateTo, currentIndex]);
  const goNext = useCallback(() => navigateTo(currentIndex + 1), [navigateTo, currentIndex]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || !shouldTrackSwipe(snapshotPath(event.target), isModalOpen())) {
        touchStart.current = null;
        return;
      }
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };
    const handleTouchEnd = (event: TouchEvent) => {
      if (!touchStart.current) {
        return;
      }
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dy) > Math.abs(dx) || Math.abs(dx) < SWIPE_THRESHOLD) {
        return;
      }
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goPrev, goNext]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const key = {
        key: event.key,
        defaultPrevented: event.defaultPrevented,
        hasModifier: event.altKey || event.ctrlKey || event.metaKey || event.shiftKey,
      };
      if (!shouldNavigateOnKey(key, snapshotPath(event.target), isModalOpen())) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        goPrev();
      } else {
        goNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  return { goPrev, goNext };
}

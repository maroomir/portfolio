/** Scroll helpers targeting the app scroll container (falls back to the document). */

export const APP_SCROLL_CONTAINER_ID = 'app-scroll-container';

function getScroller(): HTMLElement {
  return document.getElementById(APP_SCROLL_CONTAINER_ID) ?? document.documentElement;
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollTo(scroller: HTMLElement, top: number): void {
  if (prefersReducedMotion()) {
    scroller.scrollTo(0, top);
    return;
  }
  scroller.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToTop(): void {
  scrollTo(getScroller(), 0);
}

export function scrollToBottom(): void {
  const scroller = getScroller();
  const bottom = Math.max(
    scroller.scrollHeight,
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
  scrollTo(scroller, bottom);
}

/**
 * Decides when global swipe / arrow-key page navigation must stay out of the way.
 * Takes plain element snapshots so the rules are testable without a DOM.
 */

export interface IElementSnapshot {
  readonly tagName: string;
  readonly isContentEditable: boolean;
  readonly role: string | null;
  /** Computed overflow-x. */
  readonly overflowX: string;
  readonly scrollWidth: number;
  readonly clientWidth: number;
}

export interface IKeySnapshot {
  readonly key: string;
  readonly defaultPrevented: boolean;
  readonly hasModifier: boolean;
}

const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
/** Widgets where arrow keys already have a meaning. */
const ARROW_KEY_ROLES = new Set(['slider', 'tablist', 'tab', 'listbox', 'menu', 'menubar', 'radiogroup', 'textbox']);

export function isEditable(element: IElementSnapshot): boolean {
  return EDITABLE_TAGS.has(element.tagName.toUpperCase()) || element.isContentEditable;
}

export function isHorizontalScroller(element: IElementSnapshot): boolean {
  const canScroll = element.overflowX === 'auto' || element.overflowX === 'scroll';
  return canScroll && element.scrollWidth > element.clientWidth;
}

/** True when an arrow key should navigate pages; `path` is the event target and its ancestors. */
export function shouldNavigateOnKey(
  key: IKeySnapshot,
  path: readonly IElementSnapshot[],
  isModalOpen: boolean,
): boolean {
  if (key.key !== 'ArrowLeft' && key.key !== 'ArrowRight') {
    return false;
  }
  if (key.defaultPrevented || key.hasModifier || isModalOpen) {
    return false;
  }
  return !path.some((element) => isEditable(element) || (element.role !== null && ARROW_KEY_ROLES.has(element.role)));
}

/** True when a touch that started on `path` may become a page swipe. */
export function shouldTrackSwipe(path: readonly IElementSnapshot[], isModalOpen: boolean): boolean {
  if (isModalOpen) {
    return false;
  }
  return !path.some((element) => isEditable(element) || isHorizontalScroller(element));
}

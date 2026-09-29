import { describe, expect, it } from 'vitest';
import { shouldNavigateOnKey, shouldTrackSwipe, type IElementSnapshot, type IKeySnapshot } from './navigationGuards';

function element(overrides: Partial<IElementSnapshot> = {}): IElementSnapshot {
  return { tagName: 'DIV', isContentEditable: false, role: null, overflowX: 'visible', scrollWidth: 100, clientWidth: 100, ...overrides };
}

const ARROW_LEFT: IKeySnapshot = { key: 'ArrowLeft', defaultPrevented: false, hasModifier: false };

describe('shouldNavigateOnKey', () => {
  it('navigates on plain arrow keys over regular content', () => {
    expect(shouldNavigateOnKey(ARROW_LEFT, [element(), element({ tagName: 'BODY' })], false)).toBe(true);
    expect(shouldNavigateOnKey({ ...ARROW_LEFT, key: 'ArrowRight' }, [element()], false)).toBe(true);
  });

  it('ignores other keys', () => {
    expect(shouldNavigateOnKey({ ...ARROW_LEFT, key: 'ArrowUp' }, [element()], false)).toBe(false);
  });

  it('ignores keys typed into inputs, selects, textareas and contenteditable', () => {
    for (const target of [element({ tagName: 'input' }), element({ tagName: 'SELECT' }), element({ tagName: 'TEXTAREA' }), element({ isContentEditable: true })]) {
      expect(shouldNavigateOnKey(ARROW_LEFT, [target, element()], false)).toBe(false);
    }
  });

  it('ignores keys inside arrow-key widgets such as tablists', () => {
    expect(shouldNavigateOnKey(ARROW_LEFT, [element({ tagName: 'BUTTON', role: 'tab' }), element({ role: 'tablist' })], false)).toBe(false);
  });

  it('ignores prevented events, modifier combos and open modals', () => {
    expect(shouldNavigateOnKey({ ...ARROW_LEFT, defaultPrevented: true }, [element()], false)).toBe(false);
    expect(shouldNavigateOnKey({ ...ARROW_LEFT, hasModifier: true }, [element()], false)).toBe(false);
    expect(shouldNavigateOnKey(ARROW_LEFT, [element()], true)).toBe(false);
  });
});

describe('shouldTrackSwipe', () => {
  it('tracks swipes over regular content', () => {
    expect(shouldTrackSwipe([element(), element()], false)).toBe(true);
  });

  it('skips touches inside an overflowing horizontal scroller', () => {
    const scroller = element({ overflowX: 'auto', scrollWidth: 600, clientWidth: 300 });
    expect(shouldTrackSwipe([element({ tagName: 'BUTTON' }), scroller], false)).toBe(false);
  });

  it('tracks swipes over a scroller that does not actually overflow', () => {
    expect(shouldTrackSwipe([element({ overflowX: 'auto', scrollWidth: 300, clientWidth: 300 })], false)).toBe(true);
  });

  it('skips touches on inputs and while a modal is open', () => {
    expect(shouldTrackSwipe([element({ tagName: 'INPUT' })], false)).toBe(false);
    expect(shouldTrackSwipe([element()], true)).toBe(false);
  });
});

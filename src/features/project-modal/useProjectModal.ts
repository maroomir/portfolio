import { useCallback, useEffect, useRef, useState } from 'react';
import type { IProject } from '@/data/schema';

export interface IProjectModal {
  readonly selected: IProject | null;
  /** Opens the modal; focus returns to `trigger` (or the focused element) when it closes. */
  readonly open: (project: IProject, trigger?: HTMLElement | null) => void;
  readonly close: () => void;
  /** Element that receives focus after closing. */
  readonly returnFocusTo: HTMLElement | null;
}

/** Owns the selected project, Escape-to-close and body scroll lock while open. */
export function useProjectModal(): IProjectModal {
  const [selected, setSelected] = useState<IProject | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((project: IProject, trigger?: HTMLElement | null) => {
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    triggerRef.current = trigger ?? focused;
    setSelected(project);
  }, []);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) {
      return;
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selected]);

  return { selected, open, close, returnFocusTo: triggerRef.current };
}

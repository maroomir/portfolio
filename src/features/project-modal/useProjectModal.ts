import { useCallback, useEffect, useState } from 'react';
import type { IProject } from '@/data/schema';

/** Clicks on these targets inside a card must not open the modal. */
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [data-no-modal="true"]';

export interface IProjectModal {
  readonly selected: IProject | null;
  /** Opens unless the click landed on an interactive child. */
  readonly openFrom: (project: IProject, target: EventTarget | null) => void;
  readonly close: () => void;
}

/** Owns the selected project, Escape-to-close and body scroll lock while open. */
export function useProjectModal(): IProjectModal {
  const [selected, setSelected] = useState<IProject | null>(null);

  const openFrom = useCallback((project: IProject, target: EventTarget | null) => {
    if (target instanceof HTMLElement && target.closest(INTERACTIVE_SELECTOR)) {
      return;
    }
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

  return { selected, openFrom, close };
}

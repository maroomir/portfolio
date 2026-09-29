import { createContext } from 'react';
import type { IProject } from '@/data/schema';
import type { IProjectFilter } from '@/features/project-filter/useProjectFilter';
import type { IProjectModal } from '@/features/project-modal/useProjectModal';

export interface IProjectExplorer {
  readonly projects: readonly IProject[];
  readonly filter: IProjectFilter;
  readonly modal: IProjectModal;
  readonly isMobile: boolean;
  readonly mobileSearch: {
    readonly isOpen: boolean;
    readonly toggle: () => void;
    readonly close: () => void;
  };
}

export const ProjectExplorerContext = createContext<IProjectExplorer | null>(null);

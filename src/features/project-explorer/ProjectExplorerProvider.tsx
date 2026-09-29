import { useMemo, useState, type ReactNode } from 'react';
import { portfolio } from '@/data/repository';
import { useProjectFilter } from '@/features/project-filter/useProjectFilter';
import { useProjectModal } from '@/features/project-modal/useProjectModal';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { MOBILE_QUERY } from '@/theme/mq';
import { ProjectExplorerContext, type IProjectExplorer } from './ProjectExplorerContext';

/**
 * Shares filter, modal and mobile-search state across the Projects page sections
 * (heading, controls, active filters, grid, modal) so they can be laid out independently.
 */
export function ProjectExplorerProvider({ children }: { children: ReactNode }) {
  const { projects } = portfolio;
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const filter = useProjectFilter(projects, { forceAndMode: isMobile });
  const modal = useProjectModal();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const value = useMemo<IProjectExplorer>(
    () => ({
      projects,
      filter,
      modal,
      isMobile,
      mobileSearch: {
        isOpen: isSearchOpen,
        toggle: () => setIsSearchOpen((open) => !open),
        close: () => setIsSearchOpen(false),
      },
    }),
    [projects, filter, modal, isMobile, isSearchOpen],
  );

  return <ProjectExplorerContext.Provider value={value}>{children}</ProjectExplorerContext.Provider>;
}

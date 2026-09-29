import type { ComponentType, Key } from 'react';
import type { PageProvider, SectionSpec, SectionType } from '@/config/site.config';
import { HeroSection } from '@/sections/HeroSection';
import { TimelineSection } from '@/sections/TimelineSection';
import { PinnedFramesSection } from '@/sections/PinnedFramesSection';
import { PageHeadingSection } from '@/sections/PageHeadingSection';
import { TechStackSection } from '@/sections/TechStackSection';
import { ResumeListSection } from '@/sections/ResumeListSection';
import { ProjectHeadingSection } from '@/sections/ProjectHeadingSection';
import { ProjectControlsSection } from '@/sections/ProjectControlsSection';
import { ProjectActiveFiltersSection } from '@/sections/ProjectActiveFiltersSection';
import { ProjectGridSection } from '@/sections/ProjectGridSection';
import { ProjectModalSection } from '@/sections/ProjectModalSection';
import { ProjectExplorerProvider } from '@/features/project-explorer/ProjectExplorerProvider';

type PropsOf<T extends SectionType> = Omit<Extract<SectionSpec, { type: T }>, 'type'>;

/** Section type in site.config → component. Adding a section means one union member and one entry here. */
export const sectionRegistry: { readonly [T in SectionType]: ComponentType<PropsOf<T>> } = {
  hero: HeroSection,
  timeline: TimelineSection,
  pinnedFrames: PinnedFramesSection,
  pageHeading: PageHeadingSection,
  techStack: TechStackSection,
  resumeList: ResumeListSection,
  projectHeading: ProjectHeadingSection,
  projectControls: ProjectControlsSection,
  projectActiveFilters: ProjectActiveFiltersSection,
  projectGrid: ProjectGridSection,
  projectModal: ProjectModalSection,
};

export const providerRegistry: { readonly [P in PageProvider]: ComponentType<{ children: React.ReactNode }> } = {
  projectExplorer: ProjectExplorerProvider,
};

export function renderSection(spec: SectionSpec, key: Key) {
  const { type, ...props } = spec;
  // Both lookups are keyed by the same discriminant, so props always fit; TS cannot correlate them across the union.
  const Section = sectionRegistry[type] as ComponentType<typeof props>;
  return <Section key={key} {...props} />;
}

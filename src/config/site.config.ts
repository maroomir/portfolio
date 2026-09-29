import { portfolio, content } from '@/data/repository';
import type { IHeroSectionProps } from '@/sections/HeroSection';
import type { ITimelineSectionProps } from '@/sections/TimelineSection';
import type { IPinnedFramesSectionProps } from '@/sections/PinnedFramesSection';
import type { IPageHeadingSectionProps } from '@/sections/PageHeadingSection';
import type { ITechStackSectionProps } from '@/sections/TechStackSection';
import type { IResumeListSectionProps } from '@/sections/ResumeListSection';
import type { IProjectHeadingSectionProps } from '@/sections/ProjectHeadingSection';
import type { IProjectControlsSectionProps } from '@/sections/ProjectControlsSection';
import type { IProjectGridSectionProps } from '@/sections/ProjectGridSection';
import { tokens } from '@/theme/tokens';

/**
 * Site structure: which pages exist, in what order, and which sections each page stacks.
 * - Page order here is the Navbar order and the swipe/arrow-key order.
 * - Reorder, remove or duplicate section entries to change a page without touching JSX.
 * - Copy (labels, titles) lives in data/content.json; look and timing in theme/tokens.ts.
 */

export type SectionSpec =
  | ({ readonly type: 'hero' } & IHeroSectionProps)
  | ({ readonly type: 'timeline' } & ITimelineSectionProps)
  | ({ readonly type: 'pinnedFrames' } & IPinnedFramesSectionProps)
  | ({ readonly type: 'pageHeading' } & IPageHeadingSectionProps)
  | ({ readonly type: 'techStack' } & ITechStackSectionProps)
  | ({ readonly type: 'resumeList' } & IResumeListSectionProps)
  | ({ readonly type: 'projectHeading' } & IProjectHeadingSectionProps)
  | ({ readonly type: 'projectControls' } & IProjectControlsSectionProps)
  | { readonly type: 'projectActiveFilters' }
  | ({ readonly type: 'projectGrid' } & IProjectGridSectionProps)
  | { readonly type: 'projectModal' };

export type SectionType = SectionSpec['type'];

/** Shared state a page's sections need; the Page wraps its sections in the matching provider. */
export type PageProvider = 'projectExplorer';

export interface IPageShellSpec {
  readonly gap?: string;
  readonly align?: 'start' | 'center';
  readonly maxWidth?: string;
}

export interface IPageSpec {
  readonly path: string;
  readonly navLabel: string;
  readonly seo: { readonly title: string; readonly description: string };
  readonly shell?: IPageShellSpec;
  readonly provider?: PageProvider;
  readonly sections: readonly SectionSpec[];
}

export interface ISiteConfig {
  readonly pages: readonly IPageSpec[];
}

function pageTitle(section: string): string {
  return `${section} | ${portfolio.home.name} ${content.site.titleSuffix}`;
}

export const siteConfig: ISiteConfig = {
  pages: [
    {
      path: '/',
      navLabel: '홈',
      seo: { title: pageTitle(content.home.seoTitle), description: portfolio.home.bio },
      sections: [
        {
          type: 'hero',
          leftReadouts: ['projects', 'lang', 'stack'],
          rightReadouts: ['current', 'edu', 'mode'],
          showTypewriter: true,
          showCta: true,
        },
        { type: 'timeline', showProjects: true },
        { type: 'pinnedFrames', showAllLink: true },
      ],
    },
    {
      path: '/about',
      navLabel: '소개',
      seo: { title: pageTitle(content.about.seoTitle), description: content.about.seoDescription },
      shell: { gap: tokens.space.sectionGapTight },
      sections: [
        { type: 'pageHeading', eyebrow: content.about.eyebrow, title: content.about.title },
        { type: 'techStack', showCounts: true },
        { type: 'resumeList', showFrameCount: true },
      ],
    },
    {
      path: '/projects',
      navLabel: '프로젝트',
      seo: { title: pageTitle(content.projects.seoTitle), description: content.projects.seoDescription },
      shell: { gap: '0' },
      provider: 'projectExplorer',
      sections: [
        { type: 'projectHeading', showCount: true },
        { type: 'projectControls', showStatusFilter: true, showSort: true, showMatchMode: true },
        { type: 'projectActiveFilters' },
        { type: 'projectGrid', showStackChips: true, showCategory: true, showOpenLink: true },
        { type: 'projectModal' },
      ],
    },
  ],
};

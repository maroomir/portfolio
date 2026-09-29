import { z } from 'zod';

/**
 * Zod schemas for the two JSON sources under src/data.
 * - data.json: profile, career, projects (portfolio content)
 * - content.json: HUD copy, labels, external links (site content)
 * Types are inferred from the schemas so JSON and TS never drift.
 */

export const RELEASE_STATUSES = ['public', 'private'] as const;
export type ReleaseStatus = (typeof RELEASE_STATUSES)[number];

const homeSchema = z.object({
  name: z.string(),
  bio: z.string(),
  keywords: z.array(z.string()),
});

const resumeSchema = z.object({
  company: z.string(),
  department: z.string(),
  role: z.string(),
  period: z.tuple([z.string(), z.string()]),
  highlights: z.array(z.string()).optional(),
});

const aboutSchema = z.object({
  skills: z.array(z.string()),
  languages: z.array(z.string()),
  resume: z.array(resumeSchema),
  interests: z.array(z.string()).optional(),
});

const agencySchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  link: z.string().optional(),
});

const releaseSchema = z.object({
  date: z.string().regex(/^\d{4}\/\d{2}$/, 'release.date must be YYYY/MM'),
  status: z.enum(RELEASE_STATUSES),
  link: z.string().optional(),
});

const abilitySchema = z.object({
  language: z.string(),
  framework: z.array(z.string()),
});

const attachmentSchema = z.object({
  src: z.string(),
  caption: z.string().optional(),
});

const projectSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  agency: agencySchema.optional(),
  category: z.string().optional(),
  pinned: z.boolean().optional(),
  attachments: z.array(attachmentSchema).optional(),
  ability: abilitySchema,
  release: releaseSchema,
});

export const portfolioSchema = z.object({
  home: homeSchema,
  about: aboutSchema,
  projects: z.array(projectSchema),
});

export const contentSchema = z.object({
  site: z.object({
    titleSuffix: z.string(),
    githubUrl: z.string(),
    githubLabel: z.string(),
  }),
  navbar: z.object({
    rec: z.string(),
    menuAriaLabel: z.string(),
    afPrefix: z.string(),
  }),
  home: z.object({
    seoTitle: z.string(),
    subjectLabel: z.string(),
    ctaLabel: z.string(),
    readouts: z.object({
      projects: z.string(),
      lang: z.string(),
      stack: z.string(),
      current: z.string(),
      edu: z.string(),
      mode: z.string(),
    }),
    modeValue: z.string(),
    pinnedLabel: z.string(),
    allProjectsLabel: z.string(),
  }),
  timeline: z.object({
    label: z.string(),
  }),
  about: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    techTitle: z.string(),
    resumeTitle: z.string(),
    langGroup: z.string(),
    stackGroup: z.string(),
    framesSuffix: z.string(),
  }),
  projects: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    eyebrow: z.string(),
    title: z.string(),
    searchPlaceholder: z.string(),
    noAttachment: z.string(),
  }),
  notFound: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    homeLabel: z.string(),
  }),
});

export type IHome = z.infer<typeof homeSchema>;
export type IResume = z.infer<typeof resumeSchema>;
export type IAbout = z.infer<typeof aboutSchema>;
export type IAgency = z.infer<typeof agencySchema>;
export type IRelease = z.infer<typeof releaseSchema>;
export type IAbility = z.infer<typeof abilitySchema>;
export type IProjectAttachment = z.infer<typeof attachmentSchema>;
export type IProject = z.infer<typeof projectSchema>;
export type IPortfolio = z.infer<typeof portfolioSchema>;
export type IContent = z.infer<typeof contentSchema>;

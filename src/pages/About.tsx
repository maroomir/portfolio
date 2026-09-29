import { portfolio, content } from "@/data/repository";
import Seo from "@/components/Seo";
import { PageShell } from "@/ui/PageShell";
import { PageHeadingSection } from "@/sections/PageHeadingSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { ResumeListSection } from "@/sections/ResumeListSection";
import { tokens } from "@/theme/tokens";

export default function About() {
  const copy = content.about;

  return (
    <PageShell gap={tokens.space.sectionGapTight}>
      <Seo title={`${copy.seoTitle} | ${portfolio.home.name} ${content.site.titleSuffix}`} description={copy.seoDescription} />
      <PageHeadingSection eyebrow={copy.eyebrow} title={copy.title} />
      <TechStackSection showCounts />
      <ResumeListSection showFrameCount />
    </PageShell>
  );
}

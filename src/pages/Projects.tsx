import { portfolio, content } from "@/data/repository";
import Seo from "@/components/Seo";
import { PageShell } from "@/ui/PageShell";
import { ProjectExplorerProvider } from "@/features/project-explorer/ProjectExplorerProvider";
import { ProjectHeadingSection } from "@/sections/ProjectHeadingSection";
import { ProjectControlsSection } from "@/sections/ProjectControlsSection";
import { ProjectActiveFiltersSection } from "@/sections/ProjectActiveFiltersSection";
import { ProjectGridSection } from "@/sections/ProjectGridSection";
import { ProjectModalSection } from "@/sections/ProjectModalSection";

function Projects() {
  const copy = content.projects;

  return (
    <ProjectExplorerProvider>
      <PageShell gap="0">
        <Seo title={`${copy.seoTitle} | ${portfolio.home.name} ${content.site.titleSuffix}`} description={copy.seoDescription} />
        <ProjectHeadingSection showCount />
        <ProjectControlsSection showStatusFilter showSort showMatchMode />
        <ProjectActiveFiltersSection />
        <ProjectGridSection showStackChips showCategory showOpenLink />
        <ProjectModalSection />
      </PageShell>
    </ProjectExplorerProvider>
  );
}

export default Projects;

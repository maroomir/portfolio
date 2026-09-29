import { portfolio, content } from "@/data/repository";
import Seo from "@/components/Seo";
import { PageShell } from "@/ui/PageShell";
import { HeroSection } from "@/sections/HeroSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { PinnedFramesSection } from "@/sections/PinnedFramesSection";

function Home() {
  const { home } = portfolio;
  const copy = content.home;

  return (
    <PageShell>
      <Seo title={`${copy.seoTitle} | ${home.name} ${content.site.titleSuffix}`} description={home.bio} />
      <HeroSection leftReadouts={['projects', 'lang', 'stack']} rightReadouts={['current', 'edu', 'mode']} showTypewriter showCta />
      <TimelineSection showProjects />
      <PinnedFramesSection showAllLink />
    </PageShell>
  );
}

export default Home

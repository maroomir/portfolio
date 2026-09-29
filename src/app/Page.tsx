import type { IPageSpec } from '@/config/site.config';
import Seo from '@/components/Seo';
import { PageShell } from '@/ui/PageShell';
import { providerRegistry, renderSection } from './sectionRegistry';

/** Renders one page from its site.config spec: SEO tags, shell, optional provider, sections in order. */
export function Page({ spec }: { spec: IPageSpec }) {
  const body = (
    <PageShell {...spec.shell}>
      <Seo title={spec.seo.title} description={spec.seo.description} />
      {spec.sections.map((section, index) => renderSection(section, `${section.type}-${index}`))}
    </PageShell>
  );

  if (!spec.provider) {
    return body;
  }
  const Provider = providerRegistry[spec.provider];
  return <Provider>{body}</Provider>;
}

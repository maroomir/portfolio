import { PageHeading } from '@/ui/Section';

export interface IPageHeadingSectionProps {
  readonly eyebrow: string;
  readonly title: string;
}

/** Eyebrow + h1 at the top of a page. */
export function PageHeadingSection({ eyebrow, title }: IPageHeadingSectionProps) {
  return <PageHeading eyebrow={eyebrow} title={title} />;
}

import styled from '@emotion/styled';
import { content } from '@/data/repository';
import { PageHeading } from '@/ui/Section';
import { ControlButton } from '@/ui/Control';
import { useProjectExplorer } from '@/features/project-explorer/useProjectExplorer';
import { mq } from '@/theme/mq';

export interface IProjectHeadingSectionProps {
  /** Show "visible / total" after the eyebrow. */
  readonly showCount: boolean;
}

/** Page heading with the live frame count and the mobile search toggle. */
export function ProjectHeadingSection({ showCount }: IProjectHeadingSectionProps) {
  const copy = content.projects;
  const { projects, filter, mobileSearch } = useProjectExplorer();

  const eyebrow = showCount ? (
    <>{copy.eyebrow} · {String(filter.visible.length).padStart(2, '0')} / {projects.length}</>
  ) : (
    copy.eyebrow
  );

  return (
    <TitleRow>
      <PageHeading eyebrow={eyebrow} title={copy.title} />
      <MobileSearchButton
        type="button"
        aria-label={mobileSearch.isOpen ? '검색 닫기' : '검색 열기'}
        aria-expanded={mobileSearch.isOpen}
        onClick={mobileSearch.toggle}
      >
        검색
      </MobileSearchButton>
    </TitleRow>
  );
}

const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
`;

const MobileSearchButton = styled(ControlButton)`
  display: none;
  padding: 0.45rem 0.7rem;
  color: var(--text);

  ${mq.sm} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
  }
`;

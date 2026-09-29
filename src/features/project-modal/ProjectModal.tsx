import styled from '@emotion/styled';
import type { IProject } from '@/data/schema';
import { ProjectBadges } from '@/components/ProjectBadges';
import { CardDescription } from '@/ui/Card';
import { MonoText } from '@/ui/Hud';
import { Modal } from '@/ui/Modal';
import { tokens } from '@/theme/tokens';

interface IProjectModalProps {
  readonly project: IProject;
  readonly onClose: () => void;
  readonly noAttachmentText: string;
}

/** Detail dialog for one project: title, badges, description, release date and attachments. */
export function ProjectModal({ project, onClose, noAttachmentText }: IProjectModalProps) {
  const attachments = project.attachments ?? [];

  return (
    <Modal
      label={`${project.title} 상세 모달`}
      onClose={onClose}
      header={
        <TitleGroup>
          <h2>{project.title}</h2>
          <ProjectBadges project={project} />
        </TitleGroup>
      }
    >
      <CardDescription>{project.description}</CardDescription>
      <MonoText>{project.release.date}</MonoText>

      {attachments.length > 0 ? (
        <AttachmentGrid>
          {attachments.map((attachment, idx) => (
            <AttachmentFigure key={`${project.name}-attachment-${idx}`}>
              <AttachmentImage src={attachment.src} alt={attachment.caption || `${project.title} 첨부 이미지 ${idx + 1}`} loading="lazy" />
              {attachment.caption && <AttachmentCaption>{attachment.caption}</AttachmentCaption>}
            </AttachmentFigure>
          ))}
        </AttachmentGrid>
      ) : (
        <NoAttachmentText>{noAttachmentText}</NoAttachmentText>
      )}
    </Modal>
  );
}

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    margin: 0;
    font-family: var(--font-body);
    font-size: clamp(1.25rem, 3vw, 1.75rem);
  }
`;

const AttachmentGrid = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${tokens.layout.attachmentMinWidth}px, 1fr));
  gap: 0.75rem;
`;

const AttachmentFigure = styled.figure`
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--bg);
`;

const AttachmentImage = styled.img`
  display: block;
  width: 100%;
  max-height: 240px;
  object-fit: cover;
`;

const AttachmentCaption = styled.figcaption`
  padding: 0.55rem 0.7rem;
  font-size: 0.85rem;
  color: var(--text-soft);
`;

const NoAttachmentText = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: var(--muted);
`;

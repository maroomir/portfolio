import { content } from '@/data/repository';
import { ProjectModal } from '@/features/project-modal/ProjectModal';
import { useProjectExplorer } from '@/features/project-explorer/useProjectExplorer';

export type IProjectModalSectionProps = Record<string, never>;

/** Renders the detail modal for the project selected in the grid. */
export function ProjectModalSection() {
  const { modal } = useProjectExplorer();
  if (!modal.selected) {
    return null;
  }
  return <ProjectModal project={modal.selected} onClose={modal.close} noAttachmentText={content.projects.noAttachment} />;
}

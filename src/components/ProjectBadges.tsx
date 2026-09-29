import type { IProject } from '@/data/schema';
import { Badge, BadgeRow } from '@/ui/Badge';

/** PINNED (when set) followed by the PUBLIC/PRIVATE status badge. */
export function ProjectBadges({ project }: { project: IProject }) {
  return (
    <BadgeRow>
      {project.pinned && <Badge $variant="pinned">PINNED</Badge>}
      <Badge $variant={project.release.status}>{project.release.status.toUpperCase()}</Badge>
    </BadgeRow>
  );
}

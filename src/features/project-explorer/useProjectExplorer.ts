import { useContext } from 'react';
import { ProjectExplorerContext, type IProjectExplorer } from './ProjectExplorerContext';

export function useProjectExplorer(): IProjectExplorer {
  const explorer = useContext(ProjectExplorerContext);
  if (!explorer) {
    throw new Error('useProjectExplorer must be used inside ProjectExplorerProvider');
  }
  return explorer;
}

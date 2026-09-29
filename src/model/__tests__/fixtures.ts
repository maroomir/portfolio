import type { IProject, IResume } from '@/data/schema';

export function makeProject(overrides: Partial<IProject> & { name: string }): IProject {
  return {
    title: overrides.name,
    description: '',
    ability: { language: 'C++', framework: [] },
    release: { date: '2020/01', status: 'private' },
    ...overrides,
  };
}

export const PROJECTS: readonly IProject[] = [
  makeProject({ name: 'alpha', title: 'Alpha Vision', description: 'camera', ability: { language: 'C++', framework: ['OpenCV', 'ROS2'] }, agency: { name: 'Acme' }, release: { date: '2021/03', status: 'public', link: 'https://x' } }),
  makeProject({ name: 'beta', ability: { language: 'Python', framework: ['Pytorch'] }, agency: { name: 'Acme' }, release: { date: '2023/06', status: 'private' }, pinned: true }),
  makeProject({ name: 'gamma', ability: { language: 'C++', framework: ['ROS2'] }, agency: { name: 'Univ' }, release: { date: '2019/12', status: 'public' } }),
  makeProject({ name: 'delta', ability: { language: 'Typescript', framework: ['React'] }, release: { date: '2024/01', status: 'public' }, pinned: true }),
];

export const RESUME: readonly IResume[] = [
  { company: 'Acme', department: 'R&D', role: 'Engineer', period: ['2013/12', '2017/03'] },
  { company: '연세대학교', department: '대학원', role: '석사', period: ['2021/03', '2023/02'] },
  { company: 'Beta Corp', department: 'Robotics', role: 'Developer', period: ['2017/03', '2025/09'] },
];

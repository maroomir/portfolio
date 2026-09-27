import styled from "@emotion/styled";

/**
 * HUD 공용 텍스트 스타일
 * - HudLabel: 섹션 머리말 등 대문자 모노스페이스 라벨 (예: CAREER TIMELINE)
 * - MonoText: 판독값·날짜·수치용 모노스페이스 텍스트
 */
export const HudLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
`;

export const MonoText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--muted);
`;

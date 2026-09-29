import styled from '@emotion/styled';
import { tokens } from '@/theme/tokens';

/** 앰버 단색의 주요 행동 버튼 (뷰파인더 셔터 느낌의 각진 형태) */
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 2rem;
  border: 1px solid var(--accent);
  border-radius: 0;
  background: var(--accent);
  color: var(--bg);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background ${tokens.motion.fast}ms ease, color ${tokens.motion.fast}ms ease;

  &::after {
    content: "→";
    font-family: var(--font-mono);
  }

  &:hover {
    background: transparent;
    color: var(--accent);
  }
`;

export default Button;

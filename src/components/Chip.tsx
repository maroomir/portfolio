import React from "react";
import styled from "@emotion/styled";
import { tokens } from "@/theme/tokens";

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly?: boolean;
  active?: boolean;
};

/**
 * Chip - 재사용 가능한 칩 컴포넌트 (HUD 태그 스타일)
 * - 기본적으로 버튼으로 동작하며 readonly일 경우 클릭 불가 스타일을 적용
 * - active 플래그로 활성화 상태(앰버 테두리) 스타일을 표시
 */
export default function Chip({ children, readonly, active, ...rest }: ChipProps) {
  // readonly일 때는 클릭 핸들러 무시하도록 disabled 처리
  const props = {
    ...rest,
    disabled: readonly || rest.disabled,
    "aria-pressed": rest["aria-pressed"] ?? active,
  } as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <Wrapper $readonly={!!readonly} $active={!!active} {...props}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $readonly?: boolean; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: 0;
  background: ${(props) => (props.$active ? "var(--accent-soft)" : "transparent")};
  color: ${(props) => (props.$active ? "var(--accent)" : "var(--text-soft)")};
  border: 1px solid ${(props) => (props.$active ? "var(--accent)" : "var(--line-strong)")};
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  cursor: ${(props) => (props.$readonly ? "default" : "pointer")};
  transition: border-color ${tokens.motion.fast}ms ease, color ${tokens.motion.fast}ms ease, background ${tokens.motion.fast}ms ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    border-color: ${(props) => (props.$readonly ? "var(--line-strong)" : "var(--accent)")};
    color: ${(props) => (props.$readonly ? "var(--text-soft)" : "var(--accent)")};
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

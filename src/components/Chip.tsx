import React from "react";
import styled from "@emotion/styled";

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly?: boolean;
  active?: boolean;
};

/**
 * Chip - 재사용 가능한 칩 컴포넌트
 * - 기본적으로 버튼으로 동작하며 readonly일 경우 클릭 불가 스타일을 적용
 * - active 플래그로 활성화 상태 스타일을 표시
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
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: ${(props) =>
    props.$readonly
      ? "var(--chip-bg, rgba(255,255,255,0.06))"
      : props.$active
      ? "var(--chip-active, rgba(99,102,241,0.20))"
      : "var(--chip-bg, rgba(255,255,255,0.08))"};
  color: ${(props) => (props.$active ? "var(--text, #e6edf3)" : "var(--chip-inactive-text, var(--muted))")};
  border: 1px solid
    ${(props) => (props.$active ? "var(--chip-active-border, rgba(99,102,241,0.9))" : "var(--glass-border, rgba(255,255,255,0.06))")};
  box-shadow: ${(props) => (props.$active ? "0 6px 20px rgba(99,102,241,0.18)" : "none")};
  font-weight: 700;
  cursor: ${(props) => (props.$readonly ? "default" : "pointer")};
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, color 160ms ease;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: ${(props) => (props.$readonly ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.$readonly
        ? "none"
        : props.$active
        ? "0 8px 26px rgba(99,102,241,0.22)"
        : "0 6px 18px rgba(0,0,0,0.12)"};
  }

  &:focus {
    box-shadow: 0 0 0 4px var(--focus, rgba(99,102,241,0.12));
  }

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`;

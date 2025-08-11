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
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: ${(props) => (props.$readonly ? "rgba(255,255,255,0.06)" : props.$active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.12)")};
  border: 1px solid ${(props) => (props.$active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.06)")};
  color: var(--muted);
  font-weight: 600;
  cursor: ${(props) => (props.$readonly ? "default" : "pointer")};
  transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
  outline: none;

  &:hover {
    transform: ${(props) => (props.$readonly ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) => (props.$readonly ? "none" : "0 6px 18px rgba(0,0,0,0.18)")};
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

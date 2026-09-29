import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HudLabel } from './Hud';

/** Shared look for inputs, selects and small utility buttons. */
const controlStyle = css`
  padding: 0.6rem 0.9rem;
  border-radius: 0;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  outline: none;

  &:focus-visible {
    border-color: var(--accent);
    outline: none;
  }
`;

export const TextInput = styled.input`
  ${controlStyle}

  ::placeholder {
    color: var(--muted);
  }
`;

export const Select = styled.select`
  ${controlStyle}
  flex: 0 0 auto;
  cursor: pointer;
`;

/** Utility button; `$active` highlights it in accent. */
export const ControlButton = styled.button<{ $active?: boolean }>`
  ${controlStyle}
  padding: 0.35rem 0.7rem;
  cursor: pointer;
  border-color: ${(p) => (p.$active ? 'var(--accent)' : 'var(--line-strong)')};
  color: ${(p) => (p.$active ? 'var(--accent)' : 'var(--muted)')};

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

/** Label + segmented buttons, e.g. "매칭 [AND] [OR]". */
export const ToggleGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ToggleLabel = HudLabel;

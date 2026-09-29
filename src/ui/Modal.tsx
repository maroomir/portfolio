import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { tokens } from '@/theme/tokens';
import { ControlButton } from './Control';

interface IModalProps {
  readonly label: string;
  readonly onClose: () => void;
  readonly header: ReactNode;
  readonly children: ReactNode;
}

/** Centered dialog over a blurred scrim; clicking the scrim or the ✕ closes it. Escape handling is the caller's. */
export function Modal({ label, onClose, header, children }: IModalProps) {
  return (
    <Overlay role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <Panel onClick={(event) => event.stopPropagation()}>
        <Header>
          <div>{header}</div>
          <CloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            ✕
          </CloseButton>
        </Header>
        <Body>{children}</Body>
      </Panel>
    </Overlay>
  );
}

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--scrim);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 2.5vw, 1.5rem);
`;

const Panel = styled.div`
  width: min(960px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  padding: clamp(1rem, 3vw, 1.6rem);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  animation: ${popIn} ${tokens.motion.normal}ms ease-out;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled(ControlButton)`
  min-width: 36px;
  min-height: 36px;
  padding: 0;
  color: var(--text);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

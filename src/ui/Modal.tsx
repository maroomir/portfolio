import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { tokens } from '@/theme/tokens';
import { ControlButton } from './Control';

interface IModalProps {
  readonly label: string;
  readonly onClose: () => void;
  readonly header: ReactNode;
  readonly children: ReactNode;
  /** Focus target after the dialog closes; defaults to whatever was focused when it opened. */
  readonly returnFocusTo?: HTMLElement | null;
}

/** App root made inert while a dialog is open so Tab and screen readers stay inside the dialog. */
const APP_ROOT_ID = 'root';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog rendered into <body> over a blurred scrim.
 * - Focus moves to the close button on open, Tab cycles inside, focus is restored on close
 * - The app root is `inert` while open
 * - Clicking the scrim or ✕ closes; Escape handling is the caller's
 */
export function Modal({ label, onClose, header, children, returnFocusTo }: IModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const restoreTarget = returnFocusTo ?? previouslyFocused;
    const appRoot = document.getElementById(APP_ROOT_ID);
    appRoot?.setAttribute('inert', '');
    closeButtonRef.current?.focus();

    return () => {
      appRoot?.removeAttribute('inert');
      restoreTarget?.focus();
    };
    // Run once per open; the restore target is captured at open time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trapTab = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !panelRef.current) {
      return;
    }
    const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <Overlay role="dialog" aria-modal="true" aria-label={label} onClick={onClose} onKeyDown={trapTab}>
      <Panel ref={panelRef} onClick={(event) => event.stopPropagation()}>
        <Header>
          <div>{header}</div>
          <CloseButton ref={closeButtonRef} type="button" aria-label="모달 닫기" onClick={onClose}>
            ✕
          </CloseButton>
        </Header>
        <Body>{children}</Body>
      </Panel>
    </Overlay>,
    document.body,
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

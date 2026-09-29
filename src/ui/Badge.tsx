import styled from '@emotion/styled';

export type BadgeVariant = 'pinned' | 'public' | 'private';

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  pinned: `
    color: var(--bg);
    background: var(--accent);
    border-color: var(--accent);
  `,
  public: `
    color: var(--ok);
    border-color: var(--ok-dim);
  `,
  private: `
    color: var(--muted);
    border-color: var(--line-strong);
  `,
};

/** Small monospace status tag. */
export const Badge = styled.span<{ $variant: BadgeVariant }>`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.45rem;
  border: 1px solid;
  ${(p) => VARIANT_STYLES[p.$variant]}
`;

export const BadgeRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
`;

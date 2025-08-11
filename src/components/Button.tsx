import styled from '@emotion/styled';

const Button = styled.button`
  padding: 0.65rem 1.1rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  outline: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: transparent;
  color: var(--muted);
  text-decoration: none;
  transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  }
`;

export default Button;

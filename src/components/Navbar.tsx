import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { portfolio, content } from "@/data/repository";
import { ROUTES } from "@/config/routes";
import { careerSpan } from "@/model/career";
import { mq } from "@/theme/mq";
import { tokens } from "@/theme/tokens";

/**
 * Navbar - 뷰파인더 상단 HUD 바
 * - 좌: REC 표시 + 이름, 중: [ 메뉴 ] 링크, 우: 경력 기간(AF 판독값)
 */
function Navbar() {
  const location = useLocation();
  const careerYears = careerSpan(portfolio.about.resume);

  return (
    <Wrapper>
      <Inner>
        <RecGroup aria-hidden>
          <RecDot />
          <span>{content.navbar.rec}</span>
        </RecGroup>
        <Menu aria-label={content.navbar.menuAriaLabel}>
          {ROUTES.map((item) => (
            <StyledLink key={item.path} to={item.path} $isActive={location.pathname === item.path}>
              [ {item.label} ]
            </StyledLink>
          ))}
        </Menu>
        {careerYears && (
          <Readout aria-label="경력 기간">
            {content.navbar.afPrefix} · {careerYears.start} → {careerYears.end} · {careerYears.span}Y
          </Readout>
        )}
      </Inner>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 100;
  background: var(--glass-strong);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--accent-dim);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: var(--accent);
`;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const RecGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;

  ${mq.sm} {
    span { display: none; }
  }
`;

const RecDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--rec);
  box-shadow: 0 0 8px var(--rec);
`;

const Menu = styled.div`
  display: flex;
  gap: clamp(0.5rem, 3vw, 2.5rem);
`;

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$isActive'
})<{ $isActive: boolean }>`
  padding: 0.5rem 0.25rem;
  color: ${(props) => (props.$isActive ? 'var(--accent)' : 'var(--muted)')};
  white-space: nowrap;
  transition: color ${tokens.motion.fast}ms ease;

  &:hover {
    color: var(--text);
  }
`;

const Readout = styled.span`
  white-space: nowrap;

  ${mq.md} {
    display: none;
  }
`;

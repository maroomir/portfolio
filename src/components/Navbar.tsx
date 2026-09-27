import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import data from "@/data/data.json";

const NAV_ITEMS = [
  { to: "/", label: "홈" },
  { to: "/about", label: "소개" },
  { to: "/projects", label: "프로젝트" },
];

/**
 * Navbar - 뷰파인더 상단 HUD 바
 * - 좌: REC 표시 + 이름, 중: [ 메뉴 ] 링크, 우: 경력 기간(AF 판독값)
 */
function Navbar() {
  const location = useLocation();
  const careerYears = getCareerYears(data.about.resume.flatMap((r) => r.period));

  return (
    <Wrapper>
      <Inner>
        <RecGroup aria-hidden>
          <RecDot />
          <span>REC · MAROOMIR</span>
        </RecGroup>
        <Menu aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <StyledLink key={item.to} to={item.to} $isActive={location.pathname === item.to}>
              [ {item.label} ]
            </StyledLink>
          ))}
        </Menu>
        <Readout aria-label="경력 기간">
          AF · {careerYears.start} → {careerYears.end} · {careerYears.span}Y
        </Readout>
      </Inner>
    </Wrapper>
  );
}

export default Navbar;

function getCareerYears(periods: string[]) {
  const years = periods
    .map((p) => parseInt(p.slice(0, 4), 10))
    .filter((y) => !Number.isNaN(y));
  const start = Math.min(...years);
  const end = Math.max(...years);
  return { start, end, span: end - start };
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 100;
  background: rgba(11, 12, 14, 0.92);
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

  @media (max-width: 600px) {
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
  transition: color 0.2s ease;

  &:hover {
    color: var(--text);
  }
`;

const Readout = styled.span`
  white-space: nowrap;

  @media (max-width: 900px) {
    display: none;
  }
`;

import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

function Navbar() {
  const location = useLocation();

  return (
    <Wrapper>
      <Inner>
        <StyledLink to="/" $isActive={location.pathname === "/"}>
          Home
        </StyledLink>
        <StyledLink to="/about" $isActive={location.pathname === "/about"}>
          About
        </StyledLink>
        <StyledLink to="/projects" $isActive={location.pathname === "/projects"}>
          Projects
        </StyledLink>
      </Inner>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.nav`
  display: flex;
  width: 100%;
  background: linear-gradient(135deg, #3f51b5 0%, #673ab7 100%);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Inner = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$isActive'
})<{ $isActive: boolean }>`
  font-weight: 600;
  color: ${props => props.$isActive ? '#ffd700' : 'white'};
  border-bottom: 2px solid ${props => props.$isActive ? '#ffd700' : 'transparent'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ffd700;
    background: rgba(255, 255, 255, 0.1);
  }
`;

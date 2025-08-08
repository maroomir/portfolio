import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

function Navbar() {
  const location = useLocation();

  return (
    <Wrapper>
      <StyledLink to="/" $isActive={location.pathname === "/"}>
        Home
      </StyledLink>
      <StyledLink to="/about" $isActive={location.pathname === "/about"}>
        About
      </StyledLink>
      <StyledLink to="/projects" $isActive={location.pathname === "/projects"}>
        Projects
      </StyledLink>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.nav`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
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

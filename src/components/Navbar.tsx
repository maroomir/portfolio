import { Link } from "react-router-dom";
import styled from "@emotion/styled";

function Navbar() {
  return (
    <Wrapper>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/about">About</StyledLink>
      <StyledLink to="/projects">Projects</StyledLink>
  </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.nav`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  &:hover {
    color: #0070f3;
  }
`;

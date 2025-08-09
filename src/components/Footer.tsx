import styled from "@emotion/styled";
import data from "@/data/data.json";

export default function Footer() {
  const year = new Date().getFullYear();
  const owner = data.home?.name ?? "Owner";

  return (
    <Wrapper role="contentinfo">
      <Inner>
        <Left>
          © {year} {owner}
        </Left>
        <Right>
          <Link href="https://github.com/maroomir" target="_blank" rel="noopener noreferrer" aria-label="GitHub 프로필로 이동">
            GitHub
          </Link>
        </Right>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  color: white;
`;

const Inner = styled.div`
  max-width: 1200px;
  padding: 1rem 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  font-size: 0.95rem;
  opacity: 0.9;
`;

const Right = styled.nav`
  display: flex;
  gap: 1rem;
`;

const Link = styled.a`
  color: #ffd700;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

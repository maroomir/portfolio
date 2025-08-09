import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <Content>
        <Title>404 - 페이지를 찾을 수 없어요</Title>
        <Description>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Description>
        <HomeLink to="/">🏠 홈으로 돌아가기</HomeLink>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 4vw, 3rem) 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 3rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  font-weight: 800;
`;

const Description = styled.p`
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: clamp(1.25rem, 3vw, 2rem);
  line-height: 1.6;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.8em 1.5em;
  border-radius: 25px;
  border: 2px solid white;
  background: transparent;
  color: white;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

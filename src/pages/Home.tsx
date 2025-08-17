import { Typewriter } from "react-simple-typewriter";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import data from "@/data/data.json";
import Seo from "@/components/Seo";

function Home() {
  const { home } = data;
  const navigate = useNavigate();

  return (
    <Container>
      <Seo title={`홈 | ${home.name} 포트폴리오`} description={home.bio} />
      <Inner>
        <h1>{home.name}</h1>
        <h2>{home.bio}</h2>
        <TypeEffect>
          <Typewriter 
            words={home.keywords}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </TypeEffect>
        <Button onClick={() => navigate("/projects")}>프로젝트 보기</Button>
      </Inner>
    </Container>    
  );
}

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: clamp(2rem, 4vw, 3rem) 0;
  padding-top: 88px;

  @media (max-width: 768px) {
    padding-top: 64px;
  }
}
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  display: grid;
  justify-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  
  h1 {
    font-size: clamp(2.2rem, 6vw, 3.5rem);
    font-weight: 700;
  }
  
  h2 {
    font-size: clamp(1.1rem, 3vw, 1.6rem);
    line-height: 1.6;
    opacity: 0.95;
  }
`;

const TypeEffect = styled.h2`
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  color: #ffd700;
  min-height: 2rem;
  margin: clamp(1rem, 3vw, 2rem) 0;
`;

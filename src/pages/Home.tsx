import { Typewriter } from "react-simple-typewriter";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import data from "@/data/data.json";

function Home() {
  const { home } = data;
  const navigate = useNavigate();

  return (
    <Container>
      <h1>{home.name}</h1>
      <h2>{home.bio}</h2>
      <TypeEffect>
        <Typewriter 
          words={home.Keywords}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </TypeEffect>
      <Button onClick={() => navigate("/projects")}>프로젝트 보기</Button>
    </Container>    
  );
}

export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

const TypeEffect = styled.h2`
  font-size: 1.5rem;
  color: #ffd700;
  min-height: 2rem;
  margin: 1rem 0;
`;

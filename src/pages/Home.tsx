import { Typewriter } from "react-simple-typewriter";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Greeting>👋 안녕하세요!<br />개발자 Maroomir Yoon 입니다.</Greeting>
      <TypeEffect>
        <Typewriter 
          words={["Robot Engineer", "AI Engineer", "Equipment Developer", "Machine Vision Developer"]}
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
`;

const Greeting = styled.h1`
  font-size: 2.5rem;
  font-wieght: bold;
`;

const TypeEffect = styled.h2`
  font-size: 1.5rem;
  color: #0070f3;
`;

const Button = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0051b3;
  }
`;

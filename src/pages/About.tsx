import styled from "@emotion/styled";
import data from "@/data/data.json"

export default function About() {
  const { about } = data
  return (
    <Container>
      <Content>
        <Title>About Me</Title>
        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <TechList>
            {about.languages.map((lang) => (
              <TechItem key={lang}>💻 {lang}</TechItem>
            ))}
            {about.skills.map((skill) => (
              <TechItem key={skill}>🛠️ {skill}</TechItem>
            ))}
          </TechList>
        </Section>
        
        <Section>
          <SectionTitle>기술 이력</SectionTitle>
          <ResumeList>
            {about.resume.map((item, idx) => (
              <ResumeCard key={idx}>
                <Company>{item.company}</Company>
                <Department>{item.department}</Department>
                <Role>{item.role}</Role>
                <Period>
                  {item.period[0]} ~ {item.period[1]}
                </Period>
              </ResumeCard>
            ))}
          </ResumeList>
        </Section>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: clamp(2rem, 4vw, 3rem) 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
`;

const Title = styled.h1`
  text-align: center;
  font-size: clamp(2rem, 6vw, 3rem);
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
  color: white;
  font-weight: 700;
`;

const Section = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.25rem, 3.5vw, 1.75rem);
  margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
  color: #ffd700;
`;

const TechList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(0.75rem, 2vw, 1.5rem);
  margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
`;

const TechItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: clamp(0.9rem, 2.5vw, 1.5rem);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ResumeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1.5rem);
`;

const ResumeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: clamp(1.25rem, 3vw, 2rem);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Company = styled.h3`
  margin: 0;
  font-size: clamp(1.1rem, 3.5vw, 1.5rem);
  color: white;
  font-weight: 600;
`;

const Department = styled.div`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-size: clamp(0.95rem, 2.8vw, 1.1rem);
`;

const Role = styled.div`
  font-size: clamp(0.95rem, 2.8vw, 1.1rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.5rem;
`;

const Period = styled.div`
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  color: rgba(255, 255, 255, 0.7);
`;

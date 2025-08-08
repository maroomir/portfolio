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
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  color: white;
  font-weight: 700;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #ffd700;
  text-align: center;
`;

const TechList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TechItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
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
  gap: 1.5rem;
`;

const ResumeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Company = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
`;

const Department = styled.div`
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Role = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.8rem;
`;

const Period = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

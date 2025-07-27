import styled from "@emotion/styled";
import data from "@/data/data.json"

export default function About() {
  const { about } = data
  return (
    <Section>
      <h1>About Me</h1>
      <Content>
        <h2>기술 스택</h2>
        <TechList>
          {about.languages.map((lang) => (
            <li key={lang}>💻 {lang}</li>
          ))}
          {about.skills.map((skill) => (
            <li key={skill}>🛠️ {skill}</li>
          ))}
        </TechList>
        <h2>기술 이력</h2>
        <ResumeList>
          {about.resume.map((item, idx) => (
            <ResumeCard key={idx}>
              <Company>{item.company}</Company>
              <Department>{item.department}</Department>
              <Role>{item.rules}</Role>
              <Period>
                {item.period[0]} ~ {item.period[1]}
              </Period>
            </ResumeCard>
          ))}
        </ResumeList>
      </Content>
    </Section>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1rem;
  color: #444;
`;

const TechList = styled.ul`
  list-style: none;
  padding-left: 0;
  line-height: 2;

  li {
    position: relative;
    padding-left: 1.2rem;
  }
`;

const ResumeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ResumeCard = styled.div`
  background: linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(100, 100, 200, 0.08);
  padding: 1.5rem 2rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(100, 100, 200, 0.15);
  }
`;

const Company = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: #2a5298;
`;

const Department = styled.div`
  font-weight: 500;
  color: #444;
  margin-bottom: 0.3rem;
`;

const Role = styled.div`
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Period = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

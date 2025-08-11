import styled from "@emotion/styled";
import data from "@/data/data.json"
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";

export default function About() {
  const { about } = data
  return (
    <Container>
      <Seo title={`소개 | ${data.home?.name} 포트폴리오`} description="보유 기술과 경력을 소개합니다." />
      <Content>
        <Title>About Me</Title>
        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <TechGrid>
            <TechGroup>
              <GroupTitle>언어</GroupTitle>
              <TechList>
                {about.languages.map((lang) => (
                  <LangChip key={lang} to={`/projects?lang=${encodeURIComponent(lang)}`} aria-label={`Filter by language ${lang}`}>
                    <LangIcon /> {lang}
                  </LangChip>
                ))}
              </TechList>
            </TechGroup>
            <TechGroup>
              <GroupTitle>기술</GroupTitle>
              <TechList>
                {about.skills.map((skill) => (
                  <TechChip key={skill} to={`/projects?tech=${encodeURIComponent(skill)}`} aria-label={`Filter by tech ${skill}`}>
                    <ToolIcon /> {skill}
                  </TechChip>
                ))}
              </TechList>
            </TechGroup>
          </TechGrid>
        </Section>
        
        <Section>
          <SectionTitle>이력</SectionTitle>
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

const LangIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: 6 }} aria-hidden="true">
    <path d="M4 12h16" />
    <path d="M8 6l-4 6 4 6" />
    <path d="M16 6l4 6-4 6" />
  </svg>
);

const LangChip = styled(Link)` display:inline-flex; align-items:center; gap:6px; padding:0.4rem 0.8rem; border-radius:999px; background: rgba(255,255,255,0.2); color:white; text-decoration:none; font-weight:600; margin:0 0.25rem 0.25rem 0; `;
const TechChip = styled(Link)` display:inline-flex; align-items:center; gap:6px; padding:0.4rem 0.8rem; border-radius:999px; background: rgba(255,255,255,0.12); color:white; text-decoration:none; font-weight:600; margin:0 0.25rem 0.25rem 0; `;

const ToolIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: 6 }} aria-hidden="true">
    <path d="M14 3l7 7-3 3-7-7 3-3z" />
    <path d="M3 21l6-6" />
  </svg>
);

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: clamp(2rem, 4vw, 3rem) 0;
  padding-top: 88px;

  @media (max-width: 768px) {
    padding-top: 64px;
  }
}
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

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 3rem);
`;

const TechGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupTitle = styled.h4`
  font-size: clamp(1.1rem, 3vw, 1.25rem);
  color: #ffd700;
  margin-bottom: 0.75rem;
  font-weight: 700;
  text-align: left;
`;

const TechList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: clamp(0.75rem, 2vw, 1.25rem);
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: clamp(0.5rem, 1.5vw, 0.9rem);
  border-radius: 10px;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
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

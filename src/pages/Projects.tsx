import styled from "@emotion/styled";
import data from "@/data/data.json";

function Projects() {
  const { projects } = data;

  return (
    <Container>
      <Content>
        <Title>My Projects</Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <Card key={index}>
              <ProjectHeader>
                <h3>{project.title}</h3>
                <Status $status={project.release.status}>
                  {project.release.status === 'public' ? '🌐 Public' : '🔒 Private'}
                </Status>
              </ProjectHeader>
              <Description>{project.description}</Description>
              
              <TechStack>
                <TechLabel>사용 기술:</TechLabel>
                <TechTags>
                  <TechTag>{project.ability.language}</TechTag>
                  {project.ability.framework.map((framework, idx) => (
                    <TechTag key={idx}>{framework}</TechTag>
                  ))}
                </TechTags>
              </TechStack>
              
              <ProjectFooter>
                <ReleaseDate>📅 {project.release.date}</ReleaseDate>
                <GitHubLink href={project.release.link} target="_blank" rel="noopener noreferrer">
                  🔗 GitHub 보기
                </GitHubLink>
              </ProjectFooter>
            </Card>
          ))}
        </ProjectGrid>
      </Content>
    </Container>
  );
}

export default Projects;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
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

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: white;
    font-weight: 600;
  }
`;

const Status = styled.span<{ $status: string }>`
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${props => props.$status === 'public' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)'};
  color: ${props => props.$status === 'public' ? '#4caf50' : '#ffc107'};
  font-weight: 500;
  border: 1px solid ${props => props.$status === 'public' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 193, 7, 0.3)'};
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  margin-bottom: 1.5rem;
`;

const TechLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.8rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ReleaseDate = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const GitHubLink = styled.a`
  font-size: 1rem;
  color: #ffd700;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

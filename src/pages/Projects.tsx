import styled from "@emotion/styled";
import data from "@/data/data.json";

function Projects() {
  const { projects } = data;

  return (
    <Section>
      <Title>My Projects</Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <Card key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.release.link} target="_blank" rel="noopener noreferrer">
              🔗 GitHub 보기
            </a>
          </Card>
        ))}
      </ProjectGrid>
    </Section>
  );
}

export default Projects;

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
  }

  a {
    font-size: 0.9rem;
    color: #1e90ff;
    text-decoration: none;
  }
`;

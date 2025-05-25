import styled from "@emotion/styled";

export default function About() {
  return (
    <Section>
      <Title>About Me</Title>
      <Content>
        <Intro>
          안녕하세요! 저는 <strong>Maroomir Yoon</strong>입니다.
          <br />
          저는 뭐든 배우면 먼저 만들어보는걸 좋아하는
          <strong> 도전적인 개발자</strong>입니다.
        </Intro>

        <SubTitle>기술 스택</SubTitle>
        <TechList>
          <li>🟦 C / C++</li>
          <li>⚛️ C# </li>
          <li>🎨 Python / Pytorch </li>
        </TechList>

        <SubTitle>관심 분야</SubTitle>
        <Paragraph>
          작성중입니다
        </Paragraph>
      </Content>
    </Section>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h3`
  font-size: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1rem;
  color: #444;
`;

const Intro = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
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

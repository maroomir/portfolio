import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { HudLabel } from "@/styles/hud";
import { content } from "@/data/repository";

export default function NotFound() {
  return (
    <Container>
      <Seo title="페이지를 찾을 수 없음 | 404" description="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다." />
      <Content>
        <HudLabel>{content.notFound.eyebrow}</HudLabel>
        <Title>{content.notFound.title}</Title>
        <Description>{content.notFound.description}</Description>
        <HomeLink to="/">{content.notFound.homeLabel}</HomeLink>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--nav-height) + 2rem) 0 2rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
`;

const Title = styled.h1`
  font-family: var(--font-body);
  font-size: clamp(2rem, 6vw, 3rem);
`;

const Description = styled.p`
  font-size: clamp(1rem, 3vw, 1.15rem);
  color: var(--text-soft);
  line-height: 1.6;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.8em 1.5em;
  border: 1px solid var(--accent);
  color: var(--accent);
  font-weight: 700;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--accent);
    color: var(--bg);
  }
`;

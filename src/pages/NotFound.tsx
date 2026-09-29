import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { HudLabel } from "@/ui/Hud";
import { PageShell } from "@/ui/PageShell";
import { content } from "@/data/repository";
import { tokens } from "@/theme/tokens";

export default function NotFound() {
  return (
    <PageShell align="center" maxWidth="720px" gap="1.25rem">
      <Seo title="페이지를 찾을 수 없음 | 404" description={content.notFound.description} />
      <HudLabel>{content.notFound.eyebrow}</HudLabel>
      <Title>{content.notFound.title}</Title>
      <Description>{content.notFound.description}</Description>
      <HomeLink to="/">{content.notFound.homeLabel}</HomeLink>
    </PageShell>
  );
}

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
  transition: background ${tokens.motion.normal}ms ease, color ${tokens.motion.normal}ms ease;

  &:hover {
    background: var(--accent);
    color: var(--bg);
  }
`;

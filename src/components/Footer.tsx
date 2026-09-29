import styled from "@emotion/styled";
import { portfolio, content } from "@/data/repository";
import { HudAnchor } from "@/ui/Link";

export default function Footer() {
  const year = new Date().getFullYear();
  const owner = portfolio.home.name;

  return (
    <Wrapper role="contentinfo">
      <Inner>
        <ExposureMeter aria-hidden>
          <span>-3</span><span>··</span><span>-2</span><span>··</span><span>-1</span><span>··</span>
          <Zero>0</Zero>
          <span>··</span><span>+1</span><span>··</span><span>+2</span><span>··</span><span>+3</span>
        </ExposureMeter>
        <Row>
          <span>© {year} {owner}</span>
          <HudAnchor href={content.site.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub 프로필로 이동">
            {content.site.githubLabel}
          </HudAnchor>
        </Row>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  width: 100%;
  border-top: 1px solid var(--line);
  background: var(--bg);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
`;

const Inner = styled.div`
  max-width: var(--max-width);
  padding: 1.5rem clamp(1rem, 4vw, 2.5rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExposureMeter = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  color: var(--dim);
  letter-spacing: 0.15em;
`;

const Zero = styled.span`
  color: var(--accent);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

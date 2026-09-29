import { tokens } from './tokens';

/** camelCase -> kebab-case (surface2 -> surface-2, lineStrong -> line-strong). */
function toCssName(key: string): string {
  return key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
}

/**
 * Emits the tokens that styled components reference as `var(--name)`.
 * Only colors, fonts and the two layout sizes are exposed; everything else is read from the theme object.
 */
export function buildCssVariables(): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(tokens.color)) {
    lines.push(`--${toCssName(key)}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.font)) {
    lines.push(`--font-${toCssName(key)}: ${value};`);
  }
  lines.push(`--nav-height: ${tokens.size.navHeight}px;`);
  lines.push(`--max-width: ${tokens.size.maxWidth}px;`);
  return lines.join('\n    ');
}

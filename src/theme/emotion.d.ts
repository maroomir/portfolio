import '@emotion/react';
import type { ITokens } from './tokens';

declare module '@emotion/react' {
  export interface Theme {
    readonly tokens: ITokens;
  }
}

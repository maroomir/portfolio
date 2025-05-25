import { css, Global } from "@emotion/react";

const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />

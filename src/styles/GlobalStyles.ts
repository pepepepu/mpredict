import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Space Grotesk", sans-serif;
    letter-spacing: -0.7px;
    background-color: #121214;
    color: #E1E1E6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
`;

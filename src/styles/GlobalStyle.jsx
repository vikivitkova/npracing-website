import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap');

  :root {
    --primary: #000;
    --accent: #ffcc00;
    --neutral: #fff;
    --font-main: 'Inconsolata', monospace;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: var(--primary);
    color: var(--neutral);
    font-family: var(--font-main);
    min-height: 100%;
    scroll-behavior: smooth;
  }

  a {
    color: var(--accent);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--neutral);
  }

  button {
    font-family: var(--font-main);
    background: var(--accent);
    color: var(--primary);
    border: none;
    border-radius: 2px;
    padding: 0.5em 1.5em;
    font-size: 1em;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #ffd700;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: #222;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--accent);
  }
`;

export default GlobalStyle;
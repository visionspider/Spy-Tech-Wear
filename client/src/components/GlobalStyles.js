import { createGlobalStyle } from "styled-components";
import MatrixFont from "./font/matrixFont.ttf";
const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: "matrixFont";
    src: url(${MatrixFont}) format('ttf');
}

* {
    margin: 0; 
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: "matrixFont";
    font-size: 100%;
    vertical-align: baseline;
    
}

body {
}

  
`;

export default GlobalStyle;

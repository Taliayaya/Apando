import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@font-face {
    font-family: "Gravity";
    src: url("./fonts/Gravity-Italic.otf");
  }
@font-face {
    font-family: "Tuffy";
    src: url("fonts/Tuffy-Bold.ttf");
  }

body {
    margin: 0 !important;
    padding: 0 !important;
    font-family: "Arial";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: relative;
    min-height: 100vh;
    height: 100%;
}
`
function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle

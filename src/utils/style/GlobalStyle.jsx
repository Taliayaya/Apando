import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
@font-face {
    font-family: "Gravity";
    src: url("./fonts/Gravity-Italic.otf");
  }
@font-face {
    font-family: "Tuffy";
    src: url("fonts/Tuffy-Bold.ttf");
  }

body {
    margin: 0;
    font-family: "Arial";
}
`
function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle

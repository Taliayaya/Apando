import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
@font-face {
    font-family: "Gravity-Italic";
    src: url("./fonts/Gravity-Italic.otf") format("otf");
  }
  @font-face {
    font-family: "Gravity-Regular";
    src: url("./fonts/Gravity-Regular.otf") format("otf");
  }
  @font-face {
    font-family: "Tuffy-Bold";
    src: url("./fonts/Tuffy-Bold.ttf") format("ttf");
  }
  @font-face {
    font-family: "Tuffy-BoldItalic";
    src: url("./fonts/Tuffy-BoldItalic.ttf") format("ttf");
  }

body {
    margin: 0;
    font-family: "Tuffy-Bold";
}
`
function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle

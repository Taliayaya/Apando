import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
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

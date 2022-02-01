import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

const StyledSection = styled.section`
    width: 90%;
    text-justify: auto;
    border-radius: 30px;
    padding: 20px;
    margin: 20px;
    background-color: ${theme.font_color};
    text-align: justify;
    word-spacing: 4px;
    line-height: 2em;
`
const HomePage = styled.div`
    width: 70%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
`

const LastModif = styled.p`
    font-size: large;
    color: ${theme.font_color};
`
const StyledH2 = styled.h2`
    text-transform: uppercase;
`

export { StyledSection, HomePage, LastModif, StyledH2 }

import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.home_gradient};
    height: 100vh;
    width: 100%;
`
const DiagonalBoxContainr = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`

const FirstDiagonalBox = styled.div`
    position: relative;
    width: 100%;
    height: 700px;
    background-color: ${(props) => props.theme.chat_bg_color};
    transform: skewY(5deg);
    margin-top: 15vh;
`

const MiddleContents = styled.div`
    margin: -15vh 0;
    height: 800px;
    width: 100%;
    background-color: ${(props) => props.theme.chat_input_bg_color};
`

const SecondDiagonalBox = styled.div`
    position: relative;
    width: 100%;
    height: 800px;
    background-color: ${(props) => props.theme.sides_bg_color};
    transform: skewY(-3deg);
`

const FirstContentContainer = styled.div`
    max-width: 50em;
    margin: 0 auto;
    transform: skewY(-5deg);
`
const SecondContentContainer = styled.div`
    max-width: 50em;
    margin: 0 auto;
    transform: skewY(3deg);
`

const LastContainer = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    background-color: ${(props) => props.theme.home_page_bg_color};
    z-index: 0;
    margin-top: -10em;
    padding: 5em;
`

const NavBar = styled.div`
    /* padding-left: 100vh; */
    margin: auto;
    height: auto;
    width: 30rem;
    img {
        width: 100%;
    }
`

const Slogan = styled.div`
    position: absolute;
    margin-top: 10rem;
    font-weight: 900;
    color: ${(props) => props.theme.font_color};
    font-size: 32px;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
`

const JoinApandoContainer = styled.div`
    max-width: 50em;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const AuthButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 2em;
    margin: 10px;
`

const MascotteCute = styled.img`
    width: 150px;
    height: auto;
`

export {
    NavBar,
    FirstDiagonalBox,
    FirstContentContainer,
    Container,
    Slogan,
    SecondContentContainer,
    SecondDiagonalBox,
    DiagonalBoxContainr,
    MiddleContents,
    LastContainer,
    JoinApandoContainer,
    AuthButtonContainer,
    MascotteCute,
}

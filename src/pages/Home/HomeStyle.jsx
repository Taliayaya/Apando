import styled, { keyframes } from 'styled-components'
import { theme } from '../../utils/style/colors'
import clouds from '../../assets/images/home/clouds.png'
import branchBelow from '../../assets/images/home/branchBelow.png'
import branchAbove from '../../assets/images/home/branchAbove.png'
import mascotto from '../../assets/images/home/mascotto.png'

const Container = styled.div`
    position: relative;
    background-color: ${theme.home_gradient};
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
    background-color: ${theme.chat_bg_color};
    transform: skewY(5deg);
    margin-top: 15vh;
`

const MiddleContents = styled.div`
    margin: -15vh 0;
    height: 800px;
    width: 100%;
    background-color: ${theme.chat_input_bg_color};
`

const SecondDiagonalBox = styled.div`
    position: relative;
    width: 100%;
    height: 800px;
    background-color: ${theme.sides_bg_color};
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

const cloudAnimation = keyframes`
    0% { background-position: 1000px}
    100% { background-position: -1000px }
`

const Clouds = styled.div`
    background: url(${clouds});
    background-size: 100%;
    z-index: 0;
    animation: ${cloudAnimation} 45s linear infinite;
`

const HomePageBanner = styled.div`
    background: 100% ${theme.home_page_bg_color};
    background: linear-gradient(
        0deg,
        ${theme.home_gradient} 0%,
        ${theme.home_page_bg_color} 62%
    );
    height: 100vh;
    width: auto;
    overflow-x: hidden;
`

const HomePageTreeBelow = styled.div`
    background: no-repeat right bottom url(${branchBelow});
    height: 100vh;
    width: auto;
`

const HomePageTreeAbove = styled.div`
    background: no-repeat right bottom url(${branchAbove}),
        no-repeat right bottom url(${mascotto});
    height: 100vh;
    width: auto;
`

const LastContainer = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    background-color: ${theme.home_page_bg_color};
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
    color: ${theme.font_color};
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
    HomePageTreeAbove,
    HomePageTreeBelow,
    HomePageBanner,
    Clouds,
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

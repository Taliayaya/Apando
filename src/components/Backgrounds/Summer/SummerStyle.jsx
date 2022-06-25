import styled, { keyframes } from 'styled-components'
import palmtree from '../../../assets/images/SummerTheme/palmtree.png'
import hammock from '../../../assets/images/SummerTheme/hammock.png'
import mascotte from '../../../assets/images/SummerTheme/mascotte.png'

const HomePageBanner = styled.div`
    background: 100% ${(props) => props.theme.home_page_bg_color};
    background: linear-gradient(
        0deg,
        ${(props) => props.theme.home_gradient} 0%,
        ${(props) => props.theme.home_page_bg_color} 100%
    );
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
`

const HomePagePalmTree = styled.div`
    background: no-repeat right bottom url(${palmtree});
    background-size: 80%;
    position: absolute;

    @media screen and (max-width: 1080px) {
        background-size: 90vh;
    }
    @media screen and (max-width: 460px) {
        background-size: 90vh;
    }
    height: 100vh;
    width: 100vw;
    z-index: 3;
`

const Hammock = styled.div`
    background: no-repeat right bottom url(${hammock});
    background-size: 80%;
    position: absolute;
    @media screen and (max-width: 1080px) {
        background-size: 90vh;
    }
    @media screen and (max-width: 460px) {
        background-size: 90vh;
    }
    height: 100vh;
    width: 100vw;
`
const Mascotte = styled.div`
    background: no-repeat right bottom url(${mascotte});
    background-size: 80%;
    position: absolute;
    @media screen and (max-width: 1080px) {
        background-size: 90vh;
    }
    @media screen and (max-width: 460px) {
        background-size: 90vh;
    }
    height: 100vh;
    width: 100vw;
`

const waveanim = keyframes`
  0% {    transform:  scaleY(1.00) ;  }
  35% {    transform:  scaleY(1.3) ;  }
  69% {    transform:  scaleY(1.00) ;  }
  100% {    transform:  scaleY(1.00) ;  }
`

const wetsandanim = keyframes`
  0% {  opacity:0.2; }
  34% { opacity:0.2; }
  35% { opacity:0.7;}
  100% {opacity:0.2; }
`

const seafoamanim = keyframes`
    0% {  opacity:0; }
  30% { opacity:1; }
  50% { opacity:0; }
  100% {opacity:0; }
`

const Sand = styled.div`
    height: 35%;
    width: 100%;
    background: #fdf1d7;
    position: absolute;
    top: 65%;
    z-index: 0;
`
const WetSand = styled.div`
    height: 37.5%;
    width: 200%;
    left: -50%;
    border-radius: 0 0 50% 50%;
    background: #ecc075;
    top: 40%;
    box-shadow: 0 10px 10px 0 #ecc075;
    animation: ${wetsandanim} ease-in-out 10s;
    animation-iteration-count: infinite;
    position: absolute;
    z-index: 1;
`

const Sea = styled.div`
    position: absolute;
    height: 30%;
    width: 200%;
    left: -50%;
    top: 40%;
    border-radius: 0 0 50% 50%;
    background: linear-gradient(
        to bottom,
        rgba(8, 122, 193, 1) 0%,
        rgba(18, 156, 192, 1) 25%,
        rgba(42, 212, 229, 1) 50%,
        rgba(150, 233, 239, 1) 75%,
        rgba(222, 236, 211, 1) 100%
    );
    animation: ${waveanim} ease-in-out 10s;
    animation-iteration-count: infinite;
    transform-origin: 50% 0%;
    overflow: hidden;
    z-index: 2;
`

const Seafoam = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 90%,
        white 100%
    );
    animation: ${seafoamanim} ease-in-out 10s;
    animation-iteration-count: infinite;
`

export {
    HomePageBanner,
    HomePagePalmTree,
    Sea,
    Seafoam,
    Sand,
    WetSand,
    Hammock,
    Mascotte,
}

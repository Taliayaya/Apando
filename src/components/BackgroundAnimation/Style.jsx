import styled, { keyframes } from 'styled-components'
import { theme } from '../../utils/style/colors'
import clouds from '../../assets/images/home/clouds.png'
import branchBelow from '../../assets/images/home/branchBelow.png'
import branchAbove from '../../assets/images/home/branchAbove.png'
import mascotto from '../../assets/images/home/mascotto.png'

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

export { HomePageBanner, HomePageTreeAbove, HomePageTreeBelow, Clouds }

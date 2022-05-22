// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

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

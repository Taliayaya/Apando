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

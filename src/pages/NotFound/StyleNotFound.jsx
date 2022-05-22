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
import Mascotte404 from '../../assets/images/404_motivation_not_found500.png'
import Background404 from '../../assets/images/404_motivation_not_found_bg.png'
import { theme } from '../../utils/style/colors'

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2% 5%;
    text-align: center;
    border-radius: 30px;
    background-color: rgba(81, 85, 147, 0.5);
    @media screen and (min-width: 720px) {
        margin: 0 25%;
    }
    @media screen and (max-width: 719px) {
        margin: 0 15%;
    }
`

const Image404 = styled.div`
    position: relative;
    background: no-repeat center url(${Mascotte404}),
        no-repeat center url(${Background404});
    max-height: 500px;
    max-width: 500px;
    width: 500px;
    height: 500px;
    @media screen and (max-width: 580px) {
        background-size: 50%;
        height: 300px;
    }
`

const NotFoundTitle = styled.div`
    color: ${theme.font_color};
    font-size: 35px;
    font-weight: 600;
    padding: 0 0 10px;
    @media screen and (max-width: 580px) {
        font-size: 25px;
    }
`

export { Container, Image404, NotFoundTitle }

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
import { Link } from 'react-router-dom'

export const StyledUsernameContainer = styled.div`
    color: ${theme.username_font_color};
    width: 100%;
    background-color: #17094f;
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    padding: 20px 0;
    justify-content: space-around;
    align-items: center;
`

export const StyledUsername = styled.div`
    padding: 0 10px;
    font-size: medium;
`

export const StyledLink = styled(Link)`
    color: ${theme.username_font_color};
    &:hover {
        color: #555;
        font-size: large;
        cursor: pointer;
    }
`

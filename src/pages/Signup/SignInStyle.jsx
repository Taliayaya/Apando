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

export const StyledSelect = styled.select`
    text-decoration: none;
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    outline: none;
    font-size: small;
    font-weight: 400;
    padding-left: 20px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    color: #999999;
    background-color: ${theme.font_color};
    text-transform: uppercase;
    &:focus,
    &:valid {
        border-color: #4158d0;
        color: #000;
        font-size: medium;
        text-transform: none;
    }
`

export const StyledOption = styled.option`
    color: #999999;
    text-transform: uppercase;
    border: 1px solid lightgrey;
    border-radius: 25px;
`

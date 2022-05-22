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

import { theme } from '../../utils/style/colors'
import styled from 'styled-components'

export const StyleUser = styled.p`
    padding-left: 20px;
    font-weight: normal;
    font-size: medium;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${(props) =>
        props.online ? 'green' : `opacity: 0.2; color: ${theme.font_color}`};
`

export const StyledDiv = styled.div`
    display: flex;
    padding: 10px;
    &:hover {
        background-color: rgb(34, 22, 89);
        opacity: 0.2;
    }
`

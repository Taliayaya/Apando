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

export const StyleUserList = styled.div`
    background-color: ${theme.sides_bg_color};
    display: flex;
    flex-direction: column;
    flex: 0.15;
    height: 100vh;
    position: relative;
    margin: 0;
    ${(props) => (props.showUsers === 'true' ? `` : 'display: none;')}

    @media screen and (max-width: 480px) {
        max-width: 25vh;
    }
`

export const StyleUserListTop = styled.div`
    background-color: ${theme.menus_bg_color};
    align-items: center;
    padding: 20px;
    color: ${theme.font_color};
    border-bottom: 2px solid ${theme.border_color};
`

export const StyleUserListTopIcons = styled.div`
    background-color: ${theme.menus_bg_color};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.sides_font_color};
`

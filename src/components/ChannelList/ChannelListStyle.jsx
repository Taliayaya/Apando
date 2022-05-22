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

export const StyledChannelList = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => (props.showChannel === 'true' ? '' : 'display: none;')}
    flex: 0.15;
    height: 100vh;
    background-color: ${theme.sides_bg_color};

    @media screen and (max-width: 480px) {
        max-width: 25vh;
    }
`

export const StyledChannelListTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    ${(props) =>
        props.hovered &&
        `
    background-color: #241172;
    border: 1px solid ${theme.sides_font_color};`}

    color: ${theme.sides_font_color};
    border-bottom: 3px solid ${theme.border_color};
`

export const StyledChannelListBottom = styled.div`
    padding: 20px;
    overflow-y: scroll;
`
export const StyledChannel = styled.div`
    padding: 15px;
    border: 1px solid ${theme.top_menu_bg_color};
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    ${(props) =>
        props.ischannelselected === 'true'
            ? `
color: ${theme.sides_font_color};
font-size: larger;
background-color: ${theme.top_menu_bg_color};`
            : `
color: #999999;
&:hover {
    cursor: pointer;
    color: ${theme.sides_font_color};
    background-color: ${theme.top_menu_bg_color};
    font-size: large;
}`}

    ${(props) =>
        props.newmessage === 'false' &&
        `
    color: #ccc;
    `}
`
export const StyledInput = styled.input`
    width: 100%;
`

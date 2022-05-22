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

import ReactPlayer from 'react-player'
import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background-color: #33237f;
    }
    ${(props) =>
        props.repeat === 'true' ? `padding: 0px 20px;` : `padding: 5px 20px;`}
`

const StyledMessage = styled.div`
    display: flex;
    align-items: left;

    color: ${theme.font_color};
    justify-content: space-between;
`

const StyledMessageInfo = styled.div`
    margin-left: 20px;
    font-size: large;
`

const StyledMessageTimestamp = styled.span`
    color: lightgray;
    margin-left: 20px;
    font-size: x-small;
`

const StyledUserMessage = styled.span`
    white-space: pre-line;
    font-size: medium;

    blockquote {
        color: #aaa;
        margin: 0;
        padding-left: 3em;
        border-left: 0.5em #aaaaaa solid;
    }
    img {
        max-width: 25vw;
        max-height: 25vh;
        height: auto;
        width: auto;
        @media screen and (max-width: 720px) {
            ${(props) => props.shouldresize === 'true' && 'max-width: 40vw;'}
        }
        @media screen and (max-width: 480px) {
            max-width: 50vw;
        }
    }
`

const Align = styled.span`
    align-items: center;
`

const StyleReactPlayer = styled(ReactPlayer)`
    max-width: 25vw;
    max-height: 25vh;

    @media screen and (max-width: 720px) {
        max-width: 40vw;
    }
    @media screen and (max-width: 480px) {
        max-width: 50vw;
    }
`

export {
    Align,
    Container,
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
    StyleReactPlayer,
}

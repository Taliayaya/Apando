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

const StyleMobileSendingContainer = styled.div`
    background-color: ${theme.sides_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 8px;
    align-items: center;
    justify-content: center;
    margin: 0 10px 10px;

    @media screen and (min-width: 720px) {
        display: none !important;
    }
`

const StyleFileUploadContainer = styled.div`
    background-color: ${theme.sides_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 6px 8px;
    margin: 0 10px 10px;
`

export { StyleMobileSendingContainer, StyleFileUploadContainer }

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

import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
body {
    margin: 0 !important;
    padding: 0 !important;
    font-family: "Arial";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: relative;
    min-height: 100vh;
    height: 100%;
}
`
function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle

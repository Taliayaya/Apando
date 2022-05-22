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

import { createTheme } from '@mui/material'

const colors = {
    // Purple mode
    userList_bg_color: '#4b3869',
    userList_font_color: '#f0e9d2',
    userList_top_bg_color: '#1c0c5b',

    channelList_bg_color: '#1c0c5b',
    channelList_font_color: '#f3f1f5',

    chat_bg_color: '#3d2c8d',
    chat_font_color: '#ffffff',
    chat_input_bg_color: '#4b509d',
}

const purpleMode = {
    sides_bg_color: 'rgb(30, 18, 79)',
    menus_bg_color: 'rgb(20, 10, 60)',
    sides_font_color: 'rgb(240, 233, 210)',
    top_menu_bg_color: 'rgb(40, 26, 91)',

    userList_font_color: 'rgb(200, 200, 200)',

    chat_bg_color: 'rgb(54, 42, 113)',
    chat_input_bg_color: 'rgb(81, 85, 147)',

    border_color: 'rgb(51, 35, 121)',
    username_font_color: 'rgb(240, 233, 210)',

    font_color: '#fff',

    // Home Page color
    home_page_bg_color: '#9fa1e0',
    home_gradient: '#be80e0',
}

const theme = purpleMode

const themeMui = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: theme.chat_bg_color,
        },
        success: {
            main: '#388e3c',
        },
        secondary: {
            main: theme.chat_input_bg_color,
        },
    },
})
export { theme, themeMui }

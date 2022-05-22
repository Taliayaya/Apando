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

import PeopleIcon from '@mui/icons-material/People'
import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../../utils/hooks'
import { theme } from '../../utils/style/colors'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Tooltip } from '@mui/material'

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    background-color: ${theme.top_menu_bg_color};
`

const TopMenu = () => {
    const { setShowUsers, showUsers, setShowChannel, showChannel } = useAuth()
    return (
        <StyledMenu>
            <Tooltip
                title={
                    showChannel
                        ? 'Masquer le menu gauche'
                        : 'Afficher le menu gauche'
                }
            >
                <IconButton onClick={() => setShowChannel(!showChannel)}>
                    <MenuIcon
                        style={{ cursor: 'pointer', color: theme.font_color }}
                    />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={
                    showUsers
                        ? 'Masquer le menu droit'
                        : 'Afficher le menu droit'
                }
            >
                <IconButton onClick={() => setShowUsers(!showUsers)}>
                    <PeopleIcon
                        style={{ cursor: 'pointer', color: theme.font_color }}
                    />
                </IconButton>
            </Tooltip>
        </StyledMenu>
    )
}

export default TopMenu

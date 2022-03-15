import { People } from '@material-ui/icons'
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
                    <People
                        style={{ cursor: 'pointer', color: theme.font_color }}
                    />
                </IconButton>
            </Tooltip>
        </StyledMenu>
    )
}

export default TopMenu

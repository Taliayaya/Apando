import PeopleIcon from '@mui/icons-material/People'
import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../../utils/hooks'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Tooltip } from '@mui/material'

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    background-color: ${(props) => props.theme.top_menu_bg_color};
`

const StyledMenuIcon = styled(MenuIcon)`
    color: ${(props) => props.theme.font_color};
`

const StyledPeopleIcon = styled(PeopleIcon)`
    color: ${(props) => props.theme.font_color};
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
                    <StyledMenuIcon />
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
                    <StyledPeopleIcon />
                </IconButton>
            </Tooltip>
        </StyledMenu>
    )
}

export default TopMenu

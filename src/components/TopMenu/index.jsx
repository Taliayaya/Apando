import { People } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../../utils/hooks'
import { theme } from '../../utils/style/colors'
import MenuIcon from '@mui/icons-material/Menu'

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: ${theme.top_menu_bg_color};
`

const TopMenu = () => {
    const { setShowUsers, showUsers, setShowChannel, showChannel } = useAuth()
    return (
        <StyledMenu>
            <MenuIcon
                style={{ cursor: 'pointer', color: theme.font_color }}
                onClick={() => setShowChannel(!showChannel)}
            />
            <People
                style={{ cursor: 'pointer', color: theme.font_color }}
                onClick={() => setShowUsers(!showUsers)}
            />
        </StyledMenu>
    )
}

export default TopMenu

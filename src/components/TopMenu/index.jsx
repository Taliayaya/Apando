import { People } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../../utils/hooks'
import colors from '../../utils/style/colors'
import MenuIcon from '@mui/icons-material/Menu'

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: ${colors.channelList_bg_color};
`

const TopMenu = () => {
    const { setShowUsers, showUsers, setShowChannel, showChannel } = useAuth()
    return (
        <StyledMenu>
            <MenuIcon
                style={{ cursor: 'pointer', color: '#fff' }}
                onClick={() => setShowChannel(!showChannel)}
            />
            <People
                style={{ cursor: 'pointer', color: '#fff' }}
                onClick={() => setShowUsers(!showUsers)}
            />
        </StyledMenu>
    )
}

export default TopMenu

import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Link } from 'react-router-dom'

export const StyledUsernameContainer = styled.div`
    color: ${colors.userList_font_color};
    width: 100%;
    background-color: #17094f;
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    padding: 20px 0;
    justify-content: space-evenly;
    align-items: center;
`

export const StyledUsername = styled.div`
    padding: 0 10px;
    font-size: large;
`

export const StyledLink = styled(Link)`
    color: #555;
    &:hover {
        font-size: large;
        color: ${colors.userList_font_color};
        cursor: pointer;
    }
`

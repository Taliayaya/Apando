import styled from 'styled-components'
import { theme } from '../../utils/style/colors'
import { Link } from 'react-router-dom'

export const StyledUsernameContainer = styled.div`
    color: ${theme.username_font_color};
    width: 100%;
    background-color: #17094f;
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    padding: 20px 0;
    justify-content: space-around;
    align-items: center;
`

export const StyledUsername = styled.div`
    padding: 0 10px;
    font-size: medium;
`

export const StyledLink = styled(Link)`
    color: ${theme.username_font_color};
    &:hover {
        color: #555;
        font-size: large;
        cursor: pointer;
    }
`

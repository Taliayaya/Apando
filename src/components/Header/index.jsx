import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../utils/hooks'
import { theme } from '../../utils/style/colors'

const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 10px 50px;
    z-index: 1;
    background-color: ${theme.chat_input_bg_color};
`

const StyledSignUp = styled(Link)`
    padding: 15px;
    background-color: ${theme.chat_bg_color};
    color: ${theme.font_color};
    border-radius: 30px;
    outline: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: ${theme.sides_bg_color};
    }
`
const StyledTitleLink = styled(Link)`
    font-size: 25px;
    text-decoration: none;
    color: ${theme.font_color};
    z-index: 0;
`

const StyledLoginLink = styled(Link)`
    padding: 15px;
    color: ${theme.font_color};
    z-index: 5;
    text-decoration: none;

    &:hover {
        color: #ddd;
    }
`

function Header() {
    const { authed, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <StyledNav>
            <StyledTitleLink to="/">Pando</StyledTitleLink>
            <div>
                <StyledLoginLink to="/login">Se connecter</StyledLoginLink>
                <StyledSignUp to="/signup">Nous Rejoindre</StyledSignUp>
            </div>
            {authed && <button onClick={() => handleLogout}>Logout</button>}
        </StyledNav>
    )
}

export default Header

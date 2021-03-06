import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import PropTypes from 'prop-types'

const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 10px 50px;
    z-index: 1;
`

const StyledSignUp = styled(Link)`
    padding: 15px;
    background-color: ${(props) => props.theme.chat_bg_color};
    color: ${(props) => props.theme.font_color};
    border-radius: 30px;
    outline: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.sides_bg_color};
    }
`
const StyledTitleLink = styled(Link)`
    font-size: 25px;
    text-decoration: none;
    color: ${(props) => props.theme.font_color};
    z-index: 0;
    padding: 3px;
    border-radius: 30px;
    &:hover {
        opacity: 0.5;
        font-size: 30px;
    }
    transition: all 0.5s ease;
`

const StyledLoginLink = styled(Link)`
    padding: 15px;
    color: ${(props) => props.theme.font_color};
    z-index: 5;
    text-decoration: none;

    &:hover {
        color: #ddd;
    }
`

function Header({ authLinks }) {
    return (
        <StyledNav>
            <StyledTitleLink to="/">Apando</StyledTitleLink>
            {authLinks && (
                <div style={{ paddingTop: '10px' }}>
                    <StyledLoginLink to="/login">Se connecter</StyledLoginLink>
                    <StyledSignUp to="/signup">Nous Rejoindre</StyledSignUp>
                </div>
            )}
        </StyledNav>
    )
}

Header.propTypes = {
    authLinks: PropTypes.bool,
}

export default Header

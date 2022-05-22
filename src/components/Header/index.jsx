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

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from '../../utils/style/colors'
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
    color: ${theme.font_color};
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

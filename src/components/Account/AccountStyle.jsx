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

import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

export const StyledBody = styled.div`
    background-color: ${theme.sides_bg_color};
    align-items: center;
    justify-content: center;
    margin: 0;
    text-align: center;
    color: #fff
    width: 100%;
    min-height: 100vh;
    height: 100%;
    position: relative;
    background-size: cover;
    padding: 50px;
`

export const StyledCompte = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    background-color: ${theme.chat_bg_color};
    border-radius: 25px;
    width: 380px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    padding: 20px;
`
export const StyledField = styled.p`
    text-transform: uppercase;
    font-size: medium;
    font-weight: 600;
`
export const Separator = styled.div`
    padding: 10px;
`

export const StyledButton = styled.button`
    color: #fff;
    outline: none;
    border: none;
    font-size: 13px;
    font-weight: 500;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    background-color: ${theme.chat_input_bg_color};
    margin: 5px;
    &:hover {
        background-color: #33398e;
    }
`
export const StyledDangerousButton = styled.button`
    color: #ca0b00;
    font-size: 13px;
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    background-color: ${theme.sides_bg_color};
    border: 1px solid #ca0b00;
    margin: 5px;
`

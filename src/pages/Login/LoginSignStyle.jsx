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
import { Link } from 'react-router-dom'
import { theme } from '../../utils/style/colors'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const StyledLoginPage = styled.div`
    margin-top: -21px;
    text-align: center;
    color: #fff
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-size: cover;
    background: rgb(63, 94, 251);
    background: radial-gradient(
        circle,
        ${theme.sides_bg_color} 0%,
        ${theme.chat_input_bg_color} 80%
    );
    `

export const StyledVisibilityOffIcon = styled(VisibilityOffIcon)`
    margin-left: -30px;
    top: 5px;
    position: relative;
    cursor: pointer;
    color: #555;
    &:hover {
        color: #999;
    }
`
export const StyledVisibilityOnIcon = styled(VisibilityIcon)`
    margin-left: -30px;
    top: 5px;
    position: relative;
    cursor: pointer;
    color: #555;
    &:hover {
        color: #999;
    }
`

export const StyledLoginTitle = styled.h2`
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    line-height: 100px;
    color: ${theme.font_color};
    user-select: none;
    border-radius: 15px 15px 0 0;
    background: linear-gradient(
        90deg,
        ${theme.sides_bg_color} 0%,
        ${theme.chat_input_bg_color} 80%
    );
`
export const StyledForm = styled.form`
    padding: 10px 30px 50px 30px;
`
export const StyledField = styled.div`
    height: 50px;
    width: 100%;
    margin-top: 20px;
    position: relative;
`
export const StyledFieldLabel = styled.label`
    position: absolute;
    top: 50%;
    left: 20px;
    color: #999999;
    font-weight: 400;
    font-size: small;
    pointer-events: none;
    transform: translateY(-50%);
    text-transform: uppercase;
    transition: all 300ms ease;
    padding-left: 10px;
`
export const StyledFieldInput = styled.input`
    height: 100%;
    width: 90%;
    outline: none;
    font-size: medium;
    padding-left: 20px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    transition: all 0.3s ease;
    &:focus,
    &:valid {
        border-color: #4158d0;
        & + ${StyledFieldLabel} {
            top: 0%;
            font-size: smaller;
            color: #4158d0;
            background: #fff;
            transform: translateY(-50%);
        }
    }
`
export const StyledLoginWrapper = styled.div`
    width: 380px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 33px 40px 33px rgba(0, 0, 0, 0.2);
    position: relative;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
`
export const StyledHeaderTitle = styled.h1`
    color: ${theme.font_color};

    font-family: Arial;
    padding: 20px;
`

export const StyleLink = styled(Link)`
    color: blue;
    font-weight: 600;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        color: ${theme.chat_bg_color}
        border-bottom: ${theme.chat_bg_color} 1px solid;
        transition: all 300ms ease;
    }
`
export const StyleError = styled.div`
    color: #ba3939;
    background: #ffe0e0;
    border: 1px solid #a33a3a;
    padding: 10px 10px;
    border-radius: 25px;
`

export const StyleAlert = styled.div`
    width: 91%;
    padding: 12px 16px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 12px;
    font-size: 16px;
    ${(props) =>
        props.success &&
        `background-color: rgba(227, 253, 235, 1);
        border-color: rgba(38, 179, 3, 1);
        color: rgba(60, 118, 61, 1);`}
`
export const Icon = styled.svg.attrs({
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
})``

const Svg = styled(Icon)`
    margin-top: -150px;
`

export const Wave = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
            fill="#4b509d"
            fillOpacity="1"
            d="M0,64L48,90.7C96,117,192,171,288,176C384,181,480,139,576,149.3C672,160,768,224,864,245.3C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
    </Svg>
)

export const StyledSubmit = styled.input.attrs((props) => ({
    type: 'submit',
    value: 'Valider',
}))`
    height: 100%;
    width: 100%;
    color: ${theme.font_color};
    outline: none;
    border: none;
    padding-left: 0;
    margin-top: -10px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 25px;
    background: linear-gradient(
        90deg,
        ${theme.sides_bg_color} 0%,
        ${theme.chat_input_bg_color} 80%
    );
    transition: all 300ms ease;
    &:active {
        transform: scale(0.9);
    }
`

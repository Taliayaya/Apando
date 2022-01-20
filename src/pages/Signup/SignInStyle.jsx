import styled from 'styled-components'

export const StyledSelect = styled.select`
    text-decoration: none;
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    outline: none;
    font-size: small;
    font-weight: 400;
    padding-left: 20px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    color: #999999;
    background-color: #fff;
    text-transform: uppercase;
    &:focus,
    &:valid {
        border-color: #4158d0;
        color: #000;
        font-size: medium;
        text-transform: none;
    }
`

export const StyledOption = styled.option`
    color: #999999;
    text-transform: uppercase;
    border: 1px solid lightgrey;
    border-radius: 25px;
`

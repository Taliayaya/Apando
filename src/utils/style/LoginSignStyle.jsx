import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const StyledLoginPage = styled.div`
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 100vh;
    text-align: center;
    content: '';
    position: relative;
    background-size: cover;
    background: rgb(63, 94, 251);
    background: radial-gradient(
        circle,
        rgba(63, 94, 251, 1) 0%,
        rgba(252, 70, 107, 1) 100%
    );
    vertical-align: middle;
    ::before {
        content: '';
        position: absolute;
    }
`

export const StyledLoginTitle = styled.h2`
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    line-height: 100px;
    color: #fff;
    user-select: none;
    border-radius: 15px 15px 0 0;
    background: linear-gradient(
        90deg,
        rgba(131, 58, 180, 1) 0%,
        rgba(253, 29, 29, 0.43879558659401263) 50%,
        rgba(252, 176, 69, 1) 100%
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
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    place-items: center;
`

export const StyledSubmit = styled.input.attrs((props) => ({
    type: 'submit',
    value: 'Valider',
}))`
    height: 100%;
    width: 100%;
    color: #fff;
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
        rgba(131, 58, 180, 1) 0%,
        rgba(253, 29, 29, 0.43879558659401263) 50%,
        rgba(252, 176, 69, 1) 100%
    );
    transition: all 300ms ease;
    &:active {
        transform: scale(0.9);
    }
`

export const StyledHeaderTitle = styled.h1`
    font-family: Tuffy-Bold;
    padding: 20px;
`

export const StyleLink = styled(Link)`
    color: blue;
    font-weight: 600;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        border-bottom: blue 1px solid;
        font-size: larger;
        transition: all 300ms ease;
    }
`

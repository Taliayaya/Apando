import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/hooks'
import {
    StyledLoginPage,
    StyledLoginTitle,
    StyledForm,
    StyledField,
    StyledFieldInput,
    StyledFieldLabel,
    StyledLoginWrapper,
    StyledSubmit,
    StyledHeaderTitle,
    StyleLink,
} from '../../utils/style/LoginSignStyle'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { state } = useLocation()

    const handleLogin = (e) => {
        e.preventDefault()
        login().then(() => {
            navigate(state?.path || '/app')
        })
    }
    return (
        <StyledLoginPage>
            <StyledHeaderTitle>Pando</StyledHeaderTitle>
            <StyledLoginWrapper>
                <StyledLoginTitle>Connexion</StyledLoginTitle>
                <StyledForm action="#">
                    <StyledField>
                        <StyledFieldInput
                            type="text"
                            name="username_or_email"
                            required
                        />
                        <StyledFieldLabel htmlFor="username_or_email">
                            e-mail ou pseudo
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type="password"
                            name="password"
                            required
                        />
                        <StyledFieldLabel htmlFor="password">
                            mot de passe
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <input type="checkbox" name="remember-me" />
                        <label htmlFor="remember-me">Rester connecté</label>
                    </StyledField>
                    <StyledField>
                        <StyledSubmit onClick={(e) => handleLogin(e)} />
                    </StyledField>
                    <StyledField>
                        Nouveau ?{' '}
                        <StyleLink to="/signin"> S'inscrire</StyleLink>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
        </StyledLoginPage>
    )
}

export default Login

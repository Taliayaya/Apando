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
import { useApi } from '../../utils/hooks'
import { useState } from 'react'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { state } = useLocation()
    const { sender } = useApi()
    const [nameEmail, setnameEmail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(null)

    async function handleLogin(e) {
        e.preventDefault()
        // Création du pack de data à ajouter
        const formData = new FormData()
        formData.append('username_or_email', nameEmail)
        formData.append('u_password', password)

        const data = await sender('http://localhost/API/login.php', formData)
        data?.logged
            ? login().then(() => {
                  navigate(state?.path || '/app')
              })
            : seterror(true)
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
                            onChange={(e) => setnameEmail(e.target.value)}
                            value={nameEmail}
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
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
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
                    {error && <StyledField>Il y a eu une erreur</StyledField> &&
                        console.log(error)}
                </StyledForm>
            </StyledLoginWrapper>
        </StyledLoginPage>
    )
}

export default Login

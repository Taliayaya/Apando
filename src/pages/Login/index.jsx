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
    StyleError,
} from '../../utils/style/LoginSignStyle'
import { useApi, useData } from '../../utils/hooks'
import { useState } from 'react'
import { API_LOGIN_PATH } from '../../utils/paths'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { state } = useLocation()
    const { sender } = useApi()
    const { setuserData } = useData()
    const [nameEmail, setnameEmail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(null)

    async function handleLogin(e) {
        e.preventDefault()
        // Création du pack de data à ajouter
        const formData = new FormData()
        formData.append('username_or_email', nameEmail)
        formData.append('u_password', password)

        const data = await sender(API_LOGIN_PATH, formData)
        data?.logged
            ? login().then(() => {
                  setuserData(data?.logged_user_data)
                  sessionStorage.setItem(
                      'userData',
                      JSON.stringify(data?.logged_user_data)
                  )

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
                    {error && (
                        <StyleError>
                            Votre identifiant ou mot de passe est incorrect
                        </StyleError>
                    )}
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
                        Nouveau ?<StyleLink to="/signin"> S'inscrire</StyleLink>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
        </StyledLoginPage>
    )
}

export default Login

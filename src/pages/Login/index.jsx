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
    StyledVisibilityOffIcon,
    StyledVisibilityOnIcon,
    Wave,
} from '../../utils/style/LoginSignStyle'
import { useApi, useData } from '../../utils/hooks'
import { useState, useEffect } from 'react'
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
    const [showPassword, setShowPassword] = useState(false)
    const [stayLogged, setStayLogged] = useState(false)

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
                  stayLogged &&
                      localStorage.setItem(
                          'userData',
                          JSON.stringify(data?.logged_user_data)
                      )
                  navigate(state?.path || '/app')
              })
            : seterror(true)
    }
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            const userData = JSON.parse(localStorage.getItem('userData'))
            if (Object.keys(userData).length) {
                login().then(() => {
                    setuserData(userData)
                    sessionStorage.setItem('userData', JSON.stringify(userData))
                    navigate(state?.path || '/app')
                })
            }
        }
    })
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
                            e-mail ou nom d'utilisateur
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                        />

                        <StyledFieldLabel htmlFor="password">
                            mot de passe
                        </StyledFieldLabel>
                        {showPassword ? (
                            <StyledVisibilityOnIcon
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <StyledVisibilityOffIcon
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </StyledField>
                    <StyledField>
                        <input
                            type="checkbox"
                            name="remember-me"
                            onChange={(e) => setStayLogged(!stayLogged)}
                        />
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
            <Wave />
        </StyledLoginPage>
    )
}

export default Login

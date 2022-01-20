import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
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
import { useState, useEffect } from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
import styled from 'styled-components'

const StyledTitleLink = styled(Link)`
    font-size: 25px;
    text-decoration: none;
    color: #fff;
    z-index: 0;
`

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { state } = useLocation()
    const [nameEmail, setnameEmail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [stayLogged, setStayLogged] = useState(false)
    const auth = getAuth()

    auth.useDeviceLanguage()
    const provider = new GoogleAuthProvider()

    const googleSignInApi = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                await updateDoc(doc(db, 'users', result.user.uid), {
                    'data.lastLogin': Timestamp.fromDate(new Date()),
                })

                login().then(() => {
                    navigate(state?.path || '/app')
                })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.email
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error)
                // ...
                console.log(errorCode, errorMessage, email, credential)
            })
    }
    async function handleLogin(e) {
        e.preventDefault()
        // Création du pack de data à ajouter

        signInWithEmailAndPassword(auth, nameEmail, password)
            .then(async (userCredential) => {
                await updateDoc(doc(db, 'users', userCredential.user.uid), {
                    'data.lastLogin': Timestamp.fromDate(new Date()),
                })

                // Signed in
                login().then(() => {
                    navigate(state?.path || '/app')
                })
            })
            .catch((error) => {
                const errorCode = error.code
                seterror(errorCode)
            })
    }
    useEffect(() => {
        auth.onAuthStateChanged(async (authUser) => {
            if (authUser !== null) {
                await updateDoc(doc(db, 'users', authUser.uid), {
                    'data.lastLogin': Timestamp.fromDate(new Date()),
                })

                login().then(() => {
                    navigate(state?.path || '/app')
                })
            }
        })
    })
    return (
        <StyledLoginPage>
            <StyledHeaderTitle>
                <StyledTitleLink to="/">Pando</StyledTitleLink>
            </StyledHeaderTitle>
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
                            adresse mail
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
                        Nouveau ?<StyleLink to="/signup"> S'inscrire</StyleLink>{' '}
                        <br /> <br />
                        <StyleLink to="/reset">Mot de passe oublié</StyleLink>
                    </StyledField>
                    <StyledField
                        onClick={() => googleSignInApi()}
                        style={{
                            cursor: 'pointer',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="https://img.icons8.com/fluency/48/000000/google-logo.png"
                            alt="Google Icon for SignIn popup"
                        />
                        <span> Continuer avec Google</span>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
            <Wave />
        </StyledLoginPage>
    )
}

export default Login

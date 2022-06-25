import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/hooks'
import {
    StyledLoginTitle,
    StyledForm,
    StyledField,
    StyledFieldInput,
    StyledFieldLabel,
    StyledSubmit,
    StyleLink,
    StyleError,
    StyledVisibilityOffIcon,
    StyledVisibilityOnIcon,
    StyledLoginWrapper,
} from './/LoginSignStyle'
import { useState, useEffect } from 'react'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
import { Helmet } from 'react-helmet-async'
import Backgrounds from '../../components/Backgrounds'
import Header from '../../components/Header'
import { ThemeProvider } from 'styled-components'

function Login() {
    const navigate = useNavigate()
    const { login, themeUsed } = useAuth()
    const location = useLocation()
    const [nameEmail, setnameEmail] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const auth = getAuth()
    const from = location.state?.from?.pathname || '/app'

    auth.useDeviceLanguage()
    const provider = new GoogleAuthProvider()

    const googleSignInApi = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                try {
                    await updateDoc(doc(db, 'users', result.user.uid), {
                        'data.lastLogin': Timestamp.fromDate(new Date()),
                    })

                    login().then(() => {
                        navigate(from, { replace: true })
                    })
                } catch {
                    setError(
                        "Il n'existe pas de compte existant avec cette adresse mail."
                    )
                }
            })
            .catch((error) => {
                // // Handle Errors here.
                // const errorCode = error.code
                // const errorMessage = error.message
                // // The email of the user's account used.
                // const email = error.email
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error)
                // // ...
                // // console.log(errorCode, errorMessage, email, credential)
                setError('Il y a eu une erreur')
            })
    }
    async function handleLogin(e) {
        e.preventDefault()
        // Création du pack de data à ajouter

        signInWithEmailAndPassword(auth, nameEmail, password)
            .then(async (userCredential) => {
                try {
                    await updateDoc(doc(db, 'users', userCredential.user.uid), {
                        'data.lastLogin': Timestamp.fromDate(new Date()),
                        'data.email': userCredential.user.email,
                    })
                } catch {
                    setError(
                        "Il n'existe pas de compte existant avec cette adresse mail."
                    )
                }

                // Signed in
                login().then(() => {
                    navigate(from, { replace: true })
                })
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    useEffect(() => {
        auth.onAuthStateChanged(async (authUser) => {
            if (authUser !== null) {
                await updateDoc(doc(db, 'users', authUser.uid), {
                    'data.lastLogin': Timestamp.fromDate(new Date()),
                    // to update acc that where created before this update
                    'data.email': authUser.email,
                })

                login().then(() => {
                    navigate(from, { replace: true })
                })
            }
        })
    })
    return (
        <>
            <Helmet>
                <title>Apando / Connexion</title>
                <meta
                    name="description"
                    content="Connectez-vous à Apando pour retrouvez vos camarades en quelques clics."
                />
            </Helmet>
            <ThemeProvider theme={themeUsed}>
                <Backgrounds sakura={true}>
                    <Header />
                    <StyledLoginWrapper className="wrapper">
                        <StyledLoginTitle>Connexion</StyledLoginTitle>
                        <StyledForm action="#">
                            {error && <StyleError>{error}</StyleError>}
                            <StyledField>
                                <StyledFieldInput
                                    type="text"
                                    name="username_or_email"
                                    onChange={(e) =>
                                        setnameEmail(e.target.value)
                                    }
                                    value={nameEmail}
                                    required
                                />
                                <StyledFieldLabel
                                    className="field-label"
                                    htmlFor="username_or_email"
                                >
                                    adresse mail
                                </StyledFieldLabel>
                            </StyledField>
                            <StyledField>
                                <StyledFieldInput
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                    required
                                />

                                <StyledFieldLabel htmlFor="password">
                                    mot de passe
                                </StyledFieldLabel>
                                {showPassword ? (
                                    <StyledVisibilityOnIcon
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                ) : (
                                    <StyledVisibilityOffIcon
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                )}
                            </StyledField>

                            <StyledField>
                                <StyledSubmit
                                    onClick={(e) => handleLogin(e)}
                                    value="Valider"
                                    type={'submit'}
                                />
                            </StyledField>
                            <StyledField>
                                Nouveau ?
                                <StyleLink to="/signup"> S'inscrire</StyleLink>{' '}
                                <br /> <br />
                                <StyleLink to="/reset">
                                    Mot de passe oublié
                                </StyleLink>
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
                </Backgrounds>
            </ThemeProvider>
        </>
    )
}

export default Login

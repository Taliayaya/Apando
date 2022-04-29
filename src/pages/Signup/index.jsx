import {
    StyledLoginTitle,
    StyledForm,
    StyledField,
    StyledFieldInput,
    StyledFieldLabel,
    StyledLoginWrapper,
    StyledSubmit,
    StyleLink,
    StyleError,
    StyledVisibilityOffIcon,
    StyledVisibilityOnIcon,
} from '../../utils/style/LoginSignStyle'
import { useState } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
import { useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import BackgroundAnimation from '../../components/BackgroundAnimation'
import Header from '../../components/Header'

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkBox, setCheckBox] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const auth = getAuth()
    auth.useDeviceLanguage()
    const provider = new GoogleAuthProvider()

    const googleSignInApi = async () => {
        signInWithPopup(auth, provider).then(async (result) => {
            const data = {
                lastLogin: Timestamp.fromDate(new Date()),
                uid: result.user.uid,
                name: result.user.displayName,
                avatar: result.user.photoURL,
            }
            await setDoc(doc(db, 'users', result.user.uid), {
                data,
            })
            await sendEmailVerification(result.user)
            navigate('/join')
        })
        // .catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code
        //     const errorMessage = error.message
        //     // The email of the user's account used.
        //     const email = error.email
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error)
        //     // ...
        //     // console.log(errorCode, errorMessage, email, credential)
        // })
    }

    async function handleSignIn(e) {
        e.preventDefault()
        if (!checkBox) {
            setError(
                "Vous devez accepter les conditions d'utilisation pour continuer"
            )
            return
        }

        if ((!username, !email, !password)) {
            setError('Tous les champs ne sont pas remplis correctement')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                await updateProfile(userCredential.user, {
                    displayName: username,
                }).catch((error) => {
                    setError('Il y a eu une erreur')
                })
                const data = {
                    lastLogin: Timestamp.fromDate(new Date()),
                    uid: userCredential.user.uid,
                    name: username,
                    avatar: userCredential.user.photoURL,
                    email: userCredential.user.email,
                }
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    data,
                })
                await sendEmailVerification(userCredential.user)
                navigate('/join')
            })
            .catch((error) => {
                const errorCode = error.code
                setError(errorCode)
            })
    }

    return (
        <>
            <Helmet>
                <title>Apando / Inscription</title>
                <meta
                    name="description"
                    content="Bienvenue sur Apando ! Vous pouvez vous inscrire ici pour accéder au reste du site."
                />
            </Helmet>
            <BackgroundAnimation>
                <Header />
                <StyledLoginWrapper>
                    <StyledLoginTitle>Inscription</StyledLoginTitle>
                    <StyledForm action="#">
                        {error && <StyleError>{error}</StyleError>}
                        <StyledField>
                            <StyledFieldInput
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <StyledFieldLabel htmlFor="username">
                                nom d'utilisateur
                            </StyledFieldLabel>
                        </StyledField>
                        <StyledField>
                            <StyledFieldInput
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <StyledFieldLabel htmlFor="email">
                                e-mail
                            </StyledFieldLabel>
                        </StyledField>
                        <StyledField>
                            <StyledFieldInput
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <input
                                type="checkbox"
                                name="remember-me"
                                onChange={(e) => setCheckBox(!checkBox)}
                                required
                            />
                            <label htmlFor="accept-rules">
                                Je reconnais avoir 13 ans ou plus et avoir lu et
                                accepté{' '}
                                <StyleLink to="/terms">
                                    les conditions d'utilisations
                                </StyleLink>{' '}
                                et{' '}
                                <StyleLink to="/privacy">
                                    la Politique de Confidentialité
                                </StyleLink>
                            </label>
                        </StyledField>
                        <StyledField>
                            <StyledSubmit onClick={(e) => handleSignIn(e)} />
                        </StyledField>
                        <StyledField>
                            Déjà inscrit ?
                            <StyleLink to="/login"> Se connecter</StyleLink>
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
            </BackgroundAnimation>
        </>
    )
}

export default Signup

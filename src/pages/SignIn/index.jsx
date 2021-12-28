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
import { StyledSelect, StyledOption } from './SignInStyle'
import { useState } from 'react'
import { useApi } from '../../utils/hooks'
import { API_SIGNIN_PATH } from '../../utils/paths'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [userRank, setUserRank] = useState('')
    const [password, setPassword] = useState('')
    const [verifPassword, setVerifPassword] = useState('')
    const [error, setError] = useState(null)
    const { sender } = useApi()
    const navigate = useNavigate()

    async function handleSignIn(e) {
        e.preventDefault()
        if ((!username, !email, !userRank, !password, !verifPassword)) {
            setError('Tout les champs ne sont pas rempli correctement')
            return
        }
        if (password !== verifPassword) {
            setError('Les deux mots de passe ne correspondent pas')
            return
        }
        const signInFormData = new FormData()
        signInFormData.append('username', username)
        signInFormData.append('email', email)
        signInFormData.append('userRank', userRank)
        signInFormData.append('u_password', password)
        signInFormData.append('u_password_verif', verifPassword)
        const sentForm = await sender(API_SIGNIN_PATH, signInFormData)
        sentForm?.finished && navigate('/login')
    }

    return (
        <StyledLoginPage>
            <StyledHeaderTitle>Pando</StyledHeaderTitle>
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
                        <StyledSelect
                            id="user_rank"
                            value={userRank}
                            onChange={(e) => setUserRank(e.target.value)}
                            required
                        >
                            <StyledOption value="" disabled defaultValue>
                                Choisissez votre profession
                            </StyledOption>
                            <StyledOption value="teacher">
                                Enseignant
                            </StyledOption>
                            <StyledOption value="student">Élève</StyledOption>
                            <StyledOption value="other">Autre</StyledOption>
                        </StyledSelect>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <StyledFieldLabel htmlFor="password">
                            mot de passe
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type="password"
                            name="verif_password"
                            value={verifPassword}
                            onChange={(e) => setVerifPassword(e.target.value)}
                            required
                        />
                        <StyledFieldLabel htmlFor="verif_password">
                            confirmer le mot de passe
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <input type="checkbox" name="remember-me" required />
                        <label htmlFor="accept-rules">
                            J'accepte les conditions d'utilisations
                        </label>
                    </StyledField>
                    <StyledField>
                        <StyledSubmit onClick={(e) => handleSignIn(e)} />
                    </StyledField>
                    <StyledField>
                        Déjà inscrit ?
                        <StyleLink to="/login"> Se connecter</StyleLink>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
        </StyledLoginPage>
    )
}

export default SignIn

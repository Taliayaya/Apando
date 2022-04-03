import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import Helmet from 'react-helmet'
import {
    StyledLoginPage,
    StyledHeaderTitle,
    StyledLoginWrapper,
    StyledLoginTitle,
    StyledForm,
    StyledField,
    StyledFieldInput,
    StyledFieldLabel,
    StyledSubmit,
    StyleError,
    StyleAlert,
    StyleLink,
} from '../../utils/style/LoginSignStyle'
import { StyledText } from '../Join/JoinStyle'
import { WaveReset } from './WaveReset'

const ResetPassword = () => {
    const [email, setEmail] = useState('')

    const auth = getAuth()
    const [sentMessage, setSentMessage] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSentMessage(`Un mail de réinitialisation à été envoyé à ${email}.
            Si vous n'avez rien reçu, vérifiez que l'adresse entrée correspond bien à la vôtre.`)
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return (
        <>
            <Helmet>
                <title>Apando / Mot de passe oublié</title>
            </Helmet>
            <StyledLoginPage>
                <StyledHeaderTitle>
                    Réinitialiser le mot de passe
                </StyledHeaderTitle>
                <StyledLoginWrapper>
                    <StyledLoginTitle>Mot de passe oublié</StyledLoginTitle>
                    <StyledText>
                        Vous avez oublié votre mot de passe ? Pas de soucis,
                        vous pouvez d'ici envoyer un mail de réinitialisation de
                        mot de passe à partir de l'adresse mail de votre compte.
                    </StyledText>
                    {error && <StyleError>{error}</StyleError>}
                    {sentMessage && (
                        <StyleAlert success>{sentMessage}</StyleAlert>
                    )}
                    <StyledForm action="#">
                        <StyledField>
                            <StyledFieldInput
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <StyledFieldLabel htmlFor="email">
                                Adresse mail du compte
                            </StyledFieldLabel>
                        </StyledField>

                        <StyledField>
                            <StyledSubmit
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            />
                        </StyledField>
                        <StyledField>
                            Tu veux retenter ta chance ? <br />
                            <StyleLink to="/login">Se connecter</StyleLink>
                        </StyledField>
                    </StyledForm>
                </StyledLoginWrapper>
                <WaveReset />
            </StyledLoginPage>
        </>
    )
}

export default ResetPassword

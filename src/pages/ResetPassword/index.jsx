// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BackgroundAnimation from '../../components/BackgroundAnimation'
import Header from '../../components/Header'
import {
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
} from '../Login/LoginSignStyle'
import { StyledText } from '../Join/JoinStyle'

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
            <BackgroundAnimation sakura={true}>
                <Header authLinks={true} />
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
            </BackgroundAnimation>
        </>
    )
}

export default ResetPassword

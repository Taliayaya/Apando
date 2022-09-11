import React from 'react'
import { StyledText } from './JoinStyle'
import {
    StyledFieldInput,
    StyledField,
    StyledFieldLabel,
    StyledSubmit,
    StyleLink,
} from '../Login/LoginSignStyle'
import { getServer, joinServer, requestJoin } from '../../utils/function'
import { useNavigate } from 'react-router-dom'

function JoinServerForm({ setError, user, setSuccess }) {
    const [code, setCode] = React.useState('')
    const [serverName, setServerName] = React.useState('')
    const navigate = useNavigate()
    const handleCode = async (e) => {
        e.preventDefault()
        setError(null)
        if (code.length > 0) {
            const server = await getServer(serverName, code)
            if (server.name) {
                if (server?.jointype === 'manual') {
                    requestJoin(user, server.id)
                        .then(() => {
                            setSuccess(
                                "Votre demande d'adhésion a bien été envoyée. Vous pourrez rejoindre le serveur une fois la demande acceptée."
                            )
                        })
                        .catch((e) => {
                            setError(e.message)
                        })
                } else {
                    joinServer(user, server)
                        .then((res) => {
                            setSuccess(res)
                            setError(null)
                            setTimeout(() => {
                                navigate('/app')
                            }, 3000)
                        })
                        .catch((err) => {
                            setError(err)
                        })
                }
            } else {
                setError('Oups, le code ou le nom semble invalide')
            }
        }
    }
    return (
        <React.Fragment>
            <StyledText>
                Ici tu peux rentrer le code que ton enseignant(e), ton ami(e) ou
                tes camarades t'ont donné.
            </StyledText>
            <StyledText>
                Courage c'est la dernière étape avant de les rejoindre !
            </StyledText>
            <StyledText>
                Dans le cadre de la beta, tu peux utiliser comme nom et code{' '}
                <b>beta</b> pour rejoindre le serveur de la beta et obtenir un
                avant-goût de Apando !
            </StyledText>

            <StyledField>
                <StyledFieldInput
                    type="text"
                    name="serverName"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    required
                />
                <StyledFieldLabel htmlFor="mycode">
                    Entrer le nom du serveur
                </StyledFieldLabel>
            </StyledField>
            <StyledField>
                <StyledFieldInput
                    type="text"
                    name="mycode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <StyledFieldLabel htmlFor="mycode">
                    Entrer mon code
                </StyledFieldLabel>
            </StyledField>
            <StyledField>
                <StyledSubmit type="submit" onClick={(e) => handleCode(e)} />
            </StyledField>
            <StyledField>
                Pas de code ?{' '}
                <StyleLink to="/create/server">Crée ton serveur</StyleLink>
            </StyledField>
        </React.Fragment>
    )
}

export default JoinServerForm

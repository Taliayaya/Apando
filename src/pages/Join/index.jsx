import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    StyledLoginWrapper,
    StyledForm,
    StyledLoginTitle,
    StyledFieldInput,
    StyledField,
    StyledFieldLabel,
    StyledSubmit,
    StyleLink,
} from '../Login/LoginSignStyle'
import { StyledText } from './JoinStyle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@mui/system'
import { theme } from '../../utils/style/colors'
import { getAuth } from 'firebase/auth'
import { getServer, joinServer, requestJoin } from '../../utils/function'
import { Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Helmet } from 'react-helmet-async'
import Backgrounds from '../../components/Backgrounds'
import Header from '../../components/Header'
import { useAuth } from '../../utils/hooks'
import { ThemeProvider } from 'styled-components'

const StyledExitToAppIcon = styled(ExitToAppIcon)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    left: '5em',
    top: '-2em',
    fontSize: 'large',
    zIndex: 999,
    borderRadius: 10,

    '&:hover': {
        opacity: 0.7,
        backgroundColor: '#17094f',
    },

    position: 'relative',
}))

const Join = () => {
    const [code, setCode] = useState('')
    const [serverName, setServerName] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const auth = getAuth()
    const user = auth.currentUser
    const [success, setSuccess] = useState(null)
    const { themeUsed } = useAuth()

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
                                "Votre demande d'adh??sion a bien ??t?? envoy??e. Vous pourrez rejoindre le serveur une fois la demande accept??e."
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
        <>
            <Helmet>
                <title>Apando / Rejoindre un serveur</title>
            </Helmet>

            <ThemeProvider theme={themeUsed}>
                <Backgrounds sakura={true}>
                    <Header />
                    <StyledLoginWrapper>
                        <StyledLoginTitle>
                            <span style={{ marginLeft: '30px' }}>Mon code</span>
                            <StyledExitToAppIcon
                                onClick={() => navigate('/app')}
                            />
                        </StyledLoginTitle>
                        <StyledText>
                            Ici tu peux rentrer le code que ton enseignant(e),
                            ton ami(e) ou tes camarades t'ont donn??.
                        </StyledText>
                        <StyledText>
                            Courage c'est la derni??re ??tape avant de les
                            rejoindre !
                        </StyledText>
                        <StyledText>
                            Dans le cadre de la beta, tu peux utiliser comme nom
                            et code <b>beta</b> pour rejoindre le serveur de la
                            beta et obtenir un avant-go??t de Apando !
                        </StyledText>

                        {/*
                ===============
                ERROR COMPONENT
                ===============
                */}
                        <Collapse in={Boolean(error)}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setError(null)}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                severity="error"
                            >
                                {error}
                            </Alert>
                        </Collapse>

                        <StyledForm action="#">
                            <StyledField>
                                <StyledFieldInput
                                    type="text"
                                    name="serverName"
                                    value={serverName}
                                    onChange={(e) =>
                                        setServerName(e.target.value)
                                    }
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
                                <StyledSubmit
                                    type="submit"
                                    onClick={(e) => handleCode(e)}
                                />
                            </StyledField>
                            <Collapse in={Boolean(success)}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => setError(null)}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    severity="success"
                                >
                                    {success}
                                </Alert>
                            </Collapse>
                            <StyledField>
                                Pas de code ?{' '}
                                <StyleLink to="/create">
                                    Cr??e ton serveur
                                </StyleLink>
                            </StyledField>
                        </StyledForm>
                    </StyledLoginWrapper>
                </Backgrounds>
            </ThemeProvider>
        </>
    )
}

export default Join

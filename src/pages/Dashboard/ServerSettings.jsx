import {
    Params,
    ParamsCase,
    ParamsHeader,
    StyleEditContainer,
    StyledEditIcon,
    StyledEditOffIcon,
} from './DashboardStyle'

import {
    Alert,
    Button,
    Collapse,
    Fade,
    FormControl,
    IconButton,
    InputAdornment,
    LinearProgress,
    NativeSelect,
    TextField,
    Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import { getServerInfo, setServerChanges } from '../../utils/function'
import PropTypes from 'prop-types'
import Server from '../../utils/server'

/**
 * Widget that allows owners/admins to change their server params.
 * - Allowed email domain (ex: @gmail.com)
 * - Code to enter the server
 * - Join type (auto or manual)
 */
const ServerParams = ({
    domain,
    serverName,
    code,
    autoJoin,
    server_id,
    server,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [joinType, setJoinType] = useState('')
    const [domainValue, setDomainValue] = useState('')
    const [codeValue, setCodeValue] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [query, setQuery] = useState('idle')
    const [serverInfo, setServerInfo] = useState({})

    const errorOpen = Boolean(error)
    const successOpen = Boolean(success)

    // to update states when not editing ofc
    useEffect(() => {
        if (!isEditing) {
            setCodeValue(code)
            setDomainValue(domain)
            setJoinType(autoJoin)
        }
    }, [autoJoin, code, domain, isEditing, joinType])

    const editParams = () => {
        setIsEditing(!isEditing)
        setError(null)
    }

    /**
     * Validate changes for the user.
     * A progress bar was set up. Other forms will have to follow this.
     */
    const validChanges = async () => {
        setSuccess(null)
        setError(null)
        try {
            setQuery('progress')
            await Server.update(
                server_id,
                { domain: domainValue, code: codeValue, jointype: joinType },
                server?.orga
            )
            setQuery('idle')
            setSuccess('Modifications enregistrées')
            editParams()
            const servInfo = await Server.get(server_id, server?.orga)
            setServerInfo(servInfo)
        } catch (e) {
            console.error(e)
            setError(`Il y a eu une erreur, veuillez réessayer : ${e}`)
            setQuery('idle')
        }
    }

    code = serverInfo?.code ?? code
    domain = serverInfo?.domain ?? domain
    autoJoin = serverInfo?.jointype ?? autoJoin

    return (
        <>
            <ParamsCase>
                <ParamsHeader>
                    Paramètres de {serverName}
                    <StyleEditContainer
                        onClick={editParams}
                        isediting={isEditing ? 'true' : 'false'}
                    >
                        {isEditing ? (
                            <Tooltip title="Annuler les modifications">
                                <IconButton>
                                    <StyledEditOffIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Modifier">
                                <IconButton>
                                    <StyledEditIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </StyleEditContainer>
                </ParamsHeader>
                <Collapse in={errorOpen}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setError(null)}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                </Collapse>

                <Params>
                    <Tooltip title="Un nom de domaine d’adresse mail est la partie d’une adresse e-mail qui vient après le symbole @">
                        <span>Domaine :</span>
                    </Tooltip>
                    {isEditing ? (
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        @
                                    </InputAdornment>
                                ),
                            }}
                            hiddenLabel
                            id="domain-input"
                            variant="filled"
                            onChange={(e) => setDomainValue(e.target.value)}
                            value={domainValue}
                        />
                    ) : (
                        <span>{domain ? `@${domain}` : 'Tous'}</span>
                    )}
                </Params>
                <Params>
                    <Tooltip title="Le code de votre serveur permet aux autres utilisateurs de rejoindre le serveur">
                        <span>Code du serveur : </span>
                    </Tooltip>
                    {isEditing ? (
                        <TextField
                            hiddenLabel
                            id="code-input"
                            variant="filled"
                            value={codeValue}
                            onChange={(e) => setCodeValue(e.target.value)}
                        />
                    ) : (
                        <span>{code}</span>
                    )}
                </Params>
                <Params>
                    <Tooltip
                        title="Permet ou non aux utilisateurs de rejoindre votre serveur
                    immédiatement ou s'ils doivent demander l'autorisation avant, malgré le code"
                    >
                        <span>Rejoindre : </span>
                    </Tooltip>
                    {isEditing ? (
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <NativeSelect
                                inputMode="dark"
                                value={joinType}
                                onChange={(e) => setJoinType(e.target.value)}
                            >
                                {joinType === 'auto' ? (
                                    <>
                                        <option value="auto">
                                            Automatiquement
                                        </option>
                                        <option value="manual">
                                            Sur Demande
                                        </option>
                                    </>
                                ) : (
                                    <>
                                        <option value="manual">
                                            Sur Demande
                                        </option>
                                        <option value="auto">
                                            Automatiquement
                                        </option>
                                    </>
                                )}
                            </NativeSelect>
                        </FormControl>
                    ) : (
                        <span>
                            {autoJoin === 'auto'
                                ? 'Automatiquement'
                                : 'Sur Demande'}
                        </span>
                    )}
                </Params>
                <Collapse in={successOpen}>
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setSuccess(null)}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {success}
                    </Alert>
                </Collapse>
                {isEditing && (
                    <>
                        {query === 'idle' ? (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={validChanges}
                            >
                                Valider
                            </Button>
                        ) : (
                            <Fade
                                in={query === 'progress'}
                                style={{
                                    transitionDelay:
                                        query === 'progress' ? '800ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <LinearProgress />
                            </Fade>
                        )}
                    </>
                )}
            </ParamsCase>
        </>
    )
}

ServerParams.propTypes = {
    domain: PropTypes.string,
    serverName: PropTypes.string,
    code: PropTypes.string,
    autoJoin: PropTypes.string,
    server_id: PropTypes.string,
}

export default ServerParams

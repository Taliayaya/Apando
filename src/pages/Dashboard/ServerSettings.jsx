import {
    Params,
    ParamsCase,
    ParamsHeader,
    StyleEditContainer,
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
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import { theme } from '../../utils/style/colors'
import { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import { getServerInfo, setServerChanges } from '../../utils/function'
import PropTypes from 'prop-types'

/**
 * Widget that allows owners/admins to change their server params.
 * - Allowed email domain (ex: @gmail.com)
 * - Code to enter the server
 * - Join type (auto or manual)
 */
const ServerParams = ({ domain, serverName, code, autoJoin, server_id }) => {
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
        if (codeValue.trim().length === 0) {
            setError('Le code du serveur ne doit pas être vide')
            return
        }
        try {
            setQuery('progress')
            await setServerChanges(server_id, domainValue, codeValue, joinType)
            setQuery('idle')
            setSuccess('Modifications enregistrées')
            editParams()
            const servInfo = await getServerInfo(server_id)
            setServerInfo(servInfo)
        } catch (e) {
            console.error(e)
            setError(`Il y a eu une erreur, veuillez réessayer : ${e}`)
        }
    }

    code = serverInfo?.code ?? code
    domain = serverInfo?.domain ?? domain
    autoJoin = serverInfo?.jointype ?? autoJoin

    return (
        <>
            <ParamsCase data-testid="params">
                <ParamsHeader>
                    Paramètres de {serverName}
                    <StyleEditContainer
                        onClick={editParams}
                        isediting={isEditing ? 'true' : 'false'}
                        data-testid="edit-params"
                    >
                        {isEditing ? (
                            <Tooltip title="Annuler les modifications">
                                <IconButton>
                                    <EditOffIcon
                                        style={{ color: theme.font_color }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Modifier">
                                <IconButton>
                                    <EditIcon
                                        style={{ color: theme.font_color }}
                                    />
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
                            name="domain-input"
                            data-testid="domain-input"
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
                            name="code-input"
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

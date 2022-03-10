import {
    Params,
    ParamsCase,
    ParamsHeader,
    StyleEditContainer,
} from './DashboardStyle'

import {
    FormControl,
    IconButton,
    InputAdornment,
    NativeSelect,
    TextField,
    Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import { theme } from '../../utils/style/colors'
import { useState } from 'react'

const ServerParams = ({ domain, serverName, code, autoJoin }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [joinType, setJoinType] = useState(autoJoin)

    const editParams = () => {
        setIsEditing(!isEditing)
    }

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
                            defaultValue={domain}
                            variant="filled"
                        />
                    ) : (
                        <span>{domain ? `*@${domain}` : 'Tous'}</span>
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
                            defaultValue={code}
                            variant="filled"
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
                                defaultValue={joinType}
                                value={joinType}
                                onChange={(e) => setJoinType(e.target.value)}
                                displayEmpty
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
            </ParamsCase>
        </>
    )
}

export default ServerParams

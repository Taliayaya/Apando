import { useNavigate } from 'react-router-dom'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import { useState } from 'react'
import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    ListItemIcon,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { Add, Create, Dashboard } from '@mui/icons-material'
import { addNewChannel } from '../../utils/function'
import { Done } from '@mui/icons-material'

const LeftMenu = ({ serverList, setChannelList }) => {
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)

    const { currentServer, setCurrentServer, setUserList } = useChannel()
    const { setMessageList } = useMessageList()

    const { userRole } = useAuth()
    const hasPower = ['Admin', 'Owner'].includes(userRole)
    const navigate = useNavigate()

    const addChannel = async (e) => {
        e.preventDefault()
        if (!newChannelName.trim()) {
            setError("Aucun nom de salon n'a été indiqué")
            return
        }
        error && setError(null)

        addNewChannel(newChannelName, currentServer?.id)

        setNewChannelName('')
    }

    /**
     * Basically, it resets all states in order to change server.
     * You probably won't appreciate being in a server and seeing that
     * nothing changed...
     * It also update the server id param in the url
     * @param {String} value is the server id and name separated by a space
     */
    const changeServer = (value) => {
        /** Why §§§§§§§§§§§§$ ? Because server name is 12 chr long
         * This was written at midnight. Forgive me
         */
        const server = value.split('§§§§§§§§§§§§§')
        setCurrentServer({ id: server[0], name: server[1] })
        setChannelList([])
        setUserList([])
        setMessageList([])
        navigate(`${server[1]}/${server[0]}`)
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={Boolean(error)}
                onClose={() => setError(null)}
                message={error}
                key={'topleft'}
            />
            {hasPower && (
                <MenuItem>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}
                    >
                        <TextField
                            id="add-server"
                            label="Ajouter un salon"
                            variant="standard"
                            value={newChannelName}
                            onChange={(e) => setNewChannelName(e.target.value)}
                        />
                        <Tooltip title="Ajouter">
                            <IconButton onClick={(e) => addChannel(e)}>
                                <Done
                                    sx={{
                                        color: 'action.active',
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </MenuItem>
            )}
            <MenuItem>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="server-select-label">
                        Serveur actuel
                    </InputLabel>
                    {console.log(currentServer)}
                    <Select
                        labelId="server-select-label"
                        id="server-select"
                        // value={currentServer?.name}
                        label="Serveur actuel"
                        onChange={(e) => {
                            changeServer(e.target.value)
                        }}
                        defaultValue={`${currentServer?.id}§§§§§§§§§§§§§${currentServer?.name}`}
                    >
                        {serverList &&
                            serverList.map(({ id, name }) => (
                                <MenuItem
                                    value={`${id}§§§§§§§§§§§§§${name}`}
                                    key={id}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                    </Select>
                    <FormHelperText>Change de serveur ici</FormHelperText>
                </FormControl>
            </MenuItem>
            <MenuItem onClick={() => navigate('/join')}>
                <ListItemIcon>
                    <Add />
                </ListItemIcon>
                <Typography>Utiliser un code</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/create')}>
                <ListItemIcon>
                    <Create />
                </ListItemIcon>
                <Typography>Créer un serveur</Typography>
            </MenuItem>
            {hasPower && (
                <MenuItem
                    onClick={() => navigate(`/dashboard/${currentServer?.id}`)}
                >
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <Typography>Tableau de bord</Typography>
                </MenuItem>
            )}
        </>
    )
}

export default LeftMenu

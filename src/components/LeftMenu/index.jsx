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

        addNewChannel(newChannelName, currentServer)

        setNewChannelName('')
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
                    <Select
                        labelId="server-select-label"
                        id="server-select"
                        value={currentServer?.name}
                        label="Serveur actuel"
                        onChange={(e) => {
                            setCurrentServer(e.target.value)
                            setChannelList([])
                            setUserList([])
                            setMessageList([])
                        }}
                        defaultValue={currentServer}
                    >
                        {serverList &&
                            serverList.map(({ id, name }) => (
                                <MenuItem value={id} key={id}>
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
                    onClick={() => navigate(`/dashboard/${currentServer}`)}
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

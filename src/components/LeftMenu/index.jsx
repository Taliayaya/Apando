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
import PropTypes from 'prop-types'
import ServerSelection from './ServerSelection'

/**
 * The Top Left menu of the App.
 * It allows users to change servers and admins to add new channels.
 * It can redirects to the /join and /create pages to create or join a server.
 * For admins only or more, it can also redirects to /dashboard.
 */
const LeftMenu = ({ serverList, setChannelList, orgaServers, setShowMenu }) => {
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)

    const { currentServer, setCurrentServer, setUserList, setCurrentChannel } =
        useChannel()
    const { setMessageList } = useMessageList()

    const { userRole } = useAuth()
    const hasPower = ['Admin', 'Owner'].includes(userRole)
    const navigate = useNavigate()

    /**
     * Add a new channel to the server.
     * @param {Object} e the event Object
     */
    const addChannel = async (e) => {
        e.preventDefault()
        // The string is empty or only contains spaces
        if (!newChannelName.trim()) {
            setError("Aucun nom de salon n'a été indiqué")
            return
        }

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
    const changeServer = (id, name, isSubServer) => {
        setCurrentChannel({})
        setMessageList([])
        setChannelList([])
        setCurrentServer({ id, name, isSubServer })
        setUserList([])
        setShowMenu(null)
        navigate(`${isSubServer ?? 'default'}/${name}/${id}`)
    }

    return (
        <>
            {/* A little snack bar to show error messages */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={Boolean(error)}
                onClose={() => setError(null)}
                message={error}
                key={'topleft'}
            />
            {/* Only admins or owners can add new channels */}
            {hasPower && (
                <MenuItem onKeyDown={(e) => e.stopPropagation()}>
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
            {/* The server selector.
            Users can change their current server here
            */}
            <MenuItem>
                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="server-select-label">
                        Serveur actuel
                    </InputLabel>
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
                            </FormControl>*/}
                <ServerSelection
                    serverList={serverList}
                    handleServerSelect={changeServer}
                    orgaServers={orgaServers}
                />
            </MenuItem>
            {/* The menu item to redirect towards /join */}
            <MenuItem onClick={() => navigate('/join')}>
                <ListItemIcon>
                    <Add />
                </ListItemIcon>
                <Typography>Utiliser un code</Typography>
            </MenuItem>
            {/* The menu item to redirect towards /create */}
            <MenuItem onClick={() => navigate('/create/server')}>
                <ListItemIcon>
                    <Create />
                </ListItemIcon>
                <Typography>Créer un serveur</Typography>
            </MenuItem>
            {/* If the user is an admin, he can be redirected to the dashboard
            of his server. */}
            {hasPower && (
                <MenuItem
                    onClick={() => {
                        navigate(
                            `/dashboard/${currentServer?.id}/${
                                currentServer?.isSubServer ?? ''
                            }`
                        )
                        setCurrentChannel({})
                    }}
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

LeftMenu.propTypes = {
    serverList: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
    setChannelList: PropTypes.func,
}

export default LeftMenu

import { useNavigate } from 'react-router-dom'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import { StyledInput } from '../ChannelList/ChannelListStyle'
import { useState } from 'react'
import { StyleError } from '../../utils/style/LoginSignStyle'
import { ListItemIcon, MenuItem, Typography } from '@mui/material'
import { Add, Create, Dashboard } from '@mui/icons-material'
import { addNewChannel } from '../../utils/function'

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
        if (!newChannelName) {
            setError("Aucun nom de salon n'a été indiqué")
            return
        }
        error && setError(null)

        addNewChannel(newChannelName, currentServer)

        setNewChannelName('')
    }
    return (
        <>
            {error && <StyleError>{error}</StyleError>}
            {hasPower && (
                <form action="#">
                    <MenuItem>
                        <StyledInput
                            type="text"
                            name="new_channel"
                            value={newChannelName}
                            onChange={(e) => setNewChannelName(e.target.value)}
                            placeholder="Nouveau salon"
                        />
                    </MenuItem>
                    <MenuItem>
                        <StyledInput
                            type="submit"
                            value="Ajouter"
                            onClick={(e) => addChannel(e)}
                        />
                    </MenuItem>
                </form>
            )}
            <MenuItem>
                <select
                    value={currentServer?.name}
                    onChange={(e) => {
                        setCurrentServer(e.target.value)
                        setChannelList([])
                        setUserList([])
                        setMessageList([])
                    }}
                    defaultValue={currentServer}
                >
                    {console.log(currentServer)}
                    {serverList &&
                        serverList.map(({ id, name }) => (
                            <option value={id} key={id}>
                                {name}
                            </option>
                        ))}
                </select>
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

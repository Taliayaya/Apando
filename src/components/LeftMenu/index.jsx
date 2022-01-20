import { Link } from 'react-router-dom'
import { useChannel } from '../../utils/hooks'
import { StyledInput } from '../ChannelList/ChannelListStyle'
import { useState } from 'react'
import { StyleError } from '../../utils/style/LoginSignStyle'
import { db } from '../../utils/firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { MenuItem } from '@mui/material'

const LeftMenu = ({ serverList, setChannelList }) => {
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)

    const { currentServer, setCurrentServer, setUserList } = useChannel()

    const addChannel = async (e) => {
        e.preventDefault()
        if (!newChannelName) {
            setError("Aucun nom de salon n'a été indiqué")
            return
        }
        error && setError(null)

        try {
            await addDoc(collection(db, 'channels'), {
                channelName: newChannelName,
                id_server: currentServer,
            })
        } catch (e) {
            console.error(e)
        }

        setNewChannelName('')
    }
    return (
        <>
            {error && <StyleError>{error}</StyleError>}
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
            <MenuItem>
                <select
                    value={currentServer?.name}
                    onChange={(e) => {
                        setCurrentServer(e.target.value)
                        setChannelList([])
                        setUserList([])
                    }}
                >
                    {serverList &&
                        serverList.map(({ id, name }) => (
                            <option value={id} key={id}>
                                {name}
                            </option>
                        ))}
                </select>
            </MenuItem>
            <MenuItem>
                <Link to="/join">Utiliser un code</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/create">Créer un serveur</Link>
            </MenuItem>
        </>
    )
}

export default LeftMenu

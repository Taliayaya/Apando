import { Link } from 'react-router-dom'
import { useApi, useChannel } from '../../utils/hooks'
import { StyledInput } from '../ChannelList/ChannelListStyle'
import { useState } from 'react'
import { API_ADD_CHANNEL } from '../../utils/paths'
import { StyleError } from '../../utils/style/LoginSignStyle'

const LeftMenu = ({ serverList, setChannelList }) => {
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)
    const { sender } = useApi()
    const { currentServer, setCurrentServer } = useChannel()

    const addChannel = async (e) => {
        e.preventDefault()
        if (!newChannelName) {
            setError("Aucun nom de salon n'a été indiqué")
            return
        }
        error && setError(null)
        const addChannelFormData = new FormData()
        addChannelFormData.append('channel_name', newChannelName)
        addChannelFormData.append('server_id', currentServer)
        const success = await sender(API_ADD_CHANNEL, addChannelFormData)
        if (!success?.added) {
            setError("Il y a eu une erreur lors de l'ajout du salon")
        } else {
            console.log('SUCCESS')
            setNewChannelName('')
        }
    }
    return (
        <>
            {error && <StyleError>{error}</StyleError>}
            <form action="#">
                <StyledInput
                    type="text"
                    name="new_channel"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Nouveau salon"
                />
                <StyledInput
                    type="submit"
                    value="Ajouter"
                    onClick={(e) => addChannel(e)}
                />
            </form>
            <select
                value={currentServer?.name}
                onChange={(e) => {
                    setCurrentServer(e.target.value)
                    setChannelList([])
                }}
            >
                {serverList &&
                    serverList.map(({ id_server, name }) => (
                        <option value={id_server} key={id_server}>
                            {name}
                        </option>
                    ))}
            </select>
            <Link to="/join">Utiliser un code</Link>
        </>
    )
}

export default LeftMenu

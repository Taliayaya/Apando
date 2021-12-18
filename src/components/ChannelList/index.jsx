import React from 'react'
import { useState, useEffect } from 'react'
import { useApi, useChannel } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
    StyledChannel,
    StyledInput
} from './ChannelListStyle'
import { StyleError } from '../../utils/style/LoginSignStyle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const API_LOAD_CHANNELS =
    'http://localhost/project-plateforme-api/load_channels.php'
const API_ADD_CHANNEL =
    'http://localhost/project-plateforme-api/add_channel.php'

function ChannelList() {
    const { sender } = useApi()
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)
    const [channelList, setChannelList] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const { currentChannelId, setCurrentChannelId } = useChannel()

    const addChannel = async (e) => {
        e.preventDefault()
        if (!newChannelName) {
            setError("Aucun nom de salon n'a été indiqué")
            return
        }
        error && setError(null)
        const addChannelFormData = new FormData()
        addChannelFormData.append('channel_name', newChannelName)
        addChannelFormData.append('server_id', 1)
        const success = await sender(API_ADD_CHANNEL, addChannelFormData)
        if (!success?.added) {
            setError("Il y a eu une erreur lors de l'ajout du salon")
        } else {
            console.log('SUCCESS')
            setNewChannelName('')
        }
        return () => clearInterval()
    }

    // Load Channels
    useEffect(() => {
        const loadChannels = setInterval(async () => {
            const loadChannelsFormData = new FormData()
            loadChannelsFormData.append('server_id', 1)
            const channelListData = await sender(
                API_LOAD_CHANNELS,
                loadChannelsFormData
            )
            channelListData?.loaded &&
                channelListData.channels_data.length !== channelList.length &&
                setChannelList(channelListData.channels_data)
        }, 60000)
        return () => clearInterval(loadChannels)
    })

    // Ne s'active que lors du premier chargement de la page
    // (ou quand ya pas de salon)
    useEffect(() => {
        const firstLoadChannel = async () => {
            if (channelList.length === 0) {
                const loadChannelsFormData = new FormData()
                loadChannelsFormData.append('server_id', 1)
                const channelListData = await sender(
                    API_LOAD_CHANNELS,
                    loadChannelsFormData
                )
                console.log('used')
                if (channelListData?.loaded && channelListData.channels_data.length !== channelList.length) {
                    console.log('here')
                    let channelsData = channelListData.channels_data
                    // On ajoute ici le premier channel de la liste
                    // pour faire un salon selected par défaut
                    setCurrentChannelId({id: channelsData[0].id_channel, name:channelsData[0].name})
                    setChannelList(channelListData.channels_data)
                }
            }
        }
        firstLoadChannel()
    })
    console.log(currentChannelId)
    console.log(channelList)
    const selectChannel = (id_channel, channel_name) => {
        setCurrentChannelId({ id: id_channel, name: channel_name })
    }

    let currentChannel = currentChannelId.id ? currentChannelId.id : null
    return (
        <StyledChannelList>
            <StyledChannelListTop
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
                hovered={showMenu}
            >
                <h2>Le Bon Sauveur</h2>
                <ExpandMoreIcon />
            </StyledChannelListTop>
            {error && <StyleError>{error}</StyleError>}
            {showMenu && (
                <form
                    action="#"
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
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
            )}

            <StyledChannelListBottom>
                {channelList &&
                    channelList.map(({ id_channel, channel_name }) => (
                        <StyledChannel
                            key={id_channel.toString()}
                            onClick={() =>
                                selectChannel(id_channel, channel_name)
                            }
                            Selected={
                                currentChannel === id_channel
                            }
                        >
                
                            {channel_name}
                        </StyledChannel>
                    ))}
            </StyledChannelListBottom>
        </StyledChannelList>
    )
}

export default ChannelList

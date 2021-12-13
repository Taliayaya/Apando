import React from 'react'
import { useState, useEffect } from 'react'
import { useApi, useChannel } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
    StyledChannel,
} from './ChannelListStyle'
import { StyleError } from '../../utils/style/LoginSignStyle'

const API_LOAD_CHANNELS = 'http://localhost/API/load_channels.php'
const API_ADD_CHANNEL = 'http://localhost/API/add_channel.php'

function ChannelList() {
    const { sender } = useApi()
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)
    const [channelList, setChannelList] = useState([])
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
        }
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

    // Ne s'active que lors du premier chargement de la page (ou quand ya pas de salon)
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
                channelListData?.loaded &&
                    channelListData.channels_data.length !==
                        channelList.length &&
                    setChannelList(channelListData.channels_data)
            }
        }
        firstLoadChannel()
    })

    const selectChannel = (e, id_channel) => {
        console.log(currentChannelId, id_channel)
        setCurrentChannelId(id_channel)
    }

    console.log(channelList)
    return (
        <StyledChannelList>
            <StyledChannelListTop>
                <h2>Le Bon Sauveur</h2>
            </StyledChannelListTop>
            {error && <StyleError>{error}</StyleError>}
            <form action="#">
                <input
                    type="text"
                    name="new_channel"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="Nouveau salon"
                />
                <input
                    type="submit"
                    value="Ajouter"
                    onClick={(e) => addChannel(e)}
                />
            </form>
            <StyledChannelListBottom>
                {channelList &&
                    channelList.map(({ id_channel, channel_name }) => (
                        <StyledChannel
                            key={id_channel.toString()}
                            onClick={(e) => selectChannel(e, id_channel)}
                            Selected={currentChannelId === id_channel}
                        >
                            {channel_name}
                        </StyledChannel>
                    ))}
            </StyledChannelListBottom>
        </StyledChannelList>
    )
}

export default ChannelList

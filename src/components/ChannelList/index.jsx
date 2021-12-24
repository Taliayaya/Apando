import React from 'react'
import { useState, useEffect } from 'react'
import { useApi, useChannel, useData } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
    StyledChannel,
    StyledInput,
} from './ChannelListStyle'
import { StyleError } from '../../utils/style/LoginSignStyle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
    API_LOAD_CHANNELS,
    API_ADD_CHANNEL,
    API_LOAD_SERVERS,
} from '../../utils/paths'
import { Link } from 'react-router-dom'

function ChannelList() {
    const { sender } = useApi()
    const [newChannelName, setNewChannelName] = useState('')
    const [error, setError] = useState(null)
    const [channelList, setChannelList] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const { userData } = useData()
    const {
        currentChannelId,
        setCurrentChannelId,
        currentServer,
        setCurrentServer,
    } = useChannel()
    const [serverList, setServerList] = useState([])

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
        return () => clearInterval()
    }

    // Load Channels
    useEffect(() => {
        const loadChannels = setInterval(async () => {
            const loadChannelsFormData = new FormData()
            loadChannelsFormData.append('server_id', currentServer)
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
                loadChannelsFormData.append('server_id', currentServer)
                const channelListData = await sender(
                    API_LOAD_CHANNELS,
                    loadChannelsFormData
                )
                if (
                    channelListData?.loaded &&
                    channelListData.channels_data.length !== channelList.length
                ) {
                    let channelsData = channelListData.channels_data
                    // On ajoute ici le premier channel de la liste
                    // pour faire un salon selected par défaut
                    setCurrentChannelId({
                        id: channelsData[0].id_channel,
                        name: channelsData[0].name,
                    })
                    setChannelList(channelListData.channels_data)
                }
            }
        }

        const loadServerList = async () => {
            if (serverList.length === 0) {
                const serverFormData = new FormData()
                serverFormData.append('user_id', userData.id)
                const serverList = await sender(
                    API_LOAD_SERVERS,
                    serverFormData
                )
                console.log(serverList)
                if (serverList?.loaded && serverList?.servers_list[0]) {
                    setCurrentServer(serverList?.servers_list[0].id_server)
                    setServerList(serverList?.servers_list)
                }
            }
        }
        loadServerList()
        firstLoadChannel()
    })

    const selectChannel = (id_channel, channel_name) => {
        setCurrentChannelId({ id: id_channel, name: channel_name })
    }
    let currentChannel = currentChannelId.id ? currentChannelId.id : null
    return (
        <StyledChannelList>
            <StyledChannelListTop
                onClick={() => setShowMenu(!showMenu)}
                hovered={showMenu}
            >
                <h2>Le Bon Sauveur</h2>
                <ExpandMoreIcon />
            </StyledChannelListTop>
            {error && <StyleError>{error}</StyleError>}
            {showMenu && (
                <>
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
            )}

            <StyledChannelListBottom>
                {channelList &&
                    channelList.map(({ id_channel, channel_name }) => (
                        <StyledChannel
                            key={id_channel.toString()}
                            onClick={() =>
                                selectChannel(id_channel, channel_name)
                            }
                            Selected={currentChannel === id_channel}
                        >
                            {channel_name}
                        </StyledChannel>
                    ))}
            </StyledChannelListBottom>
        </StyledChannelList>
    )
}

export default ChannelList

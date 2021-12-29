import React from 'react'
import { useState, useEffect } from 'react'
import { useApi, useChannel, useData } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
    StyledChannel,
} from './ChannelListStyle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { API_LOAD_CHANNELS, API_LOAD_SERVERS } from '../../utils/paths'
import LeftMenu from '../LeftMenu'

function ChannelList() {
    const { sender } = useApi()

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

    // Load Channels
    useEffect(() => {
        const loadChannels = setInterval(async () => {
            const loadChannelsFormData = new FormData()
            loadChannelsFormData.append('server_id', currentServer)
            loadChannelsFormData.append('id_user', userData.id)
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
                loadChannelsFormData.append('id_user', userData.id)
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
                {showMenu ? <MenuOpenIcon /> : <ExpandMoreIcon />}
            </StyledChannelListTop>

            {showMenu && (
                <LeftMenu
                    serverList={serverList}
                    setChannelList={setChannelList}
                />
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

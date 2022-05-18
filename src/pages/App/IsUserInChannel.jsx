import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useChannel } from '../../utils/hooks'

const IsUserInChannel = () => {
    const { currentChannel, setCurrentChannel, channelList, currentServer } =
        useChannel()
    const params = useParams()
    useEffect(() => {
        /**
         * It checks the url params channel_id and whether it is existing or not.
         * If it does, it sets it as a selected channel, and so load messages
         * afterward
         * Else it updates the URL and remove the wrong channel id
         */
        const checkURLChannel = async () => {
            if (params.channel_id && currentChannel.id !== params.channel_id) {
                const channelURLInServer = channelList.find(
                    (channelData) => channelData.key === params.channel_id
                )
                // The URL is right, so lets set this channel as selected
                if (channelURLInServer) {
                    setCurrentChannel({
                        id: channelURLInServer.key,
                        name: channelURLInServer.name,
                    })
                }
            }
        }
        checkURLChannel()
    }, [
        channelList,
        currentChannel,
        currentServer,
        params.channel_id,
        setCurrentChannel,
    ])
}

export default IsUserInChannel

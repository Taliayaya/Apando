// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useChannel } from '../../utils/hooks'

const IsUserInChannel = () => {
    const { currentChannel, setCurrentChannel, channelList, currentServer } =
        useChannel()
    const params = useParams()
    const navigate = useNavigate()
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
        navigate,
        params.channel_id,
        setCurrentChannel,
    ])

    return null
}

export default IsUserInChannel

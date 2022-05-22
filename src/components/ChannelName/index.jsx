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

import { DeleteForever } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteChannel } from '../../utils/function'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import { sendNotificationWeb } from '../../utils/notification'
import { StyledChannel } from '../ChannelList/ChannelListStyle'
import PropTypes from 'prop-types'

const ChannelName = ({ id_channel, name, seen, lastMessageData }) => {
    const { setMessageList } = useMessageList()
    const { setCurrentChannel, currentChannel, currentServer } = useChannel()
    const navigate = useNavigate()
    const [contextMenu, setContextMenu] = useState(null)
    const { userRole } = useAuth()
    const user = getAuth().currentUser

    // Do ya have the power to change this wor- server ?
    const hasPower = ['Admin', 'Owner'].includes(userRole)

    // To open the menu or not
    const handleContextMenu = (e) => {
        e.preventDefault()
        setContextMenu(
            contextMenu === null
                ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 }
                : null
        )
    }

    // To close the menu
    const handleClose = () => {
        setContextMenu(null)
    }

    // If this channel_id is the same as the selected channel_id...
    // It means THIS is the selected channel, so lets make it especially cute ~~
    const isCurrentChannel = currentChannel.id === id_channel

    /**
     * Set this channel as selected.
     * Messages from this server will be loaded and the URL modified.
     * @param {string} id_channel the channel to select
     * @param {string} name the channel name
     */
    const selectChannel = (id_channel, name) => {
        if (!isCurrentChannel) {
            setCurrentChannel({ id: id_channel, name: name })
            // Reset the message list, so that new messages can be loaded
            setMessageList([])
            navigate(`${currentServer.name}/${currentServer.id}/${id_channel}`)
        }
    }

    /**
     * Check if the user saw the last message, if yes, it does nothing,
     * else it verify if a notification was already sent. If not, it
     * send a new one :D
     * @returns whether the user saw the last message or not
     */
    const hasSeenLastMessage = () => {
        if (seen) {
            // The user already receive a notification. Let's be gentle
            // and not flood him. Nobody likes being harassed
            if (seen[user.uid] === 'sent') {
                return false
                // The user already saw the message
            } else if (seen[user.uid]) return true
            // Let's send a notification to him !
            seen[user.uid] = 'sent'
            sendNotificationWeb(
                user.uid,
                id_channel,
                currentServer.id,
                lastMessageData.lastMessageImg,
                lastMessageData.lastMessage,
                name,
                currentServer?.name,
                lastMessageData.lastMessageUser
            )
        }

        return false
    }

    return (
        <>
            <StyledChannel
                onClick={() => selectChannel(id_channel, name)}
                onDoubleClick={() => selectChannel(id_channel, name)}
                ischannelselected={isCurrentChannel.toString()}
                onContextMenu={handleContextMenu}
                // To update style whether messages were seen or not
                newmessage={hasSeenLastMessage().toString()}
            >
                {name}
            </StyledChannel>

            {/* Menu to delete the clicked channel
            This menu is accessible only if the user is Admin or Owner
            It is a "right clic" menu.
            */}
            {hasPower && (
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? {
                                  top: contextMenu.mouseY,
                                  left: contextMenu.mouseX,
                              }
                            : undefined
                    }
                >
                    <MenuItem
                        onClick={() =>
                            deleteChannel(id_channel, currentServer?.id)
                        }
                    >
                        <ListItemIcon>
                            <DeleteForever style={{ color: 'red' }} />
                        </ListItemIcon>
                        <Typography>
                            <span style={{ color: 'red' }}>Supprimer : </span>
                            <b>{name}</b>
                        </Typography>
                    </MenuItem>
                </Menu>
            )}
        </>
    )
}

ChannelName.propTypes = {
    id_channel: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    seen: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    ),
    lastMessageData: PropTypes.exact({
        lastMessage: PropTypes.string,
        lastMessageImg: PropTypes.string,
        lastMessageUser: PropTypes.string,
    }),
}

export default ChannelName

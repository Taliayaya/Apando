import { DeleteForever } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { deleteChannel } from '../../utils/function'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import { StyledChannel } from '../ChannelList/ChannelListStyle'

const ChannelName = ({ id_channel, name, seen, lastMessageData }) => {
    const { setMessageList } = useMessageList()
    const { setCurrentChannelId, currentChannelId, currentServer } =
        useChannel()
    const [contextMenu, setContextMenu] = useState(null)
    const { userRole } = useAuth()
    const user = getAuth().currentUser

    const hasPower = ['Admin', 'Owner'].includes(userRole)

    const handleContextMenu = (e) => {
        e.preventDefault()
        setContextMenu(
            contextMenu === null
                ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 }
                : null
        )
    }

    const handleClose = () => {
        setContextMenu(null)
    }

    const currentChannel = currentChannelId.id === id_channel

    const selectChannel = (id_channel, name) => {
        setCurrentChannelId({ id: id_channel, name: name })
        setMessageList([])
    }

    const hasSeenLastMessage = () => {
        if (seen && seen[user.uid]) {
            return true
        }
        return false
    }

    return (
        <>
            <StyledChannel
                onClick={() => selectChannel(id_channel, name)}
                onDoubleClick={() => selectChannel(id_channel, name)}
                ischannelselected={currentChannel.toString()}
                onContextMenu={handleContextMenu}
                newmessage={hasSeenLastMessage().toString()}
            >
                {name}
            </StyledChannel>

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

export default ChannelName

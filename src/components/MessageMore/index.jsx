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

import { ListItemIcon, MenuItem, Typography } from '@mui/material'
import { useAuth, useChannel, useMessage } from '../../utils/hooks'
import { StyledMessageMoreMenu } from './/MessageMoreStyle'
import ReplyIcon from '@mui/icons-material/Reply'
import { DeleteForever } from '@mui/icons-material'
import { getDatabase, ref, remove } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { updateMessageCount } from '../../utils/function'
import PropTypes from 'prop-types'

const MessageMore = ({ id, message, id_channel, uid }) => {
    const db = getDatabase()
    const { setMessage } = useMessage()
    const { userRole } = useAuth()
    const user = getAuth().currentUser
    const { currentServer } = useChannel()

    // We wants these role to have the power to delete messages.
    // I have brought peace, freedom, justice, and security to my new Empire
    const hasPower =
        ['Admin', 'Délégué', 'Owner'].includes(userRole) || uid === user.uid

    /**
     * If an user has the right to do so, it delete THIS message
     * from the channel. By the same occasion, it reduce by 1 the total
     * number of message sent. Seems fair... right ?
     */
    const handleDelete = () => {
        const messageRef = ref(db, 'messages/' + id_channel + '/' + id)
        remove(messageRef)
        updateMessageCount(currentServer?.id, id_channel, -1)
    }
    return (
        <StyledMessageMoreMenu>
            {/* If an user has the right, this special interaction
            allows him to delete THIS message */}
            {hasPower && (
                <MenuItem
                    onClick={() => handleDelete()}
                    style={{ color: 'red' }}
                >
                    <ListItemIcon>
                        <DeleteForever />
                    </ListItemIcon>
                    <Typography>Supprimer</Typography>
                </MenuItem>
            )}
            {/* by clicking on it, it replies to the message.
            Right now, it only does a quote about the previous one.
            Improving this would be adding a Go-To message system instead
            */}
            <MenuItem onClick={() => setMessage(`> ${message} \n\n`)}>
                <ListItemIcon>
                    <ReplyIcon />
                </ListItemIcon>
                <Typography>Répondre</Typography>
            </MenuItem>
        </StyledMessageMoreMenu>
    )
}

MessageMore.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string,
    id_channel: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

export default MessageMore

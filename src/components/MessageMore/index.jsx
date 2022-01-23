import { ListItemIcon, MenuItem, Typography } from '@mui/material'
import { useAuth, useMessage } from '../../utils/hooks'
import { StyledMessageMoreMenu } from './MessageMoreStyle'
import ReplyIcon from '@mui/icons-material/Reply'
import { DeleteForever } from '@mui/icons-material'
import { getDatabase, ref, remove } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const MessageMore = ({ id, message, id_channel, uid }) => {
    const db = getDatabase()
    const { setMessage } = useMessage()
    const { userRole } = useAuth()
    const user = getAuth().currentUser

    const hasPower =
        ['Admin', 'Délégué', 'Owner'].includes(userRole) || uid === user.uid

    const handleDelete = () => {
        const messageRef = ref(db, 'messages/' + id_channel + '/' + id)
        remove(messageRef)
    }
    return (
        <StyledMessageMoreMenu>
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
            <MenuItem onClick={() => setMessage(`> ${message} \n\n`)}>
                <ListItemIcon>
                    <ReplyIcon />
                </ListItemIcon>
                <Typography>Répondre</Typography>
            </MenuItem>
        </StyledMessageMoreMenu>
    )
}

export default MessageMore

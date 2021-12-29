import { useApi, useMessage } from '../../utils/hooks'
import { API_DELETE_MESSAGE } from '../../utils/paths'
import { StyledMessageMoreMenu } from './MessageMoreStyle'

const MessageMore = ({ id, message }) => {
    const { sender } = useApi()
    const handleDelete = async () => {
        const deleteFormData = new FormData()
        deleteFormData.append('id_message', id)
        console.log(deleteFormData)
        const deleted = await sender(API_DELETE_MESSAGE, deleteFormData)
        console.log(deleted)
    }
    const { setMessage } = useMessage()

    return (
        <StyledMessageMoreMenu>
            <button onClick={() => handleDelete()}>Supprimer</button>
            <button onClick={() => setMessage(`> ${message}`)}>Répondre</button>
        </StyledMessageMoreMenu>
    )
}

export default MessageMore

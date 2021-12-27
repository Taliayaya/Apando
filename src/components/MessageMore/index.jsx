import { useApi, useMessage } from '../../utils/hooks'
import { API_DELETE_MESSAGE } from '../../utils/paths'

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
        <>
            <button onClick={() => handleDelete()}>Supprimer</button>
            <button onClick={() => setMessage(`> ${message}`)}>Répondre</button>
        </>
    )
}

export default MessageMore

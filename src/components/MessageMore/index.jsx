import { useApi } from '../../utils/hooks'
import { API_DELETE_MESSAGE } from '../../utils/paths'

const MessageMore = (id) => {
    console.log(id.id)
    const { sender } = useApi()
    const handleDelete = async () => {
        const deleteFormData = new FormData()
        deleteFormData.append('id_message', id.id)
        console.log(deleteFormData)
        const deleted = await sender(API_DELETE_MESSAGE, deleteFormData)
        console.log(deleted)
    }

    return (
        <>
            <button onClick={() => handleDelete()}>Supprimer</button>
        </>
    )
}

export default MessageMore

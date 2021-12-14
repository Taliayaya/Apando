import {
    StyledChat,
    StyledChatInput,
    StyledChatMessage,
    StyledChatTextarea,
} from './ChatStyle'
import { useEffect, useState, useRef } from 'react'
import { useApi, useChannel, useData } from '../../utils/hooks'
import Message from '../Message'

const API_GET_MESSAGE = 'http://localhost/API/load_messages.php'
const API_SEND_MESSAGE = 'http://localhost/API/send_message.php'

function Chat() {
    const [messageList, setMessageList] = useState([])
    const { sender } = useApi()
    const [message, setMessage] = useState('')
    const messageEndRef = useRef(null)
    const { currentChannelId } = useChannel()
    const { userData } = useData()

    console.log(userData)
    useEffect(() => {
        const loadMessage = setInterval(async () => {
            const loadFormData = new FormData()
            loadFormData.append('currentChannel', currentChannelId.id)
            const fetchMessage = await sender(API_GET_MESSAGE, loadFormData)
            const message_list = fetchMessage?.messages_list
            message_list.reverse()
            if (message_list?.length !== messageList?.length) {
                console.log(message_list)
                setMessageList(message_list)
                // Scroll en bas dès un nouveau message
                messageEndRef.current?.scrollIntoView()
            }
        }, 2500)
        return () => clearInterval(loadMessage)
    }, [messageList?.length, sender, currentChannelId.id])
    useEffect(() => {
        const loadMessage = async () => {
            const loadFormData = new FormData()
            loadFormData.append('currentChannel', currentChannelId.id)
            const fetchMessage = await sender(API_GET_MESSAGE, loadFormData)
            const message_list = fetchMessage?.messages_list
            console.log(1)
            message_list.reverse()
            if (message_list?.length !== messageList?.length) {
                setMessageList(message_list)
                // Scroll en bas dès un nouveau message
                messageEndRef.current?.scrollIntoView()
            }
        }
        return loadMessage()
    }, [messageList?.length, sender, currentChannelId.id])

    // Permet de scroll en bas du chat dès qu'on commence à écrire un message
    useEffect(() => {
        console.log(messageEndRef)
        messageEndRef.current?.scrollIntoView()
    }, [message])

    console.log(messageList)
    async function handleSubmit(e) {
        const keyCode = e.which || e.keyCode
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            const sendFormData = new FormData()
            sendFormData.append('message', message)
            sendFormData.append('user_id', userData.id)
            sendFormData.append('id_channel', currentChannelId.id)
            const sendMessage = await sender(API_SEND_MESSAGE, sendFormData)
            sendMessage?.sent && setMessage('')
        }
    }

    return (
        <StyledChat>
            <StyledChatMessage>
                {messageList.map(
                    ({ id_message, message, message_date, pseudo, avatar }) => {
                        return (
                            <Message
                                key={id_message}
                                username={
                                    pseudo ? pseudo : 'Utilisateur supprimé'
                                }
                                message={message}
                                timestamp={message_date}
                                avatar={avatar}
                            />
                        )
                    }
                )}

                <div ref={messageEndRef} />
            </StyledChatMessage>

            <StyledChatInput>
                <form>
                    <StyledChatTextarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Écrivez dans le salon ${currentChannelId.name}`}
                        onKeyDown={(e) => handleSubmit(e)}
                    ></StyledChatTextarea>
                </form>
            </StyledChatInput>
        </StyledChat>
    )
}
export default Chat

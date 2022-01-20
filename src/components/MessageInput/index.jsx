import { StyledChatInput, StyledChatTextarea } from '../Chat/ChatStyle'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { Send } from '@material-ui/icons'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useMessage } from '../../utils/hooks'
import { writeUserMessage } from './function'

const StyledSend = styled(Send)`
    background-color: ${colors.channelList_bg_color};
    padding: 10px;
    border-radius: 60px;
    cursor: pointer;

    @media screen and (min-width: 720px) {
        display: none !important;
    }
`

const MessageInput = ({ currentChannelId }) => {
    const { message, setMessage } = useMessage()
    const user = getAuth().currentUser

    const handleSending = async () => {
        if (message.trim().length > 0) {
            try {
                // const data = {
                //     message: message,
                //     id_channel: currentChannelId.id,
                //     timestamp: Timestamp.fromDate(new Date()),
                //     user: {
                //         uid: user.uid,
                //         displayName: user.displayName,
                //         photoURL: user.photoURL,
                //     },
                // }
                writeUserMessage(user, message, currentChannelId.id)
                // const messageRef = doc(collection(db, 'messages'))
                setMessage('')
                // await setDoc(messageRef, data)
                // const messageListTemp = messageList
                // messageListTemp.push({
                //     id: Timestamp.fromDate(new Date()),
                //     data: data,
                // })
                // setMessageList(messageListTemp)
                // console.log(messageListTemp)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleSubmit = (e) => {
        const keyCode = e.which || e.keyCode
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            handleSending()
        }
    }
    return (
        <StyledChatInput>
            <form>
                <StyledChatTextarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                        currentChannelId?.data
                            ? `Écrivez dans le salon ${currentChannelId?.data?.channelName}`
                            : `Choisissez un salon pour commencer à discuter.`
                    }
                    onKeyDown={(e) => handleSubmit(e)}
                    disabled={currentChannelId?.data in window}
                ></StyledChatTextarea>
            </form>
            {message.trim().length > 0 && (
                <StyledSend onClick={() => handleSending()} />
            )}
        </StyledChatInput>
    )
}

export default MessageInput

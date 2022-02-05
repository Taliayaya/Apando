import { StyledChatInput, StyledChatTextarea } from '../Chat/ChatStyle'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { Send } from '@material-ui/icons'
import { useAuth, useMessage } from '../../utils/hooks'
import { writeUserMessage } from '../../utils/function'
import { styled } from '@mui/material'
import { StyleMobileSendingContainer } from './StyleMessageInput'

const StyledSend = styled(Send)(() => ({
    position: 'relative',
    margin: '0',
}))

const MessageInput = ({ currentChannelId }) => {
    const { message, setMessage } = useMessage()
    const user = getAuth().currentUser
    const { userRole } = useAuth()

    const handleSending = async () => {
        if (message.trim().length > 0 && userRole !== 'Muted') {
            try {
                writeUserMessage(user, message, currentChannelId.id)
                setMessage('')
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

    const placeholder =
        userRole === 'Muted'
            ? 'Vous avez été bloqué par un administrateur. Par conséquent, vous ne pouvez plus envoyer de messages tant que vous ne serez pas débloqué.'
            : currentChannelId?.name
            ? `Écrivez dans le salon ${currentChannelId?.name}`
            : `Choisissez un salon pour commencer à discuter.`

    return (
        <>
            <StyledChatInput>
                <form>
                    <StyledChatTextarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder}
                        onKeyDown={(e) => handleSubmit(e)}
                        disabled={currentChannelId?.name in window}
                        rows="1"
                    ></StyledChatTextarea>
                </form>
                {message.trim().length > 0 && (
                    <StyleMobileSendingContainer>
                        <StyledSend
                            sx={{ fontSize: '80px' }}
                            onClick={() => handleSending()}
                        />
                    </StyleMobileSendingContainer>
                )}
            </StyledChatInput>
        </>
    )
}

export default MessageInput

import { StyledChatInput, StyledChatTextarea } from '../Chat/ChatStyle'
import React, {useRef} from 'react'
import { getAuth } from 'firebase/auth'
import { Send } from '@material-ui/icons'
import styled from 'styled-components'
import { theme } from '../../utils/style/colors'
import { useAuth, useMessage } from '../../utils/hooks'
import { writeUserMessage } from '../../utils/function'
//For the upload icon
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useState } from 'react'

const StyledSend = styled(Send)`
    background-color: ${theme.sides_bg_color};
    padding: 10px;
    border-radius: 60px;
    cursor: pointer;

    @media screen and (min-width: 720px) {
        display: none !important;
    }
`

const UploadIcon = ({ success, onFileSelectError, onFileSelectSuccess  }) => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null)

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click()
    }
	// Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0]
        if (fileUploaded.size > 10 ** 7)
            onFileSelectError({ error: fileUploaded.size })
        else onFileSelectSuccess(fileUploaded)
    }
	return (
		<>
		<FileUploadIcon
			onClick={(e) => handleClick(e)}
		 />
		<input
			type="file"
			ref={hiddenFileInput}
			onChange={handleChange}
			style={{ display: 'none' }}
		/>
		</>
	)}

const MessageInput = ({ currentChannelId }) => {
    const [success, setSuccess] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const { logout, resetPassword } = useAuth()

    const { message, setMessage } = useMessage()
    const user = getAuth().currentUser
    const { userRole } = useAuth()

    const handleSending = async () => {
        if (message.trim().length > 0 && userRole !== 'Muted') {
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
			<UploadIcon
				onFileSelectSuccess={(file) =>
					setSelectedFile(file)
				}
				onFileSelectError={({ error }) => alert(error)}
				selectedFile={selectedFile}
				success={success}
			/>
                <StyledChatTextarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={placeholder}
                    onKeyDown={(e) => handleSubmit(e)}
                    disabled={currentChannelId?.name in window}
                ></StyledChatTextarea>
            </form>
            {message.trim().length > 0 && (
                <StyledSend onClick={() => handleSending()} />
            )}
        </StyledChatInput>
		</>
    )
}

export default MessageInput

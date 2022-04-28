import { StyledChatInput, StyledChatTextarea } from '../Chat/ChatStyle'
import React, { useRef } from 'react'
import { getAuth } from 'firebase/auth'
import { Send } from '@material-ui/icons'
import { useAuth, useMessage } from '../../utils/hooks'
import { writeUserMessage } from '../../utils/function'
import { styled } from '@mui/material'
import { StyleMobileSendingContainer } from './StyleMessageInput'
// For the files tray
import { Stack, Badge, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

//For the upload icon
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useState } from 'react'

const StyledSend = styled(Send)(() => ({
    position: 'relative',
    margin: '0',
}))

const UploadIcon = ({ success, onFileSelectError, onFileSelectSuccess }) => {
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
            <FileUploadIcon onClick={(e) => handleClick(e)} />
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    )
}

const FilesTray = ({ selectedFiles, setSelectedFiles }) => {
    /* Displays a tray on top of the writing zone when files are added to the
     * message, and displays each file with its name and a cross to remove it
     * from the selection.
     * Arguments:
     *      selectedFiles: the state of the files, a list containing the files
     *      setSelectedFiles: the state selector of the list of files
     * */
    return (
        <Stack direction="row" spacing={2}>
            {selectedFiles.map((file) => (
                <Badge
                    key={file[1]} // Giving a key so react stops complaining
                    badgeContent={<CloseIcon fontSize="small" />}
                    onClick={() => {
                        setSelectedFiles(
                            // Because it's a state, copying the old list
                            // without the removed element into the new state
                            selectedFiles.filter((elt) => elt[1] !== file[1])
                        )
                    }}
                >
                    <Button>{file[1]}</Button>
                </Badge>
            ))}
        </Stack>
    )
}

function giveUniqueName(filename, filelist) {
    /* Gives an unique name a file, that's different from the rest of the
     * list. The storage shouldn't contain same-name files, so this function
     * tries to give the normal name to the file, then tries again with (1)
     * appended to the file name, and increases this number step by step.
     * Arguments:
     *     filename: string, the name of the file to be inserted
     *     filelist: array of files, the files already inserted
     * Returns: The given name to the file
     */
    if (filelist.every((file) => file[1] !== `${filename}`)) {
        return filename
    } else {
        const matching = filename.match(/(.*)(\.[a-zA-Z0-9]*$)/)
        // Gets the name and extension of the file
        var count = 0
        while (++count) {
            const incname =
                matching[1] + '(' + count.toString() + ')' + matching[2]
            if (filelist.every((file) => file[1] !== incname)) {
                return incname
            }
        }
    }
}

const MessageInput = ({ currentChannelId }) => {
    //File-uploading-related values
    const [success, setSuccess] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])

    const { message, setMessage } = useMessage()
    const user = getAuth().currentUser
    const { userRole } = useAuth()

    const handleSending = async () => {
        if (message.trim().length > 0 && userRole !== 'Muted') {
            try {
                writeUserMessage(
                    user,
                    message,
                    currentChannelId.id,
                    selectedFiles
                )
                setMessage('')
                setSelectedFiles([])
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
                        onFileSelectSuccess={(file) => {
                            setSelectedFiles([
                                ...selectedFiles,
                                [
                                    file,
                                    giveUniqueName(
                                        `${file.name}`,
                                        selectedFiles
                                    ),
                                ],
                            ])
                        }}
                        onFileSelectError={({ error }) => alert(error)}
                        selectedFiles={selectedFiles}
                        success={success}
                    />
                    <FilesTray
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
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

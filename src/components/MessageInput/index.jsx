import { StyledChatInput, StyledChatTextarea } from '../Chat/ChatStyle'
import React, { useRef } from 'react'
import { getAuth } from 'firebase/auth'
import SendIcon from '@mui/icons-material/Send'
import { useAuth, useChannel, useMessage } from '../../utils/hooks'
import { updateMessageCount, writeUserMessage } from '../../utils/function'

//For the upload icon
// import FileUploadIcon from '@mui/icons-material/FileUpload'
// import { useState } from 'react'

import { styled } from '@mui/material'
import {
    StyleFileUploadContainer,
    StyleMobileSendingContainer,
} from './/StyleMessageInput'
// For the files tray
import { Stack, Badge, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'

//For the upload icon
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useState } from 'react'

const StyledSend = styled(SendIcon)(() => ({
    position: 'relative',
    margin: '0',
}))

const StyledFileUploadIcon = styled(FileUploadIcon)(() => ({
    cursor: 'pointer',
}))

const StyledCloseIcon = styled(CloseIcon)(() => ({
    cursor: 'pointer',
}))

const UploadIcon = ({
    success,
    onFileSelectError,
    onFileSelectSuccess,
    selectedFiles,
}) => {
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
        const fileSelected = []
        for (let i = 0; i < event.target.files.length; i++) {
            const fileUploaded = event.target.files[i]
            if (fileUploaded.size > 10 ** 7) {
                onFileSelectError({ error: fileUploaded.size })
            } else {
                const name = giveUniqueName(
                    `${fileUploaded?.name}`,
                    selectedFiles
                )
                fileSelected.push([fileUploaded, name])
            }
        }
        onFileSelectSuccess(fileSelected)
    }
    return (
        <>
            <StyleFileUploadContainer>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    multiple
                />
                <Tooltip title="Ajouter des pièces-jointes">
                    <StyledFileUploadIcon
                        onClick={(e) => handleClick(e)}
                        fontSize={'32px'}
                    />
                </Tooltip>
            </StyleFileUploadContainer>
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
                    badgeContent={
                        <Tooltip
                            title="Retirer ce fichier"
                            onClick={() => {
                                setSelectedFiles(
                                    // Because it's a state, copying the old list
                                    // without the removed element into the new state
                                    selectedFiles.filter(
                                        (elt) => elt[1] !== file[1]
                                    )
                                )
                            }}
                        >
                            <StyledCloseIcon fontSize="small" />
                        </Tooltip>
                    }
                >
                    <Button variant="contained">{file[1]}</Button>
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

const MessageInput = ({ currentChannel }) => {
    //File-uploading-related values
    const [success, setSuccess] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])

    const { message, setMessage } = useMessage()
    const user = getAuth().currentUser
    const { userRole } = useAuth()
    const { currentServer } = useChannel()

    const handleSending = async () => {
        if (
            (message.trim().length > 0 || selectedFiles.length > 0) &&
            userRole !== 'Muted'
        ) {
            try {
                writeUserMessage(
                    user,
                    message,
                    currentChannel.id,
                    currentServer?.id,
                    selectedFiles
                )
                updateMessageCount(currentServer?.id, currentChannel.id)
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
            : currentChannel?.name
            ? `Écrivez dans le salon ${currentChannel?.name}`
            : `Choisissez un salon pour commencer à discuter.`

    return (
        <>
            <StyledChatInput>
                <UploadIcon
                    onFileSelectSuccess={(file) => {
                        setSelectedFiles([...selectedFiles, ...file])
                    }}
                    onFileSelectError={({ error }) => alert(error)}
                    selectedFiles={selectedFiles}
                    success={success}
                />
                <form>
                    {selectedFiles.length > 0 && (
                        <FilesTray
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />
                    )}
                    <StyledChatTextarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder}
                        onKeyDown={(e) => handleSubmit(e)}
                        disabled={currentChannel?.name in window}
                        rows="1"
                        maxLength={1000}
                    ></StyledChatTextarea>
                </form>
                {(message.trim().length > 0 || selectedFiles.length > 0) && (
                    <StyleMobileSendingContainer>
                        <StyledSend
                            sx={{ fontSize: '25px' }}
                            onClick={() => handleSending()}
                        />
                    </StyleMobileSendingContainer>
                )}
            </StyledChatInput>
        </>
    )
}

export default MessageInput

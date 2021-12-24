import React, { useRef } from 'react'
import styled from 'styled-components'
import { StyleAlert } from '../../utils/style/LoginSignStyle'
const Button = styled.button`
    outline: none;
    font-size: medium;
    padding: 0 20px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    transition: all 0.3s ease;
    &:focus {
        border-color: #4158d0;
    }
`

const FileUploader = ({
    success,
    selectedFile,
    onFileSelectError,
    onFileSelectSuccess,
}) => {
    console.log(success)
    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null)

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click()
    } // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0]
        console.log(fileUploaded)
        if (fileUploaded.size > 10 ** 7)
            onFileSelectError({ error: fileUploaded.size })
        else onFileSelectSuccess(fileUploaded)
    }
    return (
        <>
            <Button onClick={(e) => handleClick(e)}>
                {selectedFile ? selectedFile?.name : <>Changer mon avatar</>}
            </Button>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            {success && (
                <StyleAlert success>
                    Votre avatar a bien été modifié !{' '}
                </StyleAlert>
            )}
        </>
    )
}
export default FileUploader

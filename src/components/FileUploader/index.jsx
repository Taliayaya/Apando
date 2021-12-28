import React, { useRef } from 'react'
import { AVATAR_PATH } from '../../utils/paths'
import { useData } from '../../utils/hooks'
import Avatar from '@mui/material/Avatar'
import { styled } from '@material-ui/styles'
import Badge from '@mui/material/Badge'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import colors from '../../utils/style/colors'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        color: '#fff',
        backgroundColor: '#000',
        width: '30px',
        height: '30px',
    },
    cursor: 'pointer',
    border: `2px solid ${colors.channelList_bg_color}`,
    borderRadius: '60px',
    '&:hover': {
        opacity: 0.6,
        borderColor: '#4158d0',
    },
}))

const FileUploader = ({ success, onFileSelectError, onFileSelectSuccess }) => {
    console.log(success)
    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null)
    const { userData } = useData()

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
            <StyledBadge
                overlap="circular"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                badgeContent={<AddPhotoAlternateIcon />}
            >
                <Avatar
                    src={`${AVATAR_PATH}${userData?.avatar}`}
                    onClick={(e) => handleClick(e)}
                    style={{
                        height: '100px',
                        width: '100px',
                        hover: { borderColor: '#4158d0;' },
                    }}
                />
            </StyledBadge>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    )
}
export default FileUploader

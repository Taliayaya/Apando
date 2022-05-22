// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import React, { useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/system'
import Badge from '@mui/material/Badge'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { theme } from '../../utils/style/colors'
import { getAuth } from 'firebase/auth'

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        color: '#fff',
        backgroundColor: '#000',
        width: '30px',
        height: '30px',
    },
    cursor: 'pointer',
    border: `2px solid ${theme.sides_bg_color}`,
    borderRadius: '60px',
    '&:hover': {
        opacity: 0.6,
        borderColor: '#4158d0',
    },
}))

const FileUploader = ({ success, onFileSelectError, onFileSelectSuccess }) => {
    const auth = getAuth()
    const user = auth.currentUser
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
                    src={user?.photoURL}
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

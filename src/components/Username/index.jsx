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

import Avatar from '@mui/material/Avatar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import {
    StyledUsernameContainer,
    StyledUsername,
    StyledLink,
} from './/UsernameStyle'
import { getAuth } from 'firebase/auth'

/**
 * The bottom right widget showing WHO U ARE.
 * It shows the username, avatar and a button Link to his settings
 */
function Username() {
    const auth = getAuth()
    const user = auth.currentUser
    return (
        <StyledUsernameContainer>
            <Avatar src={user.photoURL} />
            <StyledUsername>{user.displayName}</StyledUsername>
            <StyledLink to="/settings">
                <ManageAccountsIcon fontSize="large" />
            </StyledLink>
        </StyledUsernameContainer>
    )
}

export default Username

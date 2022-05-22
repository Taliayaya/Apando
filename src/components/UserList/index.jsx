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

import { useAuth, useChannel } from '../../utils/hooks'
import CategorieUser from '../CategorieUser'
import {
    StyleUserList,
    StyleUserListTop,
    // StyleUserListTopIcons,
} from './/UserListStyle'
import Username from '../Username'
import { getAuth } from 'firebase/auth'

function UserList() {
    const { currentChannel } = useChannel()
    const auth = getAuth()
    const { showUsers } = useAuth()
    return (
        <StyleUserList showUsers={showUsers ? 'true' : 'false'}>
            <StyleUserListTop>
                <h2># {currentChannel?.name}</h2>
            </StyleUserListTop>
            {/* To add further icons to interact with.
            Currently not an important task
            */}
            {/* <StyleUserListTopIcons></StyleUserListTopIcons> */}
            <div>
                <CategorieUser />
            </div>
            <Username username={auth.currentUser.displayName} />
        </StyleUserList>
    )
}

export default UserList

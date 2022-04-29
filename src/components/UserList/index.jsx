import { useAuth, useChannel } from '../../utils/hooks'
import CategorieUser from '../CategorieUser'
import {
    StyleUserList,
    StyleUserListTop,
    StyleUserListTopIcons,
} from './UserListStyle'
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
            <StyleUserListTopIcons></StyleUserListTopIcons>
            <div>
                <CategorieUser />
            </div>
            <Username username={auth.currentUser.displayName} />
        </StyleUserList>
    )
}

export default UserList

import CategorieUser from '../CategorieUser'
import {
    StyleUserList,
    StyleUserListTop,
    StyleUserListTopIcons,
} from './UserListStyle'

function UserList() {
    return (
        <StyleUserList>
            <StyleUserListTop>
                <h2># Général</h2>
            </StyleUserListTop>
            <StyleUserListTopIcons></StyleUserListTopIcons>
            <CategorieUser />
        </StyleUserList>
    )
}

export default UserList

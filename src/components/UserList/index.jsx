import { useChannel } from '../../utils/hooks'
import CategorieUser from '../CategorieUser'
import {
    StyleUserList,
    StyleUserListTop,
    StyleUserListTopIcons,
} from './UserListStyle'

function UserList() {
    const { currentChannelId } = useChannel()
    return (
        <StyleUserList>
            <StyleUserListTop>
                <h2># {currentChannelId ? currentChannelId.name : 'Vide'}</h2>
            </StyleUserListTop>
            <StyleUserListTopIcons></StyleUserListTopIcons>
            <CategorieUser />
        </StyleUserList>
    )
}

export default UserList

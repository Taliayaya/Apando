import Avatar from '@mui/material/Avatar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useData } from '../../utils/hooks'
import { AVATAR_PATH } from '../../utils/paths'
import {
    StyledUsernameContainer,
    StyledUsername,
    StyledLink,
} from './UsernameStyle'

function Username({ username }) {
    const { userData } = useData()
    return (
        <StyledUsernameContainer>
            <Avatar src={`${AVATAR_PATH}${userData.avatar}`} />
            <StyledUsername>{username}</StyledUsername>
            <StyledLink to="/settings">
                <ManageAccountsIcon fontSize="large" />
            </StyledLink>
        </StyledUsernameContainer>
    )
}

export default Username

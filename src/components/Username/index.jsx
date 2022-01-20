import Avatar from '@mui/material/Avatar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import {
    StyledUsernameContainer,
    StyledUsername,
    StyledLink,
} from './UsernameStyle'
import { getAuth } from 'firebase/auth'

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

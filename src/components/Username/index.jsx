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

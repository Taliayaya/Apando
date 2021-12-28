import Avatar from '@mui/material/Avatar'
import { Settings } from '@material-ui/icons'
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
                <Settings />
            </StyledLink>
        </StyledUsernameContainer>
    )
}

export default Username

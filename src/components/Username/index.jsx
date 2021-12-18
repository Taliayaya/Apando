import { Settings } from "@material-ui/icons"
import { StyledUsernameContainer, StyledUsername, StyledLink } from "./UsernameStyle"

function Username({ username }) {
    return (
        <StyledUsernameContainer>
            <StyledUsername>
                {username}
            </StyledUsername>
            <StyledLink to="/settings">
                <Settings />
            </StyledLink>
        </StyledUsernameContainer>
    )
}

export default Username
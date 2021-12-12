import { Avatar } from '@material-ui/core'
import {
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
} from './MessageStyle'

function Message({ username, timestamp, message }) {
    return (
        <StyledMessage>
            <Avatar />
            <StyledMessageInfo>
                <p>
                    {username}
                    <StyledMessageTimestamp>{timestamp}</StyledMessageTimestamp>
                </p>
                <StyledUserMessage>{message}</StyledUserMessage>
            </StyledMessageInfo>
        </StyledMessage>
    )
}

export default Message

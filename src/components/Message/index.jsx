import { Avatar } from '@material-ui/core'
import {
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
} from './MessageStyle'
import ReactMarkdown from 'react-markdown'

function Message({ username, timestamp, message, avatar }) {
    return (
        <StyledMessage>
            <Avatar
                src={`http://localhost/project-plateforme-api/assets/images/avatars/${avatar}`}
            />
            <StyledMessageInfo>
                <p>
                    {username}
                    <StyledMessageTimestamp>{timestamp}</StyledMessageTimestamp>
                </p>
                <StyledUserMessage>
                    <ReactMarkdown>{message}</ReactMarkdown>
                </StyledUserMessage>
            </StyledMessageInfo>
        </StyledMessage>
    )
}

export default Message

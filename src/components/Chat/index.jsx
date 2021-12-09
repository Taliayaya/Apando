import {
    StyledChat,
    StyledChatInput,
    StyledChatMessage,
    StyledChatTextarea,
} from './ChatStyle'

function Chat() {
    return (
        <StyledChat>
            <StyledChatMessage></StyledChatMessage>

            <StyledChatInput>
                <form>
                    <StyledChatTextarea
                        placeholder={`Écrivez à tous`}
                    ></StyledChatTextarea>
                </form>
            </StyledChatInput>
        </StyledChat>
    )
}
export default Chat

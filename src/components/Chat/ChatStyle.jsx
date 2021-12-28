import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledChat = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.85;
    background-color: ${colors.chat_bg_color};
    height: 100vh;
`

export const StyledChatMessage = styled.div`
    flex: 1;
    overflow-y: scroll;
`

export const StyledChatInput = styled.div`
    color: ${colors.chat_font_color};
    background-color: ${colors.chat_input_bg_color};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-radius: 5px;
    margin: 20px;
    border-top: 1px solid ${colors.channelList_bg_color};
    & > form {
        flex: 1;
    }
`
export const StyledChatTextarea = styled.textarea`
    color: ${colors.chat_font_color};
    padding-left: 15px;
    background: transparent;
    border: none;
    outline-width: 0;
    font-size: large;
    width: 100%;
    font-size: large;
    resize: vertical;
    &:focus {
        outline: none;
        border: none;
        outline-width: 0;
    }
`

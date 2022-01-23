import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

export const StyledChat = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => (props.showUsers ? 'flex: 1;' : 'flex: 0.85;')}
    background-color: ${theme.chat_bg_color};
    height: 100vh;
`

export const StyledChatMessage = styled.div`
    flex: 1;
    overflow-y: scroll;
`

export const StyledChatInput = styled.div`
    color: ${theme.font_color};
    background-color: ${theme.chat_input_bg_color};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-radius: 5px;
    margin: 20px;
    border-top: 1px solid ${theme.sides_bg_color};
    & > form {
        flex: 1;
    }
`
export const StyledChatTextarea = styled.textarea`
    color: #fff;
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
export const ScrollDown = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
    margin: 50px;
    margin-top: -100px;
`

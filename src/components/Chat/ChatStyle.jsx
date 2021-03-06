import styled from 'styled-components'

export const StyledChat = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => (props.shouldresize ? 'flex: 1;' : 'flex: 0.85;')}
    background-color: ${(props) => props.theme.chat_bg_color};
    height: 100vh;
`

export const StyledChatMessage = styled.div`
    flex: 1;
    overflow-y: scroll;

    code {
        max-width: 50vw;
    }
    word-break: break-all;
    white-space: pre-wrap;

    a {
        color: #4879ff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

    table {
        color: ${(props) => props.theme.font_color};
        border: 1px solid ${(props) => props.theme.sides_bg_color};
        font-size: 12pt;
        border-collapse: collapse;
    }
    table thead th,
    table tfoot th {
        color: #777;
        background: rgba(0, 0, 0, 0.1);
    }
    table caption {
        padding: 0.5em;
    }
    table th,
    table td {
        padding: 0.5em;
        border: 1px solid lightgrey;
    }
    max-height: 100vh;
`

export const StyledChatInput = styled.div`
    color: ${(props) => props.theme.font_color};
    display: flex;
    align-items: end;
    justify-content: space-between;
    border-radius: 5px;
    margin: 20px;
    & > form {
        flex: 1;
    }
`
export const StyledChatTextarea = styled.textarea`
    color: #fff;
    padding-left: 15px;
    background: ${(props) => props.theme.chat_input_bg_color};
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
    padding: 10px;
    border-radius: 30px;
    padding-left: 20px;
`
export const ScrollDown = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
    margin-top: -5em;
    margin-left: 80%;
    @media screen and (min-width: 720px) {
        margin-left: 90%;
    }
`

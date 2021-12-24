import styled from 'styled-components'
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background-color: blue;
    }
    ${(props) => (props.repeat ? `padding: 0px 20px;` : `padding: 10px 20px;`)}
`

export const StyledMessage = styled.div`
    display: flex;
    align-items: left;

    color: white;
    justify-content: space-between;
`

export const StyledMessageInfo = styled.div`
    margin-left: 20px;
    font-size: large;
`

export const StyledMessageTimestamp = styled.span`
    color: lightgray;
    margin-left: 20px;
    font-size: x-small;
`

export const StyledUserMessage = styled.span`
    white-space: pre-line;
    font-size: medium;

    blockquote {
        color: #aaa;
        margin: 0;
        padding-left: 3em;
        border-left: 0.5em #aaaaaa solid;
    }
`

import styled from 'styled-components'

export const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;
    &:hover {
        background-color: blue;
    }
`

export const StyledMessageInfo = styled.div`
    margin-left: 20px;
`

export const StyledMessageTimestamp = styled.span`
    color: lightgray;
    margin-left: 20px;
    font-size: x-small;
`

export const StyledUserMessage = styled.span`
    white-space: pre-line;
`

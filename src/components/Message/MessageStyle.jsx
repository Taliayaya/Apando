import ReactPlayer from 'react-player'
import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background-color: #33237f;
    }
    ${(props) =>
        props.repeat === 'true' ? `padding: 0px 20px;` : `padding: 5px 20px;`}
`

const StyledMessage = styled.div`
    display: flex;
    align-items: left;

    color: ${theme.font_color};
    justify-content: space-between;
`

const StyledMessageInfo = styled.div`
    margin-left: 20px;
    font-size: large;
`

const StyledMessageTimestamp = styled.span`
    color: lightgray;
    margin-left: 20px;
    font-size: x-small;
`

const StyledUserMessage = styled.span`
    white-space: pre-line;
    font-size: medium;

    blockquote {
        color: #aaa;
        margin: 0;
        padding-left: 3em;
        border-left: 0.5em #aaaaaa solid;
    }
    img {
        max-width: 25vw;
        max-height: 25vh;
        height: auto;
        width: auto;
        @media screen and (max-width: 720px) {
            ${(props) => props.shouldresize === 'true' && 'max-width: 40vw;'}
        }
        @media screen and (max-width: 480px) {
            max-width: 50vw;
        }
    }
`

const Align = styled.span`
    align-items: center;
`

const StyleReactPlayer = styled(ReactPlayer)`
    max-width: 25vw;
    max-height: 25vh;

    @media screen and (max-width: 720px) {
        max-width: 40vw;
    }
    @media screen and (max-width: 480px) {
        max-width: 50vw;
    }
`

export {
    Align,
    Container,
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
    StyleReactPlayer,
}

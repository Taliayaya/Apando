import { theme } from '../../utils/style/colors'
import styled from 'styled-components'

export const StyleUser = styled.p`
    padding-left: 20px;
    font-weight: normal;
    font-size: medium;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${(props) =>
        props.online ? 'green' : `opacity: 0.2; color: ${theme.font_color}`};
`

export const StyledDiv = styled.div`
    display: flex;
    padding: 10px;
    &:hover {
        background-color: rgb(34, 22, 89);
        opacity: 0.2;
    }
`

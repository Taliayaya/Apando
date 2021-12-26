import colors from '../../utils/style/colors'
import styled from 'styled-components'

export const StyleUser = styled.p`
    padding-left: 20px;
    font-weight: normal;
    font-size: medium;
    color: ${(props) =>
        props.online
            ? 'green'
            : `opacity: 0.2; color: ${colors.userList_font_color}`};
`

export const StyledDiv = styled.div`
    display: flex;
    padding: 10px;
`

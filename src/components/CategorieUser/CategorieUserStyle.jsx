import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyleCategorie = styled.h4`
    font-weight: bold;
    padding: 10px;
    font-size: larger;
`

export const StyleUser = styled.p`
    padding-left: 20px;
    font-weight: normal;
    font-size: medium;
    color: ${(props) =>
        props.online
            ? 'green'
            : `opacity: 0.2; color: ${colors.userList_font_color}`};
`

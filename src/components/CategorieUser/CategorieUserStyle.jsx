import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

export const ContainerUser = styled.div`
    overflow-y: scroll;
    @media screen and (min-height: 720px) {
        height: 80vh;
    }
    @media screen and (min-height: 680px) and (max-height: 720px) {
        height: 65vh;
    }
    @media screen and (min-height: 480px) and (max-height: 680px) {
        height: 55vh;
    }
    @media screen and (max-height: 480px) {
        height: 40vh;
    }
`
export const StyleCategorie = styled.h4`
    font-weight: bold;
    padding: 10px;
    font-size: medium;
    text-transform: uppercase;
    color: ${theme.userList_font_color};
`

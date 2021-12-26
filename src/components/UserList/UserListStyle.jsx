import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyleUserList = styled.div`
    background-color: ${colors.userList_top_bg_color};
    display: flex;
    flex-direction: column;
    flex: 0.15;
    overflow: scroll;
    height: 100vh;
    position: relative;
    margin: 0;
    @media screen and (max-width: 720px) {
        display: none;
    }
`

export const StyleUserListTop = styled.div`
    background-color: ${colors.userList_top_bg_color};
    align-items: center;
    padding: 20px;
    color: ${colors.userList_font_color};
    border-bottom: 2px solid gray;
`

export const StyleUserListTopIcons = styled.div`
    background-color: ${colors.userList_top_bg_color};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.userList_font_color};
`

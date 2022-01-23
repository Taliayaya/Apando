import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

export const StyleUserList = styled.div`
    background-color: ${theme.sides_bg_color};
    display: flex;
    flex-direction: column;
    flex: 0.15;
    height: 100vh;
    position: relative;
    margin: 0;
    ${(props) => (props.showUsers === 'true' ? `` : 'display: none;')}
`

export const StyleUserListTop = styled.div`
    background-color: ${theme.menus_bg_color};
    align-items: center;
    padding: 20px;
    color: ${theme.font_color};
    border-bottom: 2px solid ${theme.border_color};
`

export const StyleUserListTopIcons = styled.div`
    background-color: ${theme.menus_bg_color};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.sides_font_color};
`

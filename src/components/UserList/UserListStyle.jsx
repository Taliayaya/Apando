import styled from 'styled-components'

export const StyleUserList = styled.div`
    background-color: ${(props) => props.theme.sides_bg_color};
    display: flex;
    flex-direction: column;
    flex: 0.15;
    height: 100vh;
    position: relative;
    margin: 0;
    ${(props) => (props.showUsers === 'true' ? `` : 'display: none;')}

    @media screen and (max-width: 480px) {
        max-width: 25vh;
    }
`

export const StyleUserListTop = styled.div`
    background-color: ${(props) => props.theme.menus_bg_color};
    align-items: center;
    padding: 20px;
    color: ${(props) => props.theme.font_color};
    border-bottom: 2px solid ${(props) => props.theme.border_color};
`

export const StyleUserListTopIcons = styled.div`
    background-color: ${(props) => props.theme.menus_bg_color};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.sides_font_color};
`

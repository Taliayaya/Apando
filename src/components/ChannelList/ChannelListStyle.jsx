import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

export const StyledChannelList = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => (props.showChannel === 'true' ? '' : 'display: none;')}
    flex: 0.15;
    height: 100vh;
    background-color: ${theme.sides_bg_color};
`

export const StyledChannelListTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    ${(props) =>
        props.hovered &&
        `
    background-color: #241172;
    border: 1px solid ${theme.sides_font_color};`}

    color: ${theme.sides_font_color};
    border-bottom: 3px solid ${theme.border_color};
`

export const StyledChannelListBottom = styled.div`
    padding: 20px;
    overflow-y: scroll;
`
export const StyledChannel = styled.div`
    padding-bottom: 10px;
    ${(props) =>
        props.Selected
            ? `
color: ${theme.sides_font_color};
font-size: larger;
border-top: ${theme.sides_font_color} 1px dotted;`
            : `
color: #999999;
&:hover {
    cursor: pointer;
    color: ${theme.sides_font_color};
    font-size: large;
}`}
`
export const StyledInput = styled.input`
    width: 100%;
`

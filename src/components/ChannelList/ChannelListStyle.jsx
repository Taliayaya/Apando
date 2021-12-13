import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledChannelList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.15;
    height: 100vh;
    background-color: ${colors.channelList_bg_color};
`

export const StyledChannelListTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    color: ${colors.channelList_font_color};

    border-bottom: 3px solid purple;
`

export const StyledChannelListBottom = styled.div`
    padding-left: 20px;
    padding-bottom: 20px;
    overflow-y: scroll;
`
export const StyledChannel = styled.div`
    padding-bottom: 10px;
    ${(props) =>
        props.Selected
            ? `
color: ${colors.channelList_font_color};
font-size: larger;
border-top: ${colors.channelList_font_color} 1px dotted;`
            : `
color: #999999;
&:hover {
    cursor: pointer;
    color: ${colors.channelList_font_color};
    font-size: large;
}`}
`
import styled from 'styled-components'
import { MoreVert } from '@mui/icons-material'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'

const Container = styled.div`
    background-color: ${(props) => props.theme.top_menu_bg_color};
    width: 100%;
    max-width: 360px;
    border-radius: 20px;
    margin: 1em;
`
const Name = styled.h2`
    color: ${(props) => props.theme.font_color};
    cursor: pointer;
`

const SMoreVert = styled(MoreVert)`
    color: ${(props) => props.theme.userList_font_color};
`

const ChipTitle = styled.div`
    color: ${(props) => props.theme.font_color};
    margin-bottom: 1em;
`
const TitleAndAddContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const ChipStack = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const CollectionIcon = styled(CollectionsBookmarkIcon)`
    color: ${(props) => props.theme.font_color};
`

export {
    Container,
    Name,
    SMoreVert,
    ChipTitle,
    ChipStack,
    TitleAndAddContainer,
    CollectionIcon,
}

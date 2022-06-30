import { AddCircleOutlineRounded } from '@mui/icons-material'
import styled from 'styled-components'

const CollectionsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    overflow-y: scroll;
    height: 50vh;
`

const BreadText = styled.p`
    color: ${(props) => props.theme.userList_font_color};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
        text-underline-offset: 4px;
    }
`

const AddCollectionDiv = styled.div`
    background-color: ${(props) => props.theme.top_menu_bg_color};
    width: 100%;
    max-width: 360px;
    border-radius: 20px;
    margin: 1em;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.chat_bg_color};
    }
`

const AddRoundedStyle = styled(AddCircleOutlineRounded)`
    color: ${(props) => props.theme.font_color};
`

export { CollectionsContainer, BreadText, AddCollectionDiv, AddRoundedStyle }

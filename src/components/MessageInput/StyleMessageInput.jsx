import styled from 'styled-components'

const StyleMobileSendingContainer = styled.div`
    background-color: ${(props) => props.theme.sides_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 8px;
    align-items: center;
    justify-content: center;
    margin: 0 10px 10px;

    @media screen and (min-width: 720px) {
        display: none !important;
    }
`

const StyleFileUploadContainer = styled.div`
    background-color: ${(props) => props.theme.sides_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 6px 8px;
    margin: 0 10px 10px;
`

export { StyleMobileSendingContainer, StyleFileUploadContainer }

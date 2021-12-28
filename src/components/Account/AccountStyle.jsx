import styled from 'styled-components'
import colors from '../../utils/style/colors'
export const StyledBody = styled.div`
    background-color: ${colors.channelList_bg_color};
    align-items: center;
    justify-content: center;
    margin: 0;
    text-align: center;
    color: #fff
    width: 100%;
    min-height: 90vh;
    height: 100%;
    position: relative;
    background-size: cover;
    padding: 50px;
`

export const StyledCompte = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    background-color: ${colors.chat_bg_color};
    border-radius: 25px;
    width: 380px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    padding: 20px;
`
export const StyledField = styled.p`
    text-transform: uppercase;
    font-size: medium;
    font-weight: 600;
`

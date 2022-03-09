import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

const DashboardBackground = styled.div`
    color: ${theme.font_color}
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-size: cover;
    background: rgb(63, 94, 251);
    background: radial-gradient(
        circle,
        ${theme.sides_bg_color} 0%,
        ${theme.chat_input_bg_color} 80%
    );
`
const DashboardMain = styled.div`
    margin-left: 15%;
    padding-top: 5%;
    margin-right: 15%;
`

const DashboardTitle = styled.div`
    font-size: large;
    color: ${theme.font_color};
    padding: 10px;
`

const ServerStatsContainer = styled.div`
    color: ${theme.font_color};
    display: flex;
    flex-direction: row;
    background-color: ${theme.sides_bg_color};
    border-radius: 30px;
    padding: 15px;
    justify-content: space-around;
`

const NumberCase = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100px;
    padding: 10px;
    background-color: ${theme.chat_bg_color};
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    line-height: 40px;
    margin: 0 15px;

    @media screen and (max-width: 480px) {
        width: 100px;
    }
`

const ParamsCase = styled.div`
    background-color: ${theme.menus_bg_color};
`

const MemberListCase = styled.div``
export {
    DashboardBackground,
    DashboardTitle,
    DashboardMain,
    ServerStatsContainer,
    NumberCase,
    ParamsCase,
}

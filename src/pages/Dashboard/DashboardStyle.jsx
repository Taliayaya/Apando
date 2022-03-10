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
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 0 15px ${theme.menus_bg_color};
    }
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

    transition: all 0.3s;

    @media screen and (max-width: 480px) {
        width: 100px;
    }

    &:hover {
        box-shadow: 0 0 15px ${theme.chat_input_bg_color};
        background-color: ${theme.chat_input_bg_color};
    }
`

const ParamsCase = styled.div`
    background-color: ${theme.menus_bg_color};
    width: 40%;
    margin: 40px 0;
    border-radius: 15px;
    padding: 20px;
    color: ${theme.font_color};
    line-height: 40px;
    @media screen and (max-width: 480px) {
        width: 100%;
    }
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 0 15px ${theme.sides_bg_color};
    }
`
const Params = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    color: #aaa;
    line-height: 30px;
    background-color: ${theme.sides_bg_color};
    padding: 20px;
    margin: 10px 0;
    border-radius: 30px;
    transition: all 0.3s ease;
    &:hover {
        color: ${theme.font_color};
        background-color: ${theme.chat_bg_color};
    }
`

const ParamsHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const StyleEditContainer = styled.div`
    background-color: ${theme.chat_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 4px;
    align-items: center;
    justify-content: center;
    color: ${theme.font_color};

    transition: all 0.3s ease;
    &:hover {
        ${(props) =>
            props.isediting === 'true'
                ? `background-color: 	#FF6666;`
                : `background-color: ${theme.chat_input_bg_color};`}
    }
    &:focus {
    }
`
const StyledOption = styled.option`
    color: ${theme.font_color};
    background-color: ${theme.chat_input_bg_color};
`

const MemberListCase = styled.div``

export {
    DashboardBackground,
    DashboardTitle,
    DashboardMain,
    ServerStatsContainer,
    NumberCase,
    ParamsCase,
    Params,
    ParamsHeader,
    StyleEditContainer,
    StyledOption,
}

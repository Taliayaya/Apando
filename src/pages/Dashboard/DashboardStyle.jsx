import { Done } from '@mui/icons-material'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'

const StyledEditIcon = styled(EditIcon)`
    color: ${(props) => props.theme.font_color};
`
const StyledEditOffIcon = styled(EditOffIcon)`
    color: ${(props) => props.theme.font_color};
`

const DashboardBackgrounds = styled.div`
    color: ${(props) => props.theme.font_color};
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-size: cover;
    background: rgb(63, 94, 251);
    background: radial-gradient(
        circle,
        ${(props) => props.theme.sides_bg_color} 0%,
        ${(props) => props.theme.chat_input_bg_color} 80%
    );
`
const DashboardMain = styled.div`
    margin-left: 15%;
    padding-top: 5%;
    margin-right: 15%;
    z-index: 999;
    position: relative;
`

const Row2 = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 720px) {
        flex-direction: column;
    }
`

const DashboardTitle = styled.div`
    position: relative;
    font-size: large;
    color: ${(props) => props.theme.font_color};
    padding: 10px;
`

const ServerStatsContainer = styled.div`
    color: ${(props) => props.theme.font_color};
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.theme.sides_bg_color};
    border-radius: 30px;
    padding: 15px;
    justify-content: space-around;
    transition: all 0.3s ease;
    height: 100%;
    &:hover {
        box-shadow: 0 0 15px ${(props) => props.theme.menus_bg_color};
    }
    box-shadow: 0px 13px 30px 23px rgba(0, 0, 0, 0.2);
`

const NumberCase = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100px;
    padding: 10px;
    background-color: ${(props) => props.theme.chat_bg_color};
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
        box-shadow: 0 0 15px ${(props) => props.theme.chat_input_bg_color};
        background-color: ${(props) => props.theme.chat_input_bg_color};
    }
`

const ParamsCase = styled.div`
    background-color: ${(props) => props.theme.menus_bg_color};
    width: 40%;
    margin: 40px 0;
    border-radius: 15px;
    padding: 20px;
    color: ${(props) => props.theme.font_color};
    line-height: 40px;
    @media screen and (max-width: 720px) {
        width: 100%;
    }
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 0 15px ${(props) => props.theme.sides_bg_color};
    }
    box-shadow: 0px 33px 40px 33px rgba(0, 0, 0, 0.2);
`
const Params = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    color: #aaa;
    line-height: 30px;
    background-color: ${(props) => props.theme.sides_bg_color};
    padding: 20px;
    margin: 10px 0;
    border-radius: 30px;
    transition: all 0.3s ease;
    &:hover {
        color: ${(props) => props.theme.font_color};
        background-color: ${(props) => props.theme.chat_bg_color};
    }
`

const ParamsHeader = styled.div`
    color: #bbb;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const StyleEditContainer = styled.div`
    background-color: ${(props) => props.theme.chat_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 4px;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.font_color};

    transition: all 0.3s ease;
    &:hover {
        ${(props) =>
            props.isediting === 'true'
                ? `background-color: 	#FF6666;`
                : `background-color: ${(props) =>
                      props.theme.chat_input_bg_color};`}
    }
`
const StyledOption = styled.option`
    color: ${(props) => props.theme.font_color};
    background-color: ${(props) => props.theme.chat_input_bg_color};
`

const MemberListCase = styled.div`
    width: 70%;
    margin: 40px 0;
    margin-left: 40px;
    border-radius: 15px;
    padding: 20px;
    transition: all 0.3s ease;
    background-color: ${(props) => props.theme.menus_bg_color};
    &:hover {
        box-shadow: 0 0 15px ${(props) => props.theme.sides_bg_color};
    }
    box-shadow: 0px 33px 40px 33px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 720px) {
        width: 100%;
        margin-left: 0;
    }
`
const StyledDiv = styled.div`
    position: relative;
    width: 100%;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
    padding: 10px;
    ${(props) =>
        props.invite === 'true'
            ? `background-color:rgb(42, 102, 42);`
            : `background-color: ${props.theme.sides_bg_color};`}
    margin: 10px 0;
    border-radius: 30px;
    transition: all 0.3s ease;
    align-items: center;
    overflow: hidden;
    justify-content: space-between;
    z-index: 0;

    &:active::after {
        opacity: 0;
    }

    &:hover {
        color: ${(props) => props.theme.font_color};
        ${(props) =>
            props.invite === 'true'
                ? `background-color:rgb(62, 143, 62);`
                : `background-color: ${props.theme.chat_bg_color};`}
    }
    @media screen and (min-width: 1080px) {
        width: 40%;
    }
    /* Shine */
    ${(props) =>
        props.invite === 'true' &&
        `&:after {
        content: '';
        top: 0;
        transform: translateX(100%);
        width: 100%;
        height: 220px;
        position: absolute;
        z-index: 1;
        animation: slide 3s infinite;

        /* 
  CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/ 
  */
        background: -moz-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* FF3.6+ */
        background: -webkit-gradient(
            linear,
            left top,
            right top,
            color-stop(0%, rgba(255, 255, 255, 0)),
            color-stop(50%, rgba(255, 255, 255, 0.2)),
            color-stop(99%, rgba(128, 186, 232, 0)),
            color-stop(100%, rgba(125, 185, 232, 0))
        ); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* Opera 11.10+ */
        background: -ms-linear-gradient(
            left,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* IE10+ */
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
        ); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
    }

    /* animation */

    @keyframes slide {
        0% {
            transform: translateX(-100%);
        }
        40% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(100%);
        }
    }`}
`
const MemberListContainer = styled.div`
    display: flex;
    color: #888;
    flex-wrap: wrap;
    @media screen and (min-width: 1080px) {
        flex-direction: row;
        justify-content: space-around;
        max-height: 500px;
        overflow-y: scroll;
    }
    @media screen and (max-width: 1079px) {
        flex-direction: column;

        overflow-y: scroll;
    }
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    justify-content: center;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 10vw;
    @media screen and (max-width: 1400px) {
        max-width: 5vw;
    }
    @media screen and (max-width: 1079px) {
        max-width: 20vw;
    }
`
const UserEmailStyle = styled.span`
    font-size: 'small';
    color: #aaa;
    text-overflow: ellipsis;
`
const StyleUser = styled.span`
    color: ${(props) => props.theme.font_color};
    font-weight: normal;
    font-size: medium;
    margin: 10px 0;
`
const StyleDone = styled(Done)`
    color: ${(props) => props.theme.font_color};
    justify-content: right;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
        background-color: green;
        border-radius: 60px;
    }
    @media screen and (max-width: 480px) {
        margin: 0 20px;
    }
`

const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const MemberHeader = styled.div`
    color: #bbb;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
`

const Separator = styled.hr`
    color: ${(props) => props.theme.chat_bg_color};
    margin: 20px 0;
`

const StyleDoneAllContainer = styled.div`
    background-color: ${(props) => props.theme.chat_bg_color};
    border-radius: 60px;
    cursor: pointer;
    padding: 4px;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.font_color};

    transition: all 0.3s ease;
    &:hover {
        background-color: #388e3c;
    }
`
export {
    DashboardBackgrounds,
    DashboardTitle,
    DashboardMain,
    ServerStatsContainer,
    NumberCase,
    ParamsCase,
    Params,
    ParamsHeader,
    StyleEditContainer,
    StyledOption,
    MemberListCase,
    Row2,
    StyledDiv,
    MemberListContainer,
    UserInfo,
    UserEmailStyle,
    StyleUser,
    StyleDone,
    UserContainer,
    MemberHeader,
    Separator,
    StyleDoneAllContainer,
    StyledEditIcon,
    StyledEditOffIcon,
}

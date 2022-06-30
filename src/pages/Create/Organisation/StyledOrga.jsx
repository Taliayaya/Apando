import styled from 'styled-components'
import { styled as styledMui } from '@mui/material/styles'
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector'

const Wrapper = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.sides_bg_color};
    margin: 0 20%;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 23px 30px 23px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
    z-index: 1;
    &:hover {
        box-shadow: 0px 23px 30px 23px rgba(0, 0, 0, 0.3);
    }
`
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Connector = styledMui(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}))

const StepIconRoot = styledMui('div')(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}))

const Text = styled.p`
    color: ${(props) => props.theme.userList_font_color};
    margin: 20px;
    text-align: center;
`

export { Wrapper, Center, StepIconRoot, Connector, Text }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledLoginWrapper, StyledLoginTitle } from '../Login/LoginSignStyle'
import CustomizedSnackbars from '../../components/CustomizedSnackBar'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@mui/system'
import { theme } from '../../utils/style/colors'
import { getAuth } from 'firebase/auth'

import {
    Alert,
    Box,
    Collapse,
    IconButton,
    Tab,
    Tabs,
    useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Helmet } from 'react-helmet-async'
import Backgrounds from '../../components/Backgrounds'
import Header from '../../components/Header'
import { useAuth } from '../../utils/hooks'
import { ThemeProvider } from 'styled-components'
import Organisation from '../../utils/organisation'
import TabPanel from '../../components/TabPanel'
import SwipeableViews from 'react-swipeable-views'

import JoinServerForm from './JoinServerForm'
import JoinOrgaForm from './joinOrgaForm'

const StyledExitToAppIcon = styled(ExitToAppIcon)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    left: '5em',
    top: '-2em',
    fontSize: 'large',
    zIndex: 999,
    borderRadius: 10,

    '&:hover': {
        opacity: 0.7,
        backgroundColor: '#17094f',
    },

    position: 'relative',
}))
function allyProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Join = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const auth = getAuth()
    const user = auth.currentUser
    const [success, setSuccess] = useState(null)
    const { themeUsed } = useAuth()
    const [tab, setTab] = useState(0)
    const theme = useTheme()
    const [feedback, setFeedback] = useState(null)

    const [orgaArray, setOrgaArray] = useState(null)

    const handleChangeTab = (event, newValue) => {
        setTab(newValue)
        if (newValue === 1 && orgaArray === null) {
            getOrgaArray()
        }
    }
    const getOrgaArray = () => {
        const orga = Organisation.search()
        console.log(orga)
        setOrgaArray(orga)
    }
    const handleChangeIndex = (index) => {
        setTab(index)
        if (index === 1 && orgaArray === null) {
            getOrgaArray()
        }
    }

    return (
        <>
            <Helmet>
                <title>Apando / Rejoindre un serveur</title>
            </Helmet>

            <ThemeProvider theme={themeUsed}>
                <Backgrounds sakura={true}>
                    <Header />
                    <StyledLoginWrapper>
                        <StyledLoginTitle>
                            <span style={{ marginLeft: '30px' }}>Mon code</span>
                            <StyledExitToAppIcon
                                onClick={() => navigate('/app')}
                            />
                        </StyledLoginTitle>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={tab}
                                onChange={handleChangeTab}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                            >
                                <Tab label="Serveurs" {...allyProps(0)} />
                                <Tab label="Organisations" {...allyProps(1)} />
                            </Tabs>
                        </Box>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={tab}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel
                                value={tab}
                                index={0}
                                dir={theme.direction}
                            >
                                <JoinServerForm
                                    setError={setError}
                                    user={user}
                                    setSuccess={setSuccess}
                                />
                            </TabPanel>
                            <TabPanel
                                value={tab}
                                index={1}
                                dir={theme.direction}
                            >
                                <JoinOrgaForm
                                    orgaArray={orgaArray}
                                    setFeedback={setFeedback}
                                />
                            </TabPanel>
                        </SwipeableViews>

                        {/*
                ===============
                ERROR COMPONENT
                ===============
                */}
                        <Collapse in={Boolean(error)}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setError(null)}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                severity="error"
                            >
                                {error}
                            </Alert>
                        </Collapse>

                        <Collapse in={Boolean(success)}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => setError(null)}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                severity="success"
                            >
                                {success}
                            </Alert>
                        </Collapse>
                        {console.log(feedback, !!feedback)}
                        <CustomizedSnackbars
                            open={!!feedback}
                            setOpen={setFeedback}
                            {...feedback}
                        />
                    </StyledLoginWrapper>
                </Backgrounds>
            </ThemeProvider>
        </>
    )
}

export default Join

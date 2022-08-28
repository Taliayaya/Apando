import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledLoginWrapper, StyledLoginTitle } from '../Login/LoginSignStyle'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@mui/system'
import { theme } from '../../utils/style/colors'
import { getAuth } from 'firebase/auth'

import {
    Alert,
    Box,
    Collapse,
    IconButton,
    InputBase,
    List,
    ListItem,
    Paper,
    Tab,
    Tabs,
    Typography,
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
import { Search } from '@mui/icons-material'
import JoinServerForm from './JoinServerForm'

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
    const [search, setSearch] = useState('')
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

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    /**
     * Filter and search organisation as the name is typed
     */
    const filteredSearch =
        orgaArray !== null &&
        orgaArray.filter((orga) => {
            return orga.name.toLowerCase().includes(search.toLocaleLowerCase())
        })
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
                                <Paper
                                    component="form"
                                    x={{
                                        display: 'flex',
                                    }}
                                >
                                    <InputBase
                                        placeholder="Rechercher une Organisation"
                                        inputProps={{
                                            'aria-label': 'search organisation',
                                        }}
                                        sx={{ width: 260 }}
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                    <IconButton
                                        type="button"
                                        sx={{ p: '10px' }}
                                        aria-label="search"
                                        onClick={() =>
                                            search.length > 0 && setSearch('')
                                        }
                                    >
                                        {search.length > 0 ? (
                                            <CloseIcon />
                                        ) : (
                                            <Search />
                                        )}
                                    </IconButton>
                                </Paper>

                                <List>
                                    {filteredSearch?.length > 0 &&
                                        search.trim().length > 0 &&
                                        filteredSearch.map(({ name, id }) => {
                                            return (
                                                <ListItem key={id}>
                                                    <Typography>
                                                        {name}
                                                    </Typography>
                                                </ListItem>
                                            )
                                        })}
                                </List>
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
                    </StyledLoginWrapper>
                </Backgrounds>
            </ThemeProvider>
        </>
    )
}

export default Join

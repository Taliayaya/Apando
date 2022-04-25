import {
    DashboardMain,
    DashboardTitle,
    Row2,
    ServerStatsContainer,
} from './DashboardStyle'

// import { styled, Tooltip, tooltipClasses } from '@mui/material'

import { InviteCase, MemberCase, MessageCase } from './StatsCase'
import ServerParams from './ServerSettings'
import MemberList from './MemberList'
import { useChannel } from '../../utils/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {
    getServerInfo,
    getUserRole,
    isUserInTargetServer,
} from '../../utils/function'
import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { styled } from '@mui/material'
import { theme } from '../../utils/style/colors'
import { ExitToApp } from '@material-ui/icons'
import Helmet from 'react-helmet'
import BackgroundAnimation from '../../components/BackgroundAnimation'

// const BootstrapTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} arrow classes={{ popper: className }} />
// ))(({ theme }) => ({
//     [`& .${tooltipClasses.arrow}`]: {
//         color: theme.palette.common.black,
//     },
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: theme.palette.common.black,
//     },
// }))
const StyledExitToAppIcon = styled(ExitToApp)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    zIndex: 999,
    borderRadius: 10,
    left: -20,
    position: 'absolute',

    '&:hover': {
        opacity: 0.7,
        backgroundColor: '#17094f',
    },
}))

const Dashboard = () => {
    const { currentServer } = useChannel()
    const params = useParams()
    let server_id
    const user = getAuth().currentUser
    const navigate = useNavigate()
    const [serverInfo, setServerInfo] = useState({})
    const [serverStats, setServerStats] = useState({})

    const checkUser = async () => {
        const isUserValid = await isUserInTargetServer(user.uid, server_id)

        if (!isUserValid) {
            navigate('/app')
        }
        const userRole = await getUserRole(user.uid, server_id)
        if (!['Owner', 'Admin'].includes(userRole.role)) {
            navigate('/app')
        }
    }
    if (currentServer) {
        server_id = currentServer?.id
    } else {
        server_id = params.serverid
    }
    checkUser()

    useEffect(() => {
        const getServer = async () => {
            const serverInfo = await getServerInfo(server_id)
            setServerInfo(serverInfo)
        }

        getServer()
    }, [server_id])

    useEffect(() => {
        const db = getDatabase()
        const serverStatsRef = ref(db, `/serverstats/${server_id}`)
        const unsub = onValue(serverStatsRef, (snapshot) => {
            setServerStats(snapshot.val())
        })

        return () => unsub()
    }, [server_id])

    return (
        <>
            <Helmet>
                <title>
                    Apando / Dashboard /{' '}
                    {currentServer?.name ? currentServer.name : ''}
                </title>
                <meta
                    name="description"
                    content="Retrouvez toutes les statistiques relatives à votre serveur et configurez-le comme vous le souhaitez."
                />
            </Helmet>
            <BackgroundAnimation>
                <DashboardMain>
                    <DashboardTitle>
                        <StyledExitToAppIcon onClick={() => navigate('/app')} />
                        <div>Dashboard de {serverInfo?.name}</div>
                    </DashboardTitle>
                    <ServerStatsContainer>
                        <MemberCase nb={serverStats?.memberCount} />
                        <InviteCase nb={serverStats?.currentInviteCount} />
                        <MessageCase nb={serverStats?.messageCount} />
                    </ServerStatsContainer>
                    <Row2>
                        <ServerParams
                            serverName={serverInfo?.name}
                            code={serverInfo?.code ? serverInfo.code : ''}
                            autoJoin={
                                serverInfo?.jointype
                                    ? serverInfo?.jointype
                                    : 'auto'
                            }
                            domain={
                                serverInfo?.domain ? serverInfo?.domain : ''
                            }
                            server_id={server_id}
                        />
                        <MemberList
                            serverName={serverInfo?.name}
                            server_id={server_id}
                            server={serverInfo}
                            joinType={serverInfo?.jointype}
                        />
                    </Row2>
                </DashboardMain>
            </BackgroundAnimation>
        </>
    )
}

export default Dashboard

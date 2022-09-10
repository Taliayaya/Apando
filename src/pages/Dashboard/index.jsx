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
import { useAuth, useChannel } from '../../utils/hooks'
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Helmet } from 'react-helmet-async'
import Backgrounds from '../../components/Backgrounds'
import { ThemeProvider } from 'styled-components'
import Server from '../../utils/server'
import User from '../../utils/user'

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
const StyledExitToAppIcon = styled(ExitToAppIcon)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    zIndex: 999,
    borderRadius: 10,
    left: -40,
    position: 'absolute',

    '&:hover': {
        opacity: 0.7,
        backgroundColor: '#17094f',
    },
}))

/**
 * The dashboard main component.
 * It contains the server stats, updating in real time,
 * a widget to change the server settings (allowed domain, code, join type)
 * a widget to manage server members and invited members
 */
const Dashboard = () => {
    const { currentServer } = useChannel()
    const params = useParams()
    let server_id
    const navigate = useNavigate()
    const [serverInfo, setServerInfo] = useState({})
    const [serverStats, setServerStats] = useState({})
    const { themeUsed } = useAuth()

    if (Object.keys(currentServer).length !== 0) {
        server_id = currentServer?.id
    } else {
        server_id = params.serverid
    }

    // update info when the server_id change
    useEffect(() => {
        const getServer = async () => {
            const serverInfo = await Server.get(server_id)
            setServerInfo(serverInfo)
        }

        getServer()
    }, [server_id])

    // update server states in realtime
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
                <title>Apando / Dashboard / {currentServer?.name ?? ''}</title>
                <meta
                    name="description"
                    content="Retrouvez toutes les statistiques relatives à votre serveur et configurez-le comme vous le souhaitez."
                />
            </Helmet>
            <ThemeProvider theme={themeUsed}>
                <Backgrounds sakura={true}>
                    <DashboardMain>
                        <DashboardTitle>
                            <StyledExitToAppIcon
                                onClick={() => navigate('/app')}
                            />
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
                                code={serverInfo?.code ?? ''}
                                autoJoin={serverInfo?.jointype ?? 'auto'}
                                domain={serverInfo?.domain ?? ''}
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
                </Backgrounds>
            </ThemeProvider>
        </>
    )
}

export default Dashboard

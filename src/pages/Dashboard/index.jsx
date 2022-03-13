import {
    DashboardBackground,
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
import { getServerInfo, isUserInTargetServer } from '../../utils/function'
import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'

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
    }
    if (currentServer) {
        server_id = currentServer
    } else {
        server_id = params.serverid
        checkUser()
    }

    useEffect(() => {
        const getServer = async () => {
            const serverInfo = await getServerInfo(server_id)
            setServerInfo(serverInfo)
            console.log(serverInfo)
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
        <DashboardBackground>
            <DashboardMain>
                <DashboardTitle>Dashboard de {serverInfo?.name}</DashboardTitle>
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
                            serverInfo?.jointype ? serverInfo?.jointype : 'auto'
                        }
                        domain={serverInfo?.domain ? serverInfo?.domain : ''}
                        server_id={server_id}
                    />
                    <MemberList
                        serverName={serverInfo?.name}
                        server_id={server_id}
                        server={serverInfo}
                    />
                </Row2>
            </DashboardMain>
        </DashboardBackground>
    )
}

export default Dashboard

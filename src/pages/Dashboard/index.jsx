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
import { useParams } from 'react-router-dom'

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
    console.log(currentServer)
    const serverName = 'Beta'
    const params = useParams()

    const server_id = currentServer ? currentServer : params.serverid
    return (
        <DashboardBackground>
            <DashboardMain>
                <DashboardTitle>Dashboard de {serverName}</DashboardTitle>
                <ServerStatsContainer>
                    <MemberCase nb={100} />
                    <InviteCase nb={3} />
                    <MessageCase nb={500} />
                </ServerStatsContainer>
                <Row2>
                    <ServerParams
                        serverName={serverName}
                        code={'EE4SSCËZ34'}
                        autoJoin="manual"
                        domain={''}
                        server_id={server_id}
                    />
                    <MemberList serverName={serverName} />
                </Row2>
            </DashboardMain>
        </DashboardBackground>
    )
}

export default Dashboard

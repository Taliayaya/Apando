import {
    DashboardBackground,
    DashboardMain,
    DashboardTitle,
    ServerStatsContainer,
} from './DashboardStyle'

import { styled, Tooltip, tooltipClasses } from '@mui/material'

import { InviteCase, MemberCase, MessageCase } from './StatsCase'
import ServerParams from './ServerSettings'

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}))

const Dashboard = () => {
    const serverName = 'Beta'
    return (
        <DashboardBackground>
            <DashboardMain>
                <DashboardTitle>Dashboard de {serverName}</DashboardTitle>
                <ServerStatsContainer>
                    <MemberCase nb={100} />
                    <InviteCase nb={3} />
                    <MessageCase nb={500} />
                </ServerStatsContainer>
                <ServerParams
                    serverName={serverName}
                    code={'EE4SSCËZ34'}
                    autoJoin="manual"
                />
            </DashboardMain>
        </DashboardBackground>
    )
}

export default Dashboard

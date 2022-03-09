import {
    DashboardBackground,
    DashboardMain,
    DashboardTitle,
    NumberCase,
    ServerStatsContainer,
} from './DashboardStyle'
import PeopleIcon from '@mui/icons-material/People'
import { styled, Tooltip, tooltipClasses } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import MessageIcon from '@mui/icons-material/Message'

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

const MemberCase = ({ nb }) => {
    return (
        <>
            <NumberCase>
                {nb} <PeopleIcon sx={{ fontSize: 40 }} />
            </NumberCase>
        </>
    )
}

const InviteCase = ({ nb }) => {
    return (
        <>
            <NumberCase>
                {nb} <GroupAddIcon sx={{ fontSize: 40 }} />
            </NumberCase>
        </>
    )
}

const MessageCase = ({ nb }) => {
    return (
        <>
            <NumberCase>
                {nb}
                <MessageIcon sx={{ fontSize: 40 }} />
            </NumberCase>
        </>
    )
}

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
            </DashboardMain>
        </DashboardBackground>
    )
}

export default Dashboard

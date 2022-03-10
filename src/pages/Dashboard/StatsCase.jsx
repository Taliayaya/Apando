import GroupAddIcon from '@mui/icons-material/GroupAdd'
import MessageIcon from '@mui/icons-material/Message'
import PeopleIcon from '@mui/icons-material/People'
import { NumberCase } from './DashboardStyle'

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

export { MessageCase, InviteCase, MemberCase }

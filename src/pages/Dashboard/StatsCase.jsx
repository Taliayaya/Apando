import GroupAddIcon from '@mui/icons-material/GroupAdd'
import MessageIcon from '@mui/icons-material/Message'
import PeopleIcon from '@mui/icons-material/People'
import { NumberCase } from './DashboardStyle'
import PropTypes from 'prop-types'

const MemberCase = ({ nb }) => {
    return (
        <>
            <NumberCase>
                {nb} <PeopleIcon sx={{ fontSize: 40 }} />
            </NumberCase>
        </>
    )
}
MemberCase.propTypes = {
    nb: PropTypes.number,
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
InviteCase.propTypes = {
    nb: PropTypes.number,
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
MessageCase.propTypes = {
    nb: PropTypes.number,
}

export { MessageCase, InviteCase, MemberCase }

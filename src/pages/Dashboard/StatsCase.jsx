// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

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

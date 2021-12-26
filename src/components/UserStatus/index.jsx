import React from 'react'
import { StyledDiv, StyleUser } from './UserStatusStyle'
import { AVATAR_PATH } from '../../utils/paths'
import { Avatar } from '@material-ui/core'
import { styled } from '@material-ui/core'
import { Badge } from '@material-ui/core'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: (props) => (props.logged ? '#44b700' : '#888888'),
        color: (props) => (props.logged ? '#44b700' : '#888888'),
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        animation: 'ripple 1s infinite ease',
        top: 25,
        '&::after': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}))

export default function UserStatus({ avatar, datediff, pseudo, logged }) {
    return (
        <StyledDiv style={logged ? { opacity: 1 } : { opacity: 0.3 }}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
                logged={logged}
            >
                <Avatar
                    sx={{ width: 24, height: 24 }}
                    src={`${AVATAR_PATH}${avatar}`}
                />
            </StyledBadge>
            <StyleUser online={datediff >= -5}>{pseudo}</StyleUser>
        </StyledDiv>
    )
}

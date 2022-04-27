import React, { useState } from 'react'
import { StyledDiv, StyleUser } from './UserStatusStyle'
import Avatar from '@mui/material/Avatar'
import { styled } from '@material-ui/core'
import Badge from '@mui/material/Badge'
import { theme } from '../../utils/style/colors'
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import {
    banUserFromServer,
    removeUserRole,
    writeUserRole,
} from '../../utils/function'
import { useAuth, useChannel } from '../../utils/hooks'
import { Add, Block, Remove, VolumeOff } from '@mui/icons-material'
import PropTypes from 'prop-types'

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: (props) => (props.logged ? '#44b700' : '#888888'),
        color: (props) => (props.logged ? '#44b700' : '#888888'),
        boxShadow: `0 0 0 5px ${theme.sides_bg_color}`,
        animation: 'ripple 1s infinite ease',
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

/**
 * Component that shows the user status on the right menu.
 * Admins can handle users from here and set their role
 * Or even ban evil users >:(
 */
function UserStatus({ avatar, datediff, name, logged, uid }) {
    const [contextMenu, setContextMenu] = useState(null)
    const { currentServer } = useChannel()
    const { userRole } = useAuth()

    const isOwner = 'Owner' === userRole
    const hasPower = isOwner || userRole === 'Admin'

    /**
     * Open the menu next to the right click of the user
     * @param {Object} event
     */
    const handleContextMenu = (event) => {
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
                : null
        )
    }

    /**
     * Close the menu
     */
    const handleClose = () => {
        setContextMenu(null)
    }
    const opacityValue = logged ? 1 : 0.3

    return (
        <StyledDiv
            style={{ opacity: opacityValue, cursor: 'context-menu' }}
            onContextMenu={handleContextMenu}
        >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
                logged={logged}
            >
                <Avatar sx={{ width: 48, height: 48 }} src={avatar} />
            </StyledBadge>

            {/* Show the online users with a better visibility than
                offline ones
                */}
            <StyleUser online={datediff <= 120}>{name}</StyleUser>

            {/*  */}
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
                // For the moment, only admins and owners can uses this menu,
                // so no needs to show an "almost" empty menu to them
                style={{ visibility: hasPower ? 'visible' : 'hidden' }}
            >
                {isOwner && (
                    <MenuItem
                        // Set the clicked user has admin
                        onClick={() => {
                            writeUserRole(uid, 'Admin', currentServer?.id)
                            handleClose()
                        }}
                    >
                        <ListItemIcon>
                            <Add />
                        </ListItemIcon>
                        <Typography>Rendre Admin</Typography>
                    </MenuItem>
                )}

                {hasPower && (
                    <MenuItem
                        // set the clicked user as a representative
                        onClick={() => {
                            writeUserRole(uid, 'Délégué', currentServer?.id)
                            handleClose()
                        }}
                    >
                        <ListItemIcon>
                            <Add />
                        </ListItemIcon>
                        <Typography>Rendre Délégué</Typography>
                    </MenuItem>
                )}
                {isOwner && (
                    <MenuItem
                        // Remove the role for the clicked user
                        onClick={() => {
                            removeUserRole(uid, currentServer?.id)
                            handleClose()
                        }}
                        style={{ color: 'red' }}
                    >
                        <ListItemIcon>
                            <Remove style={{ color: 'red' }} />
                        </ListItemIcon>
                        <Typography>Retirer le rôle</Typography>
                    </MenuItem>
                )}
                {/* Separated to avoid Mui Fragment error */}
                {hasPower && (
                    <MenuItem
                        // Set the clicked user as mute, making him unable to send messages
                        onClick={() => {
                            writeUserRole(uid, 'Muted', currentServer?.id)
                            handleClose()
                        }}
                        style={{ color: 'red', backgroundColor: '#ffe0e0' }}
                    >
                        <ListItemIcon>
                            <VolumeOff style={{ color: 'red' }} />
                        </ListItemIcon>
                        <Typography>Rendre muet</Typography>
                    </MenuItem>
                )}
                {hasPower && (
                    <MenuItem
                        // Ban the user from the server, this is pretty violent, so
                        // I recommend using mute first !
                        onClick={() => {
                            banUserFromServer(currentServer?.id, uid)
                            handleClose()
                        }}
                        style={{ color: 'red', backgroundColor: '#ffe0e0' }}
                    >
                        <ListItemIcon>
                            <Block style={{ color: 'red' }} />
                        </ListItemIcon>
                        <Typography>Bannir</Typography>
                    </MenuItem>
                )}
            </Menu>
        </StyledDiv>
    )
}

UserStatus.propTypes = {
    avatar: PropTypes.string,
    datediff: PropTypes.number,
    logged: PropTypes.string,
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

export default UserStatus

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

export default function UserStatus({ avatar, datediff, name, logged, uid }) {
    const [contextMenu, setContextMenu] = useState(null)
    const { currentServer } = useChannel()
    const { userRole } = useAuth()

    const isOwner = 'Owner' === userRole
    const hasPower = isOwner || userRole === 'Admin'

    const handleContextMenu = (event) => {
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
                : null
        )
    }

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

            <StyleUser online={datediff <= 120}>{name}</StyleUser>

            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                {isOwner && (
                    <MenuItem
                        onClick={() => {
                            writeUserRole(uid, 'Admin', currentServer)
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
                        onClick={() => {
                            writeUserRole(uid, 'Délégué', currentServer)
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
                        onClick={() => {
                            removeUserRole(uid, currentServer)
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
                {hasPower && (
                    <>
                        <MenuItem
                            onClick={() => {
                                writeUserRole(uid, 'Muted', currentServer)
                                handleClose()
                            }}
                            style={{ color: 'red', backgroundColor: '#ffe0e0' }}
                        >
                            <ListItemIcon>
                                <VolumeOff style={{ color: 'red' }} />
                            </ListItemIcon>
                            <Typography>Rendre muet</Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                banUserFromServer(currentServer, uid)
                                handleClose()
                            }}
                            style={{ color: 'red', backgroundColor: '#ffe0e0' }}
                        >
                            <ListItemIcon>
                                <Block style={{ color: 'red' }} />
                            </ListItemIcon>
                            <Typography>Bannir</Typography>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </StyledDiv>
    )
}

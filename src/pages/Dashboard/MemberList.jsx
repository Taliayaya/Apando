import BlockIcon from '@mui/icons-material/Block'
import { DoneAll } from '@mui/icons-material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
    Avatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import {
    banUserFromServer,
    getServerUserList,
    joinServer,
    removeJoinRequest,
} from '../../utils/function'
import {
    MemberHeader,
    Separator,
    StyleDone,
    StyleDoneAllContainer,
    StyleUser,
    UserContainer,
} from './DashboardStyle'

import {
    MemberListCase,
    MemberListContainer,
    StyledDiv,
    UserEmailStyle,
    UserInfo,
} from './DashboardStyle'
import RemoveIcon from '@mui/icons-material/Remove'
import PropTypes from 'prop-types'
import User from '../../utils/user'
import Server from '../../utils/server'
import Organisation from '../../utils/organisation'

/**
 * Widget that allows admins and owners to manage their members.
 * It can ban/remove users from a server. Join demands are also
 * showed here if join type is on manual.
 */
const MemberList = ({ serverName, server_id, server, joinType }) => {
    const [usersArray, setUsersArray] = useState([])
    const [requestArray, setRequestArray] = useState({})

    const serverInfo = { ...server, id: server_id }
    /**
     * Get the member list of this server
     */
    useEffect(() => {
        const getUsersArray = async () => {
            const userArray = await Server.getUserList({
                id: server_id,
                isSubServer: server?.orga,
            })
            setUsersArray(userArray)
        }
        getUsersArray()
    }, [server_id, requestArray, server?.orga])

    /**
     * Show in realtime users asking to show this server (nothing is displayed if
     * join type is auto )
     */
    useEffect(() => {
        const db = getDatabase()
        const serverStatsRef = ref(db, `requests/` + server_id)
        const unsub = onValue(serverStatsRef, (snapshot) => {
            const obj = snapshot.val()
            const data = []
            if (obj !== null) {
                Object.keys(obj).forEach((key) => {
                    const values = obj[key]
                    values.uid = key
                    data.push(values)
                })
            }
            setRequestArray(data)
        })

        return () => unsub()
    }, [server_id])

    /**
     * Accept all requests at once (if join type is manual)
     */
    const acceptAllRequests = () => {
        requestArray.forEach(async (user) => {
            serverInfo.orga
                ? await Organisation.joinServer(
                      user,
                      serverInfo.orga,
                      serverInfo
                  )
                : await Server.join(user, serverInfo)
            removeJoinRequest(user.uid, server_id)
        })
    }

    return (
        <MemberListCase>
            {joinType === 'manual' && (
                <>
                    <MemberHeader>
                        Demandes d'adhésion
                        {requestArray.length > 0 && (
                            <StyleDoneAllContainer>
                                <Tooltip title="Accepter toutes les demandes">
                                    <IconButton onClick={acceptAllRequests}>
                                        <DoneAll />
                                    </IconButton>
                                </Tooltip>
                            </StyleDoneAllContainer>
                        )}
                    </MemberHeader>
                    <MemberListContainer>
                        {requestArray.length > 0
                            ? requestArray.map(
                                  ({ uid, username, avatar, email }) => (
                                      <UserCase
                                          name={username}
                                          email={email}
                                          avatar={avatar}
                                          key={uid}
                                          id={uid}
                                          invite="true"
                                          server={serverInfo}
                                      />
                                  )
                              )
                            : 'Aucune demande pour le moment'}
                    </MemberListContainer>
                    <Separator />{' '}
                </>
            )}
            <MemberHeader>Membres de {serverName}</MemberHeader>
            <MemberListContainer>
                {usersArray.map(({ id, data }) => (
                    <UserCase
                        id={id}
                        name={data.name}
                        email={data.email}
                        key={id}
                        avatar={data.avatar}
                        server={serverInfo}
                    />
                ))}
            </MemberListContainer>
        </MemberListCase>
    )
}
MemberList.propTypes = {
    serverName: PropTypes.string,
    server_id: PropTypes.string,
    server: PropTypes.object,
    joinType: PropTypes.string,
}

/**
 * Case containing users in the server or asking to join it.
 * Interaction are possible : refusing invite, ban, accept invite...
 */
const UserCase = ({ avatar, name, email, invite, server, id }) => {
    const [contextMenu, setContextMenu] = useState(null)
    // Right click menu
    const handleContextMenu = (event) => {
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
                : null
        )
    }
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    // Open menu
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    // Close menu
    const handleClose = () => {
        setAnchorEl(null)
        setContextMenu(null)
    }

    const user = {
        uid: id,
        email: email,
    }
    const handleBan = () => {
        banUserFromServer(server.id, user.uid)
    }
    const acceptJoinRequest = async () => {
        server?.orga
            ? await Organisation.joinServer(user, server?.orga, server)
            : await Server.join(user, server)
        removeJoinRequest(user.uid, server.id)
    }

    const refuseJoinRequest = () => {
        removeJoinRequest(user.uid, server.id)
    }

    return (
        <StyledDiv invite={invite} onContextMenu={handleContextMenu}>
            <UserContainer>
                <Avatar sx={{ width: 48, height: 48 }} src={avatar} />
                <UserInfo>
                    <StyleUser>{name}</StyleUser>
                    {/* User emails can sometimes be too long, so its cropped.
                    This tooltip allows to show the full email on hover
                    */}
                    <Tooltip title={email}>
                        <UserEmailStyle>{email}</UserEmailStyle>
                    </Tooltip>
                </UserInfo>
            </UserContainer>
            {/* if this is an invitation, a button to accept it,
            or right click to refuse it. */}
            {invite === 'true' ? (
                <StyleDone
                    sx={{ fontSize: '30px' }}
                    onClick={acceptJoinRequest}
                />
            ) : (
                <Tooltip title="Plus d'actions">
                    {/* Else a horiz menu for further interactions */}
                    <IconButton
                        onClick={(e) => handleClick(e)}
                        aria-controls={open ? 'user-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Menu
                anchorEl={anchorEl || 'anchorPosition'}
                id="user-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleBan}>
                    <ListItemIcon>
                        <BlockIcon />
                    </ListItemIcon>
                    <Typography>Retirer du serveur</Typography>
                </MenuItem>
            </Menu>
            {invite === 'true' && (
                <Menu
                    id="user-menu"
                    open={contextMenu !== null}
                    onClose={handleClose}
                    onClick={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? {
                                  top: contextMenu.mouseY,
                                  left: contextMenu.mouseX,
                              }
                            : undefined
                    }
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem onClick={refuseJoinRequest}>
                        <ListItemIcon>
                            <RemoveIcon />
                        </ListItemIcon>
                        <Typography>Refuser la demande</Typography>
                    </MenuItem>
                </Menu>
            )}
        </StyledDiv>
    )
}
UserCase.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    invite: PropTypes.string,
    server: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string,
}

export default MemberList

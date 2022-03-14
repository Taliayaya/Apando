import { Block, MoreHoriz } from '@material-ui/icons'
import { DoneAll } from '@mui/icons-material'
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

const MemberList = ({ serverName, server_id, server, joinType }) => {
    const [usersArray, setUsersArray] = useState([])
    const [requestArray, setRequestArray] = useState({})

    const serverInfo = { ...server, id: server_id }

    useEffect(() => {
        const getUsersArray = async () => {
            const userArray = await getServerUserList(server_id)
            setUsersArray(userArray)
        }
        getUsersArray()
    }, [server_id, requestArray])

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

    const acceptAllRequests = () => {
        requestArray.forEach((user) => {
            console.log(user, serverInfo)
            joinServer(user, serverInfo).then(() => {
                removeJoinRequest(user.uid, server_id)
            })
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

const UserCase = ({ avatar, name, email, invite, server, id }) => {
    // const [contextMenu, setContextMenu] = useState(null)

    // const handleContextMenu = (event) => {
    //     event.preventDefault()
    //     setContextMenu(
    //         contextMenu === null
    //             ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
    //             : null
    //     )
    // }
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const user = {
        uid: id,
        email: email,
    }
    const handleBan = () => {
        console.log(server, user)
        banUserFromServer(server.id, user.uid)
    }
    const acceptJoinRequest = () => {
        console.log(user, server)
        joinServer(user, server).then(() => {
            removeJoinRequest(user.uid, server.id)
        })
    }

    return (
        <StyledDiv invite={invite}>
            <UserContainer>
                <Avatar sx={{ width: 48, height: 48 }} src={avatar} />
                <UserInfo>
                    <StyleUser>{name}</StyleUser>
                    <UserEmailStyle>{email}</UserEmailStyle>
                </UserInfo>
            </UserContainer>
            {invite === 'true' ? (
                <StyleDone
                    sx={{ fontSize: '30px' }}
                    onClick={acceptJoinRequest}
                />
            ) : (
                <Tooltip title="Plus d'actions">
                    <IconButton
                        onClick={(e) => handleClick(e)}
                        aria-controls={open ? 'user-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MoreHoriz />
                    </IconButton>
                </Tooltip>
            )}
            <Menu
                anchorEl={anchorEl}
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
                        <Block />
                    </ListItemIcon>
                    <Typography>Retirer du serveur</Typography>
                </MenuItem>
            </Menu>
        </StyledDiv>
    )
}

export default MemberList

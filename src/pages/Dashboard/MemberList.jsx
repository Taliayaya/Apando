import { DoneAll } from '@mui/icons-material'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import {
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
                        id={data.id}
                        name={data.name}
                        email={data.email}
                        key={id}
                        avatar={data.avatar}
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

    const user = {
        uid: id,
        email: email,
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
            {invite === 'true' && (
                <StyleDone
                    sx={{ fontSize: '30px' }}
                    onClick={acceptJoinRequest}
                />
            )}
        </StyledDiv>
    )
}

export default MemberList

import { DoneAll } from '@mui/icons-material'
import { Avatar, Tooltip } from '@mui/material'
import { useState } from 'react'
import {
    MemberHeader,
    Separator,
    StyleDone,
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

const MemberList = ({ serverName, inviteNb }) => {
    return (
        <MemberListCase>
            {inviteNb > 0 && (
                <>
                    <MemberHeader>
                        Demandes pour rejoindre
                        <Tooltip title="Accepter toutes les demandes">
                            <DoneAll />
                        </Tooltip>
                    </MemberHeader>
                    <MemberListContainer>
                        <UserCase
                            name="Ilan"
                            email="ilanvinord@mail.com"
                            invite="true"
                        />
                        <UserCase name="Ilan" email="ilanvinord@mail.com" />
                        <UserCase name="Ilan" email="ilanvinord@mail.com" />
                        <UserCase name="Ilan" email="ilanvinord@mail.com" />
                        <UserCase name="Ilan" email="ilanvinord@mail.com" />
                    </MemberListContainer>
                    <Separator />{' '}
                </>
            )}
            <MemberHeader>Membres de {serverName}</MemberHeader>
            <MemberListContainer>
                <UserCase
                    name="Ilan"
                    email="ilanvinord@mail.com"
                    invite="true"
                />
                <UserCase name="Ilan" email="ilanvinord@mail.com" />
                <UserCase name="Ilan" email="ilanvinord@mail.com" />
                <UserCase name="Ilan" email="ilanvinord@mail.com" />
                <UserCase name="Ilan" email="ilanvinord@mail.com" />
            </MemberListContainer>
        </MemberListCase>
    )
}

const UserCase = ({ avatar, name, email, invite }) => {
    const [contextMenu, setContextMenu] = useState(null)

    const handleContextMenu = (event) => {
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
                : null
        )
    }

    return (
        <StyledDiv
            style={{ cursor: 'context-menu' }}
            onContextMenu={handleContextMenu}
            invite={invite}
        >
            <UserContainer>
                <Avatar sx={{ width: 48, height: 48 }} src={avatar} />
                <UserInfo>
                    <StyleUser>{name}</StyleUser>
                    <UserEmailStyle>{email}</UserEmailStyle>
                </UserInfo>
            </UserContainer>
            {invite === 'true' && <StyleDone sx={{ fontSize: '30px' }} />}
        </StyledDiv>
    )
}

export default MemberList

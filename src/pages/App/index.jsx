import React from 'react'
import ChannelList from '../../components/ChannelList'
import Chat from '../../components/Chat'
import UserList from '../../components/UserList'
import { StyledStructure } from './AppStyle'

function App() {
    return (
        <StyledStructure>
            <ChannelList>App (Private)</ChannelList>
            <Chat />
            <UserList />
        </StyledStructure>
    )
}

export default App

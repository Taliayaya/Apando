import React from 'react'
import ChannelList from '../../components/ChannelList'
import Chat from '../../components/Chat'
import UserList from '../../components/UserList'
import { StyledStructure } from './AppStyle'
import { useData } from '../../utils/hooks'

function App() {
    const { userData } = useData()
    console.log(userData)
    return (
        <StyledStructure>
            <ChannelList>App (Private)</ChannelList>
            <Chat />
            <UserList />
        </StyledStructure>
    )
}

export default App

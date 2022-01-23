import { getAuth } from 'firebase/auth'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ChannelList from '../../components/ChannelList'
import Chat from '../../components/Chat'
import UserList from '../../components/UserList'
import { db } from '../../utils/firebase/config'
import { useAuth } from '../../utils/hooks'
import { StyledStructure } from './AppStyle'

function App() {
    const auth = getAuth()
    const user = auth.currentUser
    const { setShowChannel, setShowUsers } = useAuth()
    const [firstMobileTime, setFirstMobileTime] = useState(true)

    useEffect(() => {
        const setOnline = setInterval(async () => {
            await updateDoc(doc(db, 'users', user.uid), {
                'data.lastLogin': Timestamp.fromDate(new Date()),
            })
        }, 60_000)
        return () => {
            clearInterval(setOnline)
        }
    }, [user.uid])
    useEffect(() => {
        const setOnline = async () => {
            await updateDoc(doc(db, 'users', user.uid), {
                'data.lastLogin': Timestamp.fromDate(new Date()),
            })
        }
        setOnline()
    }, [user.uid])

    const [width, setWidth] = useState(window.innerWidth)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    useEffect(() => {
        const isMobile = width <= 768

        if (isMobile && firstMobileTime) {
            setShowChannel(false)
            setShowUsers(false)
            setFirstMobileTime(false)
        }
    }, [firstMobileTime, setShowChannel, setShowUsers, width])

    return (
        <StyledStructure>
            <ChannelList />
            <Chat />
            <UserList />
        </StyledStructure>
    )
}

export default App

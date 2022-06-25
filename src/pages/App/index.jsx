import { getAuth } from 'firebase/auth'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ThemeProvider } from 'styled-components'
import ChannelList from '../../components/ChannelList'
import Chat from '../../components/Chat'
import UserList from '../../components/UserList'
import { db } from '../../utils/firebase/config'
import { useAuth, useChannel } from '../../utils/hooks'
import { StyledStructure } from './/AppStyle'
import IsUserInChannel from './IsUserInChannel'
import IsUserInServer from './IsUserInServer'

function App() {
    const auth = getAuth()
    const user = auth.currentUser
    const { setShowChannel, setShowUsers, themeUsed } = useAuth()
    const [firstMobileTime, setFirstMobileTime] = useState(true)
    const { currentServer } = useChannel()

    useEffect(() => {
        const setOnline = setInterval(async () => {
            await updateDoc(doc(db, 'users', user.uid), {
                'data.lastLogin': serverTimestamp(),
            })
        }, 60_000)
        return () => {
            clearInterval(setOnline)
        }
    }, [user?.uid])
    useEffect(() => {
        const setOnline = async () => {
            await updateDoc(doc(db, 'users', user?.uid), {
                'data.lastLogin': serverTimestamp(),
            })
        }
        setOnline()
    }, [user?.uid])

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
        <>
            <Helmet>
                <title>
                    Apando / {currentServer?.name ? currentServer.name : 'App'}
                </title>
            </Helmet>
            <ThemeProvider theme={themeUsed}>
                <IsUserInServer />
                <IsUserInChannel />
                <StyledStructure>
                    <ChannelList />
                    <Chat />
                    <UserList />
                </StyledStructure>
            </ThemeProvider>
        </>
    )
}

export default App

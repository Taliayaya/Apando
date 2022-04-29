import { getAuth } from 'firebase/auth'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import ChannelList from '../../components/ChannelList'
import Chat from '../../components/Chat'
import UserList from '../../components/UserList'
import { db } from '../../utils/firebase/config'
import { getServerInfo, isUserInTargetServer } from '../../utils/function'
import { useAuth, useChannel } from '../../utils/hooks'
import { StyledStructure } from './AppStyle'

function App() {
    const auth = getAuth()
    const user = auth.currentUser
    const { setShowChannel, setShowUsers } = useAuth()
    const [firstMobileTime, setFirstMobileTime] = useState(true)
    const { currentServer, setCurrentServer } = useChannel()
    const params = useParams()
    const navigate = useNavigate()

    /**
     * This useEffect is used to check users accessing a server by URL
     * It redirects if it's accessing an unauthorized server.
     * Otherwise it updates states according to this server
     */
    useEffect(() => {
        const checkUser = async (server_id) => {
            const isUserValid = await isUserInTargetServer(user.uid, server_id)

            if (isUserValid) {
                // The currentServer is as the URL, so no changes needed
                if (currentServer?.id === server_id) return

                // Retrieve server data and update states
                const serverData = await getServerInfo(server_id)
                if (serverData) {
                    setCurrentServer({
                        id: serverData.id,
                        name: serverData.name,
                    })
                    return
                }
                return
            }
            /** Well, the user is not in the server ?
             * Or We couldn't retrieve any data ??
             * Let's avoid any error, shall we ? Get redirected !
             */
            navigate('/app')
        }

        if (currentServer?.id || params.server_id) {
            checkUser(currentServer?.id ? currentServer.id : params.server_id)
        }
        // Else this user isn't in a server, so no verification needed
    }, [currentServer, navigate, params.server_id, setCurrentServer, user.uid])

    useEffect(() => {
        const setOnline = setInterval(async () => {
            await updateDoc(doc(db, 'users', user.uid), {
                'data.lastLogin': serverTimestamp(),
            })
        }, 60_000)
        return () => {
            clearInterval(setOnline)
        }
    }, [user.uid])
    useEffect(() => {
        const setOnline = async () => {
            await updateDoc(doc(db, 'users', user.uid), {
                'data.lastLogin': serverTimestamp(),
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
        <>
            <Helmet>
                <title>
                    Apando / {currentServer?.name ? currentServer.name : 'App'}
                </title>
            </Helmet>
            <StyledStructure>
                <ChannelList />
                <Chat />
                <UserList />
            </StyledStructure>
        </>
    )
}

export default App

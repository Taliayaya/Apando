import { getAuth } from 'firebase/auth'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
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
            console.log(server_id)
            const isUserValid = await isUserInTargetServer(user.uid, server_id)

            if (isUserValid) {
                if (currentServer) return
                const serverData = await getServerInfo(server_id)
                if (serverData) {
                    console.log(1)
                    setCurrentServer({
                        id: serverData.id,
                        name: serverData.name,
                    })
                    /** Well, the user is in the server but......
                     * We couldn't retrieve any data ??
                     * Let's avoid any error, shall we ? Get redirected !
                     */
                    return
                }
                return
            }
            navigate('/app')
        }

        if (currentServer?.id || params.server_id) {
            checkUser(currentServer?.id ? currentServer.id : params.server_id)
        }
        console.log(1)
        // Else this user isn't in a server, so no verification needed
    }, [
        currentServer,
        currentServer.id,
        navigate,
        params.server_id,
        setCurrentServer,
        user.uid,
    ])

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

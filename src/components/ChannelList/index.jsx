import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth, useChannel } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
} from './ChannelListStyle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import LeftMenu from '../LeftMenu'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
import { getAuth } from 'firebase/auth'
import { Button, Menu } from '@mui/material'
import { getUserRole } from '../../utils/function'
import ChannelName from '../ChannelName'
import { getDatabase, onValue, ref } from 'firebase/database'
import { askNotification } from '../../utils/notification'
import { useParams } from 'react-router-dom'

/**
 * The left side bar component of the app.
 * This contains the server menu and the channels list systems
 */
function ChannelList() {
    const [channelList, setChannelList] = useState([])
    const [showMenu, setShowMenu] = useState(null)
    const {
        currentServer,
        setCurrentServer,
        currentChannel,
        setCurrentChannelId,
    } = useChannel()
    const [serverList, setServerList] = useState([])
    const { showChannel, setUserRole } = useAuth()
    const auth = getAuth()
    const user = auth.currentUser
    const open = Boolean(showMenu)
    const params = useParams()

    const handleClick = (e) => {
        setShowMenu(e.currentTarget)
    }
    const handleClose = () => {
        setShowMenu(null)
    }

    useEffect(() => {
        const setRole = async () => {
            if (currentServer) {
                const role = await getUserRole(user.uid, currentServer?.id)
                setUserRole(role?.role)
            }
        }
        setRole()
    })

    useEffect(() => {
        /**
         * Load the server list for the user
         */
        const loadServerList = async () => {
            if (serverList?.length === 0) {
                const userRef = doc(db, 'users', user.uid)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()) {
                    const serverList = userSnap.data().servers
                    // If the user has joined at least a server
                    // It will set this one as selected
                    if (serverList?.length > 0) {
                        setCurrentServer(serverList[0])
                        setServerList(serverList)
                    }
                }
            }
        }
        loadServerList()
        // firstLoadChannel()
    })

    useEffect(() => {
        /**
         * It checks the url params channel_id and whether it is existing or not.
         * If it does, it sets it as a selected channel, and so load messages
         * afterward
         * Else it updates the URL and remove the wrong channel id
         */
        const checkURLChannel = async () => {
            if (params.channel_id && currentChannel.id !== params.channel_id) {
                const channelURLInServer = channelList.find(
                    (channelData) => channelData.key === params.channel_id
                )
                // The URL is right, so lets set this channel as selected
                if (channelURLInServer) {
                    setCurrentChannelId({
                        id: channelURLInServer.key,
                        name: channelURLInServer.name,
                    })
                }
            }
        }
        checkURLChannel()
    }, [
        channelList,
        currentChannel,
        currentServer,
        params.channel_id,
        setCurrentChannelId,
    ])

    /**
     * This create a realtime connection with the database
     * On each modification in the channels/server_id/ node,
     * it will refresh this component and by the same occasion,
     * load the channels.
     *
     * If a server is added, or a new message sent, it will update
     */
    useEffect(() => {
        if (currentServer) {
            const rldb = getDatabase()
            // The channels location
            const channelRef = ref(rldb, `channels/${currentServer?.id}`)
            // create a new connection
            const unsub = onValue(channelRef, (snapshot) => {
                const obj = snapshot.val()
                const datas = []
                if (obj !== null) {
                    // add the id/key to the object
                    Object.keys(obj).forEach((key) => {
                        const values = obj[key]
                        values.key = key
                        datas.push(values)
                    })
                    // update the channels array
                    setChannelList(datas)
                }
            })
            // On each render, unsub to the database. Otherwise, it
            // would create multiple connection... which isn't optimised
            return () => unsub()
        }
    }, [currentServer])

    return (
        <StyledChannelList showChannel={showChannel ? 'true' : 'false'}>
            <StyledChannelListTop hovered={showMenu} onClick={handleClick}>
                <h2>{currentServer.name ?? 'Aucun serveur'}</h2>
                {/* Decide which icon to use, whether the menu is opened or not */}
                {showMenu ? <MenuOpenIcon /> : <ExpandMoreIcon />}
            </StyledChannelListTop>

            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={showMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                style={{
                    top: 110,
                    left: -10,
                }}
            >
                {/* Show the Left Menu component */}
                <LeftMenu
                    serverList={serverList}
                    setChannelList={setChannelList}
                />
            </Menu>

            <StyledChannelListBottom>
                {/* Show every channel of the current Server */}
                {channelList &&
                    channelList.map(
                        ({
                            key,
                            name,
                            lastMessage,
                            lastMessageUser,
                            lastMessageImg,
                            seen,
                        }) => {
                            return (
                                <ChannelName
                                    key={key.toString()}
                                    id_channel={key}
                                    name={name}
                                    seen={seen}
                                    lastMessageData={{
                                        lastMessage: lastMessage,
                                        lastMessageUser: lastMessageUser,
                                        lastMessageImg: lastMessageImg,
                                    }}
                                />
                            )
                        }
                    )}
            </StyledChannelListBottom>
            {/* To receive the notification */}
            {Notification.permission === 'default' && (
                <div>
                    <Button onClick={askNotification}>
                        Recevoir les notifications
                    </Button>
                </div>
            )}
        </StyledChannelList>
    )
}

export default ChannelList

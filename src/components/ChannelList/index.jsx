import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth, useChannel } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
} from './/ChannelListStyle'
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
import User from '../../utils/user'

/**
 * The left side bar component of the app.
 * This contains the server menu and the channels list systems
 */
function ChannelList() {
    const [showMenu, setShowMenu] = useState(null)
    const { currentServer, setCurrentServer, channelList, setChannelList } =
        useChannel()
    const [serverList, setServerList] = useState([])
    const [orgaServers, setOrgaServers] = useState([])
    const { showChannel, setUserRole } = useAuth()
    const auth = getAuth()
    const user = auth.currentUser
    const open = Boolean(showMenu)

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
            if (serverList?.length > 0) return
            User.get(user.uid).then((data) => {
                if (data?.servers?.length > 0) {
                    setCurrentServer(data.servers[0])
                    setServerList(data.servers)
                }
                if (data?.orgaServers?.length > 0) {
                    setOrgaServers(data.orgaServers)
                }
            })
        }
        loadServerList()
        // firstLoadChannel()
    })

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
    }, [currentServer, setChannelList])

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
                    setShowMenu={setShowMenu}
                    orgaServers={orgaServers}
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

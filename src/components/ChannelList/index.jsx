import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
    StyledChannel,
} from './ChannelListStyle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import LeftMenu from '../LeftMenu'
import {
    collection,
    where,
    query,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
import { getAuth } from 'firebase/auth'
import { Menu } from '@mui/material'

function ChannelList() {
    const [channelList, setChannelList] = useState([])
    const [showMenu, setShowMenu] = useState(null)
    const {
        currentChannelId,
        setCurrentChannelId,
        currentServer,
        setCurrentServer,
    } = useChannel()
    const [serverList, setServerList] = useState([])
    const { showChannel } = useAuth()
    const auth = getAuth()
    const user = auth.currentUser
    const { setMessageList } = useMessageList()
    const open = Boolean(showMenu)
    const handleClick = (e) => {
        setShowMenu(e.currentTarget)
    }
    const handleClose = () => {
        setShowMenu(null)
    }

    // Load Channels
    useEffect(() => {
        const loadChannels = setInterval(async () => {
            if (currentServer) {
                const channelsRef = collection(db, 'channels')
                const q = query(
                    channelsRef,
                    where('id_server', '==', currentServer)
                )
                const querySnapshot = await getDocs(q)
                const channelListArray = []
                querySnapshot.forEach((doc) => {
                    channelListArray.push({ id: doc.id, data: doc.data() })
                })
                channelListArray &&
                    channelListArray.length !== channelList.length &&
                    setChannelList(channelListArray)
            }
        }, 60000)
        return () => clearInterval(loadChannels)
    })

    // Ne s'active que lors du premier chargement de la page
    // (ou quand ya pas de salon)
    useEffect(() => {
        const firstLoadChannel = async () => {
            if (channelList.length === 0 && currentServer) {
                const loadChannel = async () => {
                    const channelsRef = collection(db, 'channels')
                    const q = query(
                        channelsRef,
                        where('id_server', '==', currentServer)
                    )
                    const querySnapshot = await getDocs(q)
                    const channelListArray = []
                    querySnapshot.forEach((doc) => {
                        channelListArray.push({ id: doc.id, data: doc.data() })
                    })
                    if (channelListArray?.length > 0) {
                        setChannelList(channelListArray)
                        setCurrentChannelId(channelListArray[0].id)
                    }
                }
                loadChannel()
            }
        }

        const loadServerList = async () => {
            if (serverList?.length === 0) {
                const userRef = doc(db, 'users', user.uid)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()) {
                    const serverList = userSnap.data().servers
                    if (serverList?.length > 0) {
                        setCurrentServer(serverList[0].id)
                        setServerList(serverList)
                    }
                }
            }
        }
        loadServerList()
        firstLoadChannel()
    })

    const selectChannel = (id_channel, data) => {
        setCurrentChannelId({ id: id_channel, data: data })
        setMessageList([])
    }
    let currentChannel = currentChannelId.id ? currentChannelId.id : null
    return (
        <StyledChannelList showChannel={showChannel ? 'true' : 'false'}>
            <StyledChannelListTop hovered={showMenu} onClick={handleClick}>
                <h2>Le Bon Sauveur</h2>
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
                <LeftMenu
                    serverList={serverList}
                    setChannelList={setChannelList}
                />
            </Menu>

            <StyledChannelListBottom>
                {channelList &&
                    channelList.map(({ id, data }) => (
                        <StyledChannel
                            key={id.toString()}
                            onClick={() => selectChannel(id, data)}
                            Selected={currentChannel === id}
                        >
                            {data.channelName}
                        </StyledChannel>
                    ))}
            </StyledChannelListBottom>
        </StyledChannelList>
    )
}

export default ChannelList

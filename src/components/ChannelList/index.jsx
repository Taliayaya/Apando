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
import { Menu } from '@mui/material'
import { getUserRole } from '../../utils/function'
import ChannelName from '../ChannelName'
import { getDatabase, onValue, ref } from 'firebase/database'

function ChannelList() {
    const [channelList, setChannelList] = useState([])
    const [showMenu, setShowMenu] = useState(null)
    const { currentServer, setCurrentServer } = useChannel()
    const [serverList, setServerList] = useState([])
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

    // Ne s'active que lors du premier chargement de la page
    // (ou quand ya pas de salon)
    useEffect(() => {
        const loadServerList = async () => {
            if (serverList?.length === 0) {
                const userRef = doc(db, 'users', user.uid)
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()) {
                    const serverList = userSnap.data().servers
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
        if (currentServer) {
            const rldb = getDatabase()
            const channelRef = ref(rldb, `channels/${currentServer?.id}`)
            const unsub = onValue(channelRef, (snapshot) => {
                const obj = snapshot.val()
                const datas = []
                if (obj !== null) {
                    Object.keys(obj).forEach((key) => {
                        const values = obj[key]
                        values.key = key
                        datas.push(values)
                    })
                    setChannelList(datas)
                }
            })
            return () => unsub()
        }
    }, [currentServer])

    return (
        <StyledChannelList showChannel={showChannel ? 'true' : 'false'}>
            <StyledChannelListTop hovered={showMenu} onClick={handleClick}>
                <h2>
                    {currentServer?.name ? currentServer.name : 'Aucun serveur'}
                </h2>
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
                    channelList.map(({ key, name }) => {
                        return (
                            <ChannelName
                                key={key.toString()}
                                id_channel={key}
                                name={name}
                            />
                        )
                    })}
            </StyledChannelListBottom>
        </StyledChannelList>
    )
}

export default ChannelList

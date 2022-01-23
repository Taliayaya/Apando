import { StyledChat, StyledChatMessage, ScrollDown } from './ChatStyle'
import { useEffect, useRef, useState } from 'react'
import { useChannel, useMessageList } from '../../utils/hooks'
import Message from '../Message'
import MessageInput from '../MessageInput'
import TopMenu from '../TopMenu'
import { getAuth } from 'firebase/auth'
import { Badge } from '@mui/material'
import { ArrowCircleDown, Autorenew } from '@mui/icons-material'
import { styled } from '@material-ui/styles'
import { theme } from '../../utils/style/colors'
import { getDatabase, ref, onValue } from 'firebase/database'
const StyledBadge = styled(Badge)((props) => ({
    '& .MuiBadge-badge': {
        color: '#fff',
        backgroundColor:
            props.shouldscrolltobottom === 'true'
                ? 'green'
                : theme.chat_input_bg_color,
        width: '25px',
        height: '25px',

        '&:hover': {
            backgroundColor:
                props.shouldscrolltobottom === 'true' ? '#a33a3a' : 'green',
        },
    },
    cursor: 'pointer',
    border: `2px solid ${theme.sides_bg_color}`,
    borderRadius: '60px',
    '&:hover': {
        borderColor: '#4158d0',
    },
}))

function Chat() {
    const messageEndRef = useRef(null)
    const { currentChannelId } = useChannel()
    const { messageList, setMessageList } = useMessageList()
    const { showUsers } = getAuth()
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)

    // useEffect(() => {
    //     const loadMessage = async () => {
    //         if (messageList.length === 0 && currentChannelId?.id) {
    //             const messageRef = collection(db, 'messages')
    //             const q = query(
    //                 messageRef,
    //                 where('id_channel', '==', currentChannelId.id)
    //             )
    //             // const unsubscribe = onSnapshot(q, (querySnapShot) => {
    //             //     querySnapShot.forEach((doc) => {
    //             //         messageListArray.push({ id: doc.id, data: doc?.data() })
    //             //     })
    //             // })
    //             const querySnap = await getDocs(q)
    //             const messageListArray = []

    //             querySnap.forEach((doc) => {
    //                 messageListArray.push({ id: doc.id, data: doc.data() })
    //             })
    //             messageListArray.sort((a, b) =>
    //                 a.data.timestamp > b.data.timestamp ? 1 : -1
    //             )
    //             const data = await getChannelMessages(currentChannelId.id)
    //             console.log('chat data', data)
    //             setMessageList(messageListArray)
    //             // Permet de scroll en bas du chat dès qu'on commence à écrire un message
    //         }
    //     }

    //     return loadMessage()
    // }, [currentChannelId.id, messageList.length, setMessageList])

    useEffect(() => {
        if (currentChannelId.id) {
            // const messageListArray = []
            // const messageRef = collection(db, 'messages')
            // const q = query(
            //     messageRef,
            //     where('id_channel', '==', currentChannelId.id)
            // )
            const rltdb = getDatabase()
            const messageListRef = ref(rltdb, 'messages/' + currentChannelId.id)
            onValue(messageListRef, (snapshot) => {
                const obj = snapshot.val()
                const datas = []
                Object.keys(obj).forEach((key) => {
                    const values = obj[key]
                    values.key = key
                    datas.push(values)
                })
                setMessageList(datas)
            })
            // const unsubscribe = onSnapshot(q, (querySnapShot) => {
            //     querySnapShot.forEach((doc) => {
            //         messageListArray.push({ id: doc.id, data: doc?.data() })
            //     })
            // })
            // getChannelMessages(currentChannelId.id)
            // setMessageList(messageListArray)
            // return () => {
            //     unsubscribe()
            // }
        }
    }, [currentChannelId.id, setMessageList])

    useEffect(() => {
        if (shouldScrollToBottom) {
            messageEndRef.current?.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
                inline: 'nearest',
            })
        }
    })

    let previousUser = -1
    const messageListSorted = messageList.sort((a, b) => {
        return a.timestamp - b.timestamp
    })
    return (
        <StyledChat showUsers={showUsers ? 'true' : 'false'}>
            <TopMenu />
            <StyledChatMessage>
                {messageListSorted.map(
                    ({ message, timestamp, user, key, id_channel }) => {
                        let repeat = user?.uid === previousUser
                        previousUser = user?.uid

                        return (
                            <Message
                                key={key}
                                username={
                                    user.displayName
                                        ? user?.displayName
                                        : 'Utilisateur supprimé'
                                }
                                message={message}
                                timestamp={timestamp.seconds}
                                avatar={user.photoURL}
                                repeat={repeat}
                                messageID={key}
                                id_channel={id_channel}
                                uid={user.uid}
                            />
                        )
                    }
                )}

                <div ref={messageEndRef} />
            </StyledChatMessage>
            <ScrollDown>
                <div style={{ visibility: 'hidden' }}>Test</div>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    badgeContent={
                        <Autorenew
                            onClick={() =>
                                setShouldScrollToBottom(!shouldScrollToBottom)
                            }
                        />
                    }
                    shouldscrolltobottom={
                        shouldScrollToBottom ? 'true' : 'false'
                    }
                >
                    <ArrowCircleDown
                        style={{
                            backgroundColor: theme.chat_input_bg_color,
                            borderRadius: '60px',
                            fontSize: 40,
                        }}
                        onClick={() =>
                            messageEndRef.current?.scrollIntoView({
                                block: 'start',
                                behavior: 'smooth',
                                inline: 'nearest',
                            })
                        }
                    />
                </StyledBadge>
            </ScrollDown>
            <MessageInput currentChannelId={currentChannelId} />
        </StyledChat>
    )
}
export default Chat

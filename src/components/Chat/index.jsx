import { StyledChat, StyledChatMessage, ScrollDown } from './ChatStyle'
import { useEffect, useRef, useState } from 'react'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import Message from '../Message'
import MessageInput from '../MessageInput'
import TopMenu from '../TopMenu'
import { Badge, IconButton, Tooltip } from '@mui/material'
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
    borderRadius: '60px',
    '&:hover': {
        borderColor: '#4158d0',
    },
}))

function Chat() {
    const messageEndRef = useRef(null)
    const { currentChannelId } = useChannel()
    const { messageList, setMessageList } = useMessageList()
    const { showUsers, showChannel } = useAuth()
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)

    useEffect(() => {
        if (currentChannelId.id) {
            const rltdb = getDatabase()
            const messageListRef = ref(rltdb, 'messages/' + currentChannelId.id)
            const unsub = onValue(messageListRef, (snapshot) => {
                const obj = snapshot.val()
                const datas = []
                if (obj !== null) {
                    Object.keys(obj).forEach((key) => {
                        const values = obj[key]
                        values.key = key
                        datas.push(values)
                    })
                    setMessageList(datas)
                }
            })
            return () => unsub()
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

    const shouldresize = showUsers || showChannel ? 'true' : 'false'
    return (
        <StyledChat shouldresize={shouldresize}>
            <TopMenu />
            <StyledChatMessage shouldresize={shouldresize}>
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
                        <Tooltip
                            title={
                                shouldScrollToBottom
                                    ? "Annuler l'autoscroll"
                                    : "Activer l'autoscroll"
                            }
                        >
                            <IconButton
                                onClick={() =>
                                    setShouldScrollToBottom(
                                        !shouldScrollToBottom
                                    )
                                }
                            >
                                <Autorenew />
                            </IconButton>
                        </Tooltip>
                    }
                    shouldscrolltobottom={
                        shouldScrollToBottom ? 'true' : 'false'
                    }
                >
                    <Tooltip title="Scroll vers le bas">
                        <IconButton
                            onClick={() =>
                                messageEndRef.current?.scrollIntoView({
                                    block: 'start',
                                    behavior: 'smooth',
                                    inline: 'nearest',
                                })
                            }
                        >
                            <ArrowCircleDown
                                style={{
                                    backgroundColor: theme.chat_input_bg_color,
                                    borderRadius: '60px',
                                    fontSize: 40,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </StyledBadge>
            </ScrollDown>
            <MessageInput currentChannelId={currentChannelId} />
        </StyledChat>
    )
}
export default Chat

import { StyledChat, StyledChatMessage, ScrollDown } from './ChatStyle'
import { useEffect, useRef, useState } from 'react'
import { useAuth, useChannel, useMessageList } from '../../utils/hooks'
import Message from '../Message'
import MessageInput from '../MessageInput'
import TopMenu from '../TopMenu'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { Autorenew, KeyboardDoubleArrowDown } from '@mui/icons-material'
import { styled } from '@material-ui/styles'
import { theme } from '../../utils/style/colors'
import { getDatabase, ref, onValue } from 'firebase/database'
import { setMessageAsSeen } from '../../utils/function'
import { getAuth } from 'firebase/auth'

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

/**
 * The chat component. It handles showing all the message sent
 * in the selected channel and the message input... to send new messages
 */
function Chat() {
    const messageEndRef = useRef(null)
    const { currentChannel, currentServer } = useChannel()
    const { messageList, setMessageList } = useMessageList()
    const { showUsers, showChannel } = useAuth()
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)
    const user = getAuth().currentUser

    /**
     * This create a realtime connection with the database
     * On each modification in the messages/channel_id/ node,
     * it will refresh this component and by the same occasion,
     * load the messages.
     *
     * It sets messages as seen for this channel.
     */
    useEffect(() => {
        if (currentChannel.id) {
            const rltdb = getDatabase()
            const messageListRef = ref(rltdb, 'messages/' + currentChannel.id)
            // create the connection
            const unsub = onValue(messageListRef, (snapshot) => {
                const obj = snapshot.val()
                const datas = []
                if (obj !== null) {
                    // add the id/key to the object
                    Object.keys(obj).forEach((key) => {
                        const values = obj[key]
                        values.key = key
                        datas.push(values)
                    })
                    setMessageList(datas)
                }
                // Messages are seen when they are loaded.
                setMessageAsSeen(user.uid, currentChannel.id, currentServer.id)
            })
            // On each render, unsub to the database. Otherwise, it
            // would create multiple connection... which isn't optimised
            return () => unsub()
        }
    }, [currentChannel.id, currentServer.id, setMessageList, user.uid])

    useEffect(() => {
        // If the autoscroll is turned on, it gently scroll bottom on
        // each render
        if (shouldScrollToBottom) {
            messageEndRef.current?.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
                inline: 'nearest',
            })
        }
    })

    let previousUser = -1
    // sort message by date. The latest at the top
    const messageListSorted = messageList.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    const shouldresize = showUsers || showChannel ? 'true' : 'false'
    return (
        <StyledChat shouldresize={shouldresize}>
            <TopMenu />
            <StyledChatMessage shouldresize={shouldresize}>
                {/* Load each messages of the array */}
                {messageListSorted.map(
                    ({ message, timestamp, user, key, id_channel, files }) => {
                        /* If this message was sent by the same user
                         * than the previous one. Then we don't want to
                         * show all the metadata again right ?
                         */
                        let repeat = user?.uid === previousUser
                        previousUser = user?.uid

                        return (
                            <Message
                                key={key}
                                username={
                                    user.displayName ?? 'Utilisateur supprimé'
                                }
                                message={message}
                                timestamp={timestamp.seconds}
                                avatar={user.photoURL}
                                repeat={repeat}
                                messageID={key}
                                id_channel={id_channel}
                                uid={user.uid}
                                filesPath={files}
                            />
                        )
                    }
                )}

                <div ref={messageEndRef} />
            </StyledChatMessage>

            {/* A button to scroll to the bottom of the chat.
            It can also turn on/off the autoscroll
            */}
            <ScrollDown>
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
                        // change the color of the autoscroll button
                        // to tell the user it state changed
                        shouldScrollToBottom ? 'true' : 'false'
                    }
                >
                    <Tooltip title="Scroll vers le bas">
                        <IconButton
                            onClick={() =>
                                // scroll to the bottom
                                messageEndRef.current?.scrollIntoView({
                                    block: 'start',
                                    behavior: 'smooth',
                                    inline: 'nearest',
                                })
                            }
                        >
                            <KeyboardDoubleArrowDown
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
            <MessageInput currentChannel={currentChannel} />
        </StyledChat>
    )
}
export default Chat

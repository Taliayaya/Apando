import Avatar from '@mui/material/Avatar'
import {
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
    Container,
    Align,
} from './MessageStyle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import MessageMore from '../MessageMore'
import { IconButton, Menu } from '@mui/material'

const handleMessageData = (timestamp) => {
    const dateFormat = new Intl.DateTimeFormat('fr-FR', {
        timeStyle: 'medium',
        timeZone: 'CET',
    })
    const now = new Date()
    const date = new Date(timestamp * 1000)
    let day

    if (now.getDay() === date.getDay()) {
        day = "Aujourd'hui à "
    } else {
        if (now.getDate() - 1 === date.getDay()) {
            day = 'Hier à '
        } else {
            const dateDay = date.getDay()
            const dateMonth = date.getMonth()
            const dateYear = date.getFullYear()
            day = dateDay + '/' + dateMonth + '/' + dateYear
        }
    }
    const hours = dateFormat.format(new Date(timestamp * 1e3))
    const formattedTime = day + ' ' + hours
    return formattedTime
}

function Message({
    messageID,
    username,
    timestamp,
    message,
    avatar,
    repeat,
    id_channel,
    uid,
}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [showMore, setShowMore] = useState(false)
    const open = Boolean(anchorEl)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const formattedTime = handleMessageData(timestamp)

    return (
        <Container
            repeat={repeat ? 'true' : 'false'}
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
        >
            <StyledMessage>
                <Avatar
                    src={avatar}
                    style={{ visibility: !repeat ? 'visible' : 'hidden' }}
                />
                <StyledMessageInfo>
                    {!repeat && (
                        <Align>
                            {username}
                            <StyledMessageTimestamp>
                                {formattedTime}
                            </StyledMessageTimestamp>
                        </Align>
                    )}
                    <StyledUserMessage>
                        <ReactMarkdown
                            children={message}
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                code({
                                    node,
                                    inline,
                                    className,
                                    children,
                                    ...props
                                }) {
                                    const match = /language-(\w+)/.exec(
                                        className || ''
                                    )
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(
                                                /\n$/,
                                                ''
                                            )}
                                            style={dark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                            }}
                        />
                    </StyledUserMessage>
                </StyledMessageInfo>
            </StyledMessage>
            {showMore && (
                <div>
                    <IconButton
                        id="long-button"
                        aria-label="more"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e)}
                    >
                        <MoreVertIcon
                            style={{
                                cursor: 'pointer',
                                color: '#aaa',
                                position: 'relative',
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{ 'aria-labelledby': 'long-button' }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleClose()}
                        onClick={() => handleClose()}
                    >
                        <MessageMore
                            id={messageID}
                            message={message}
                            id_channel={id_channel}
                            uid={uid}
                        />
                    </Menu>
                </div>
            )}
        </Container>
    )
}

export default Message

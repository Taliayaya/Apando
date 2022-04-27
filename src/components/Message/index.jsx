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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import MessageMore from '../MessageMore'
import { IconButton, Menu } from '@mui/material'
import 'katex/dist/katex.min.css'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeMathjax from 'rehype-mathjax'
import { handleMessageData, LinkRenderer } from './MessageFunctions'
import PropTypes from 'prop-types'

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

    // Lets get a better date format than a timestamp... shall we ?
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
                    {/* The users info : Name, and when the message was sent.
                    Repeat this information when multiple messages were sent in
                    row isn't necessary.......
                    */}
                    {!repeat && (
                        <Align>
                            {username}
                            <StyledMessageTimestamp>
                                {formattedTime}
                            </StyledMessageTimestamp>
                        </Align>
                    )}
                    <StyledUserMessage>
                        {/* This huge code is what analyze the message sent 
                        and format it with Markdown. 
                        It can use Latex, Code syntax, Links... 
                        */}
                        <ReactMarkdown
                            children={message}
                            remarkPlugins={[remarkMath, remarkGfm]}
                            rehypePlugins={[
                                rehypeMathjax,
                                remarkRehype,
                                rehypeStringify,
                            ]}
                            components={{
                                /* We modified the link interaction so that
                                 * the user is redirected in an other tab.
                                 * We want to keep our users :3
                                 *
                                 * this can be useful if we want to add a
                                 * confirmation like :
                                 * "Are you sure you want to follow this link ?
                                 * it's dangerous to go alone, take this!"
                                 */
                                a: LinkRenderer,
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
                                            lineProps={{
                                                /* If messages are too long,
                                                 * breaks it so that it stays INSIDE
                                                 * the chat
                                                 */
                                                style: {
                                                    wordBreak: 'break-all',
                                                    whiteSpace: 'pre-wrap',
                                                },
                                            }}
                                            wrapLines={true}
                                            style={dark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code
                                            className={className}
                                            {...props}
                                            style={{ display: 'none' }}
                                        >
                                            {children}
                                        </code>
                                    )
                                },
                            }}
                        />
                    </StyledUserMessage>
                </StyledMessageInfo>
            </StyledMessage>

            {/* When the user hover this message,
            a dot menu can be spawned to get further interaction with it
            such as delete for admins or reply. 
            */}
            <div style={{ visibility: showMore ? 'visible' : 'hidden' }}>
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
                {/* This is the menu opened when the dot button is pressed
                This section is in an another component to keep it clear
                */}
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
        </Container>
    )
}
Message.propTypes = {
    username: PropTypes.string,
    timestamp: PropTypes.number,
    avatar: PropTypes.string,
    repeat: PropTypes.bool,
    messageID: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    id_channel: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
}

export default Message

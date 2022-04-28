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
import { useRef, useEffect, useState } from 'react'
import MessageMore from '../MessageMore'
import { IconButton, Menu } from '@mui/material'
import 'katex/dist/katex.min.css'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeMathjax from 'rehype-mathjax'

// For the file stack
import { getStorage, ref, listAll, getMetadata } from 'firebase/storage'
import { Stack } from '@mui/material'

const handleMonth = (month) => {
    if (month < 10) {
        return '0' + month
    }
    return month
}

function LinkRenderer(props) {
    // console.log({ props })
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    )
}

const handleMessageData = (timestamp) => {
    const dateFormat = new Intl.DateTimeFormat('fr-FR', {
        timeStyle: 'medium',
        timeZone: 'CET',
    })
    const now = new Date()
    const date = new Date(timestamp * 1000)
    let day

    if (
        now.getDate() === date.getDate() &&
        now.getMonth() === date.getMonth() &&
        now.getFullYear() === date.getFullYear()
    ) {
        day = "Aujourd'hui à "
    } else {
        if (
            now.getDate() - 1 === date.getDate() &&
            now.getMonth() === date.getMonth() &&
            now.getFullYear() === date.getFullYear()
        ) {
            day = 'Hier à '
        } else {
            const dateDay = date.getDate()
            const monthsInt = date.getMonth() + 1
            const dateMonth = handleMonth(monthsInt)
            const dateYear = date.getFullYear()
            day = dateDay + '/' + dateMonth + '/' + dateYear
        }
    }
    const hours = dateFormat.format(new Date(timestamp * 1e3))
    const formattedTime = day + ' ' + hours
    return formattedTime
}

const FileContainer = (file) => {
    /* A container component for files to be rendered under message.
     * Arguments: file, an item passed from the listAll on a directory.
     * */
    // To Do : add icons next to the file's name
    // To Do : Different behavior according to the file's type
    //const metadata = getMetadata(file)
    console.log("Be here")
    const [metadata, setMetadata] = useState({})
    const gotten = useRef(true)
    useEffect(() => {
        //gotten.current = true
        getMetadata(file).then((data) => {if(gotten.current){setMetadata(data)}})
        return () => gotten.current = false
    })
    console.log(metadata)
    return (
        <Container>
            <p>{metadata?.name}</p>
            <br />
            <h5>{metadata?.size}</h5>
        </Container>
    )
}

const FilesList = (filesPath) => {
    /* A stack with all the files from a directory of the storage, rendered by a
     * file container each.
     * Arguments: filesPath, the path under 'attachments/' of the files
     *     directory.
     * */
    const storage = getStorage()
    const dirRef = ref(storage, 'attachments/' + filesPath.filesPath)
    // To Do : fix this strange behavior from the passed filesPath
    const [listItems, setListItems] = useState([])
    const gotten = useRef(true)
    useEffect(() => {
        //gotten.current = true
        listAll(dirRef).then((data) => setListItems(data.items))
        return () => gotten.current = false
    }, [])
    return (
        <Stack spacing={1}>
            {listItems?.map((file) => {
                <FileContainer file={file} />
            })}
        </Stack>
    )
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
    filesPath,
}) {
    /* Component to render a message : displays the avatar, the date, the text, the
     * person who posted the message, a menu to answer and delete, the render
     * markdown, images, sent files ...
     * Arguments: Everything attached to a message to be rendered
     * */
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
                            rehypePlugins={[
                                rehypeMathjax,
                                remarkRehype,
                                rehypeStringify,
                            ]}
                            components={{
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
                        {filesPath && <FilesList filesPath={filesPath} />}
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

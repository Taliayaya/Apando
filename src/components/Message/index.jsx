// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import Avatar from '@mui/material/Avatar'
import {
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
    Container,
    Align,
} from './/MessageStyle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react'
import MessageMore from '../MessageMore'
import { IconButton, Menu, Tooltip } from '@mui/material'
import 'katex/dist/katex.min.css'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeMathjax from 'rehype-mathjax'

// For the file stack
import {
    getStorage,
    ref,
    listAll,
    getMetadata,
    getDownloadURL,
} from 'firebase/storage'
import { Stack } from '@mui/material'
import { FileDownload, FileDownloadDone } from '@mui/icons-material'
import { theme } from '../../utils/style/colors'
import ShowFiles from './/ShowFiles'
import { handleMessageData, LinkRenderer } from './MessageFunctions'
import PropTypes from 'prop-types'

const FileContainer = ({ file }) => {
    /* A container component for files to be rendered under message.
     * Arguments: file, an item passed from the listAll on a directory.
     * */
    // To Do : add icons next to the file's name
    // To Do : Different behavior according to the file's type
    //const metadata = getMetadata(file)
    const storage = getStorage()
    const fileRef = ref(storage, file._location.path)
    const [metadata, setMetadata] = useState({})
    const [fileDownloaded, setFileDownloaded] = useState(false)
    const [downloadURL, setDownloadURL] = useState(null)

    useEffect(() => {
        const loadMetadata = () => {
            if (Object.keys(metadata).length === 0) {
                getMetadata(fileRef).then((data) => {
                    setMetadata(data)
                })
                getDownloadURL(fileRef).then((url) => {
                    setDownloadURL(url)
                })
            }
        }
        loadMetadata()
    }, [fileRef, metadata])

    return (
        <>
            <Container
                style={{
                    backgroundColor: theme.top_menu_bg_color,
                    maxWidth: '50vw',
                }}
            >
                <p>{metadata?.name}</p>
                <br />
                <h5>{metadata?.size}</h5>
                {fileDownloaded ? (
                    <Tooltip
                        title={`Fichier déjà téléchargé. Double click pour le télécharger à nouveau
                `}
                    >
                        <IconButton
                            onDoubleClick={() => setFileDownloaded(false)}
                        >
                            <FileDownloadDone />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title={`Télécharger ${metadata?.name}`}>
                        <a
                            href={downloadURL}
                            target="_blank"
                            rel="noreferrer"
                            download
                        >
                            <IconButton onClick={() => setFileDownloaded(true)}>
                                <FileDownload />
                            </IconButton>
                        </a>
                    </Tooltip>
                )}
            </Container>
            <ShowFiles name={metadata?.name} url={downloadURL} />
        </>
    )
}

const FilesList = ({ filesPath }) => {
    /* A stack with all the files from a directory of the storage, rendered by a
     * file container each.
     * Arguments: filesPath, the path under 'attachments/' of the files
     *     directory.
     * */
    const storage = getStorage()
    // console.log(filesPath)
    const dirRef = ref(storage, 'attachments/' + filesPath)
    // To Do : fix this strange behavior from the passed filesPath
    const [listItems, setListItems] = useState([])
    useEffect(() => {
        //gotten.current = true
        // listAll(dirRef).then((data) => setListItems(data.items))
        const getFiles = () => {
            if (listItems.length === 0) {
                listAll(dirRef).then((res) => {
                    setListItems(res.items)
                })
            }
        }
        getFiles()
    }, [dirRef, listItems.length])
    console.log(2)
    return (
        <Stack spacing={1}>
            {listItems?.map((file) => {
                return (
                    <FileContainer
                        style={{ maxWidth: '50vw' }}
                        key={file}
                        file={file}
                    />
                )
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
                        {filesPath && <FilesList filesPath={filesPath} />}
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

import { Avatar } from '@material-ui/core'
import {
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
    Container,
} from './MessageStyle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { AVATAR_PATH } from '../../utils/paths'
import { MoreVert } from '@material-ui/icons'
import { useState } from 'react'
import MessageMore from '../MessageMore'

function Message({ id, username, timestamp, message, avatar, repeat }) {
    const [more, setMore] = useState(false)
    return (
        <Container repeat>
            <StyledMessage>
                <Avatar
                    src={`${AVATAR_PATH}${avatar}`}
                    style={{ visibility: !repeat ? 'visible' : 'hidden' }}
                />
                <StyledMessageInfo>
                    {!repeat && (
                        <span>
                            {username}
                            <StyledMessageTimestamp>
                                {timestamp}
                            </StyledMessageTimestamp>
                        </span>
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
            <div>
                {more && <MessageMore id={id} />}
                <MoreVert
                    style={{ cursor: 'pointer' }}
                    onClick={() => setMore(!more)}
                />
            </div>
        </Container>
    )
}

export default Message

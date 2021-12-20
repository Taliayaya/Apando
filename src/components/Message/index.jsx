import { Avatar } from '@material-ui/core'
import {
    StyledMessage,
    StyledMessageInfo,
    StyledMessageTimestamp,
    StyledUserMessage,
} from './MessageStyle'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

function Message({ username, timestamp, message, avatar }) {
    return (
        <StyledMessage>
            <Avatar
                src={`http://localhost/project-plateforme-api/assets/images/avatars/${avatar}`}
            />
            <StyledMessageInfo>
                <span>
                    {username}
                    <StyledMessageTimestamp>{timestamp}</StyledMessageTimestamp>
                </span>
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
    )
}

export default Message

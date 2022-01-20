import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false)
    const [showChannel, setShowChannel] = useState(true)
    const [showUsers, setShowUsers] = useState(true)

    return (
        <AuthContext.Provider
            value={{
                authed,
                setAuthed,
                showChannel,
                setShowChannel,
                showUsers,
                setShowUsers,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const MessageListContext = createContext()

export const MessageListProvider = ({ children }) => {
    const [messageList, setMessageList] = useState([])
    return (
        <MessageListContext.Provider value={{ messageList, setMessageList }}>
            {children}
        </MessageListContext.Provider>
    )
}

export const CurrentChannelContext = createContext()

export const CurrentChannelProvider = ({ children }) => {
    const [currentChannelId, setCurrentChannelId] = useState({})
    const [userList, setUserList] = useState([])
    return (
        <CurrentChannelContext.Provider
            value={{
                currentChannelId,
                setCurrentChannelId,
                userList,
                setUserList,
            }}
        >
            {children}
        </CurrentChannelContext.Provider>
    )
}

export const CurrentServerContext = createContext()

export const CurrentServerProvider = ({ children }) => {
    const [currentServer, setCurrentServer] = useState({})

    return (
        <CurrentServerContext.Provider
            value={{ currentServer, setCurrentServer }}
        >
            {children}
        </CurrentServerContext.Provider>
    )
}
export const ChatMessageContext = createContext()

export const ChatMessageProvider = ({ children }) => {
    const [message, setMessage] = useState('')

    return (
        <ChatMessageContext.Provider value={{ message, setMessage }}>
            {children}
        </ChatMessageContext.Provider>
    )
}

import React, { useState, createContext } from 'react'
import { getCookie } from '../function'
import spring from '../style/themes/spring.json'
import summer from '../style/themes/summer.json'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false)
    const [showChannel, setShowChannel] = useState(true)
    const [showUsers, setShowUsers] = useState(true)
    const [userRole, setUserRole] = useState('')

    // Seasonal themes
    const date = new Date()
    let defaultTheme
    const ctheme = getCookie('theme')
    if (
        date.getMonth() < 2 ||
        (date.getMonth() === 2 && date.getDate() < 21) ||
        ctheme === 'winter'
    ) {
        defaultTheme = spring // Winter not yet defined
    } else if (
        date.getMonth() < 5 ||
        (date.getMonth() === 5 && date.getDate() < 21) ||
        ctheme === 'spring'
    ) {
        defaultTheme = spring
    } else if (
        date.getMonth() < 8 ||
        (date.getMonth() === 8 && date.getDate() < 23) ||
        ctheme === 'summer'
    ) {
        defaultTheme = summer
    } else if (
        date.getMonth() < 11 ||
        (date.getMonth() === 11 && date.getDate() < 21) ||
        ctheme === 'autumn'
    ) {
        defaultTheme = summer
    } // Fall not yet defined
    else {
        defaultTheme = spring
    } // Winter not yet defined
    const [themeUsed, setThemeUsed] = useState({
        ...defaultTheme.palette,
        name: defaultTheme.name,
    })

    return (
        <AuthContext.Provider
            value={{
                authed,
                setAuthed,
                showChannel,
                setShowChannel,
                showUsers,
                setShowUsers,
                userRole,
                setUserRole,
                themeUsed,
                setThemeUsed,
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
    const [currentChannel, setCurrentChannel] = useState({})
    const [userList, setUserList] = useState([])
    const [channelList, setChannelList] = useState([])
    return (
        <CurrentChannelContext.Provider
            value={{
                currentChannel,
                setCurrentChannel,
                userList,
                setUserList,
                channelList,
                setChannelList,
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

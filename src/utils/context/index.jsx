import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false)

    return (
        <AuthContext.Provider value={{ authed, setAuthed }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {
    const [userData, setuserData] = useState([])

    return (
        <UserDataContext.Provider value={{ userData, setuserData }}>
            {children}
        </UserDataContext.Provider>
    )
}

export const CurrentChannelContext = createContext()

export const CurrentChannelProvider = ({ children }) => {
    const [currentChannelId, setCurrentChannelId] = useState({})

    return (
        <CurrentChannelContext.Provider
            value={{ currentChannelId, setCurrentChannelId }}
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

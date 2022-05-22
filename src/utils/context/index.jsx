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

import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false)
    const [showChannel, setShowChannel] = useState(true)
    const [showUsers, setShowUsers] = useState(true)
    const [userRole, setUserRole] = useState('')

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

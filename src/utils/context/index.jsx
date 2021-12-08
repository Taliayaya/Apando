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

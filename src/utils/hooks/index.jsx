import { useContext } from 'react'
import { AuthContext } from '../context'

export function useAuth() {
    const { authed, setAuthed } = useContext(AuthContext)
    return {
        authed,
        login() {
            return new Promise((res) => {
                setAuthed(true)
                res()
            })
        },
        logout() {
            return new Promise((res) => {
                setAuthed(false)
                res()
            })
        },
    }
}

export default function AuthConsumer() {
    return useContext(AuthContext)
}

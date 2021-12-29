import { useContext } from 'react'
import {
    AuthContext,
    UserDataContext,
    CurrentChannelContext,
    CurrentServerContext,
    ChatMessageContext,
} from '../context'
import axios from 'axios'
export function useAuth() {
    const { authed, setAuthed } = useContext(AuthContext)
    const { setuserData } = useData()
    const { setCurrentChannelId, setCurrentServer } = useChannel()
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
                setuserData([])
                setCurrentChannelId({})
                setAuthed(false)
                setCurrentServer({})
                localStorage.removeItem('userData')
                sessionStorage.removeItem('userData')
                res()
            })
        },
    }
}

export default function AuthConsumer() {
    return useContext(AuthContext)
}

export function useApi() {
    return {
        sender(url, formData) {
            return new Promise((res) => {
                axios
                    .post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((result) => {
                        res(result.data)
                    })
                    .catch((error) => {
                        console.log(error)
                        res(error)
                    })
            })
        },
    }
}

export function useData() {
    const { userData, setuserData } = useContext(UserDataContext)
    return { userData, setuserData }
}

export function useChannel() {
    const { currentChannelId, setCurrentChannelId } = useContext(
        CurrentChannelContext
    )
    const { currentServer, setCurrentServer } = useContext(CurrentServerContext)

    return {
        currentChannelId,
        setCurrentChannelId,
        currentServer,
        setCurrentServer,
    }
}

export function useMessage() {
    const { message, setMessage } = useContext(ChatMessageContext)

    return { message, setMessage }
}

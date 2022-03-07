import { useContext } from 'react'
import {
    AuthContext,
    MessageListContext,
    CurrentChannelContext,
    CurrentServerContext,
    ChatMessageContext,
} from '../context'
import axios from 'axios'
import { getAuth, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
    const {
        authed,
        setAuthed,
        showChannel,
        setShowChannel,
        showUsers,
        setShowUsers,
        setUserRole,
        userRole,
    } = useContext(AuthContext)
    const { setCurrentChannelId, setCurrentServer } = useChannel()
    const auth = getAuth()
    const navigate = useNavigate()

    const actionCodeSettings = {
        url: 'https://apando.fr/login',
    }

    const resetPassword = async (auth, email) => {
        await sendPasswordResetEmail(auth, email, actionCodeSettings)
    }
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
                signOut(auth).then(() => {
                    setCurrentChannelId({})
                    setAuthed(false)
                    navigate('/login')
                    setCurrentServer(false)
                })
                res()
            })
        },
        resetPassword,
        showChannel,
        setShowChannel,
        showUsers,
        setShowUsers,
        setUserRole,
        userRole,
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
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((result) => {
                        res(result.data)
                    })
                    .catch((error) => {
                        res(error.response.data)
                    })
            })
        },
    }
}

export function useMessageList() {
    const { messageList, setMessageList } = useContext(MessageListContext)
    return { messageList, setMessageList }
}

export function useChannel() {
    const { currentChannelId, setCurrentChannelId, userList, setUserList } =
        useContext(CurrentChannelContext)
    const { currentServer, setCurrentServer } = useContext(CurrentServerContext)

    return {
        currentChannelId,
        setCurrentChannelId,
        currentServer,
        setCurrentServer,
        userList,
        setUserList,
    }
}

export function useMessage() {
    const { message, setMessage } = useContext(ChatMessageContext)

    return { message, setMessage }
}

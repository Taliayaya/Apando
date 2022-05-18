import { useContext } from 'react'
import {
    AuthContext,
    MessageListContext,
    CurrentChannelContext,
    CurrentServerContext,
    ChatMessageContext,
} from '../context'
import { getAuth, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

/*
 * Hooks are function callable in every react component that can
 * contain other functions or states. This avoid using props and
 * gives a better lisibility / DRY
 */

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
    const { setCurrentChannel, setCurrentServer } = useChannel()
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
            navigate('/login')
            signOut(auth).then(() => {
                setCurrentChannel({})
                setAuthed(false)
                setCurrentServer(false)
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

export function useMessageList() {
    const { messageList, setMessageList } = useContext(MessageListContext)
    return { messageList, setMessageList }
}

export function useChannel() {
    const {
        currentChannel,
        setCurrentChannel,
        userList,
        setUserList,
        channelList,
        setChannelList,
    } = useContext(CurrentChannelContext)
    const { currentServer, setCurrentServer } = useContext(CurrentServerContext)

    return {
        currentChannel,
        setCurrentChannel,
        currentServer,
        setCurrentServer,
        userList,
        setUserList,
        channelList,
        setChannelList,
    }
}

export function useMessage() {
    const { message, setMessage } = useContext(ChatMessageContext)

    return { message, setMessage }
}

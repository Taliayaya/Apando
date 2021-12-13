import { useContext } from 'react'
import { AuthContext, UserDataContext, CurrentChannelContext } from '../context'
import axios from 'axios'
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

    return { currentChannelId, setCurrentChannelId }
}
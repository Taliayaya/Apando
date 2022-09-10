import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useChannel } from '../../utils/hooks'
import Server from '../../utils/server'
import User from '../../utils/user'

const IsUserInServer = () => {
    const user = getAuth().currentUser
    const { currentServer, setCurrentServer } = useChannel()
    const params = useParams()
    const navigate = useNavigate()

    /**
     * This useEffect is used to check users accessing a server by URL
     * It redirects if it's accessing an unauthorized server.
     * Otherwise it updates states according to this server
     */
    useEffect(() => {
        const checkUser = async (server_id, organame) => {
            let isUserValid
            if (organame) {
                isUserValid = await User.isInOrgaServer(
                    user.uid,
                    server_id,
                    organame
                )
            } else {
                isUserValid = await User.isInServer(user.uid, server_id)
            }
            if (isUserValid) {
                // The currentServer is as the URL, so no changes needed
                if (currentServer?.id === server_id) return

                // Retrieve server data and update states
                const serverData = await Server.get(server_id, organame)
                if (serverData) {
                    setCurrentServer({
                        id: serverData.id,
                        name: serverData.name,
                        isSubServer: organame,
                    })
                    return
                }
                return
            }
            /** Well, the user is not in the server ?
             * Or We couldn't retrieve any data ??
             * Let's avoid any error, shall we ? Get redirected !
             */
            navigate('/app')
        }

        if (!user.uid) return navigate('/login')
        if (currentServer?.id || params.server_id) {
            checkUser(
                params.server_id ?? currentServer?.id,
                params.organame !== 'default'
                    ? params.organame
                    : null ?? currentServer?.isSubServer
            )
        }
        // Else this user isn't in a server, so no verification needed
    }, [
        currentServer,
        navigate,
        params?.server_id,
        setCurrentServer,
        user?.uid,
    ])

    return null
}

export default IsUserInServer

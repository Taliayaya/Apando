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

import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getServerInfo, isUserInTargetServer } from '../../utils/function'
import { useChannel } from '../../utils/hooks'

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
        const checkUser = async (server_id) => {
            const isUserValid = await isUserInTargetServer(user.uid, server_id)
            if (isUserValid) {
                // The currentServer is as the URL, so no changes needed
                if (currentServer?.id === server_id) return

                // Retrieve server data and update states
                const serverData = await getServerInfo(server_id)
                if (serverData) {
                    setCurrentServer({
                        id: serverData.id,
                        name: serverData.name,
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
            checkUser(currentServer?.id ?? params.server_id)
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

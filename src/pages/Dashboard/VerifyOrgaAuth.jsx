import { getAuth } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useChannel } from '../../utils/hooks'
import User from '../../utils/user'

function VerifyOrgaAuth({ children }) {
    const params = useParams()
    const user = getAuth().currentUser
    const { currentServer } = useChannel()
    const navigate = useNavigate()

    let server_id, orga

    /**
     * Verify whether this user is allowed being here or not
     * (if admins/owner and in the server)
     * Otherwise, he's redirected.
     */
    const checkUser = async () => {
        const isUserValid = await User.isInOrgaServer(user.uid, server_id, orga)
        const userRole = await User.getRole(user.uid, server_id)
        if (!isUserValid || !['Owner', 'Admin'].includes(userRole?.role)) {
            navigate('/app')
        }
    }
    if (Object.keys(currentServer).length !== 0) {
        server_id = currentServer?.id
        orga = currentServer?.isSubServer
    } else {
        server_id = params.serverid
        orga = params.organame
    }
    checkUser()
    return children
}

export default VerifyOrgaAuth

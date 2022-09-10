import { getAuth } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useChannel } from '../../utils/hooks'
import User from '../../utils/user'

function VerifyServerAuth({ children }) {
    const params = useParams()
    const user = getAuth().currentUser
    const { currentServer } = useChannel()
    const navigate = useNavigate()

    let server_id

    /**
     * Verify whether this user is allowed being here or not
     * (if admins/owner and in the server)
     * Otherwise, he's redirected.
     */
    const checkUser = async () => {
        const isUserValid = await User.isInServer(user.uid, server_id)
        const userRole = await User.getRole(user.uid, server_id)
        console.log(
            isUserValid,
            userRole,
            !['Owner', 'Admin'].includes(userRole?.role)
        )

        if (!isUserValid || !['Owner', 'Admin'].includes(userRole?.role)) {
            console.log('redirected')
            navigate('/app')
        }
    }
    if (Object.keys(currentServer).length !== 0) {
        server_id = currentServer?.id
    } else {
        server_id = params.serverid
    }
    checkUser()
    return children
}

export default VerifyServerAuth

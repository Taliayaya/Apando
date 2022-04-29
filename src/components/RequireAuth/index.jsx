import { useAuth } from '../../utils/hooks'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function RequireAuth({ children }) {
    const { authed } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    if (!authed) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
export default RequireAuth
